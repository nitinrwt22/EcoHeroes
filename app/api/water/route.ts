import type { NextRequest } from "next/server"

type WqpResult = {
  MonitoringLocationName?: string
  OrganizationFormalName?: string
  ResultMeasureValue?: string
  ResultMeasure?: { MeasureUnitCode?: string }
  MonitoringLocationLatitude?: string
  MonitoringLocationLongitude?: string
  CharacteristicName?: string
}

function toNumber(v: string | number | null | undefined): number | null {
  if (v == null) return null
  const n = typeof v === "string" ? Number.parseFloat(v) : v
  return Number.isFinite(n) ? n : null
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = Number(searchParams.get("lat") || "37.7749")
  const lon = Number(searchParams.get("lon") || "-122.4194")
  const radius = Number(searchParams.get("radius") || "10000") // meters
  const limit = Number(searchParams.get("limit") || "150")

  // Compute bounding box (approx degrees) from center + radius
  const degPerMeterLat = 1 / 111_000
  const degPerMeterLon = 1 / (111_000 * Math.cos((lat * Math.PI) / 180))
  const minX = lon - radius * degPerMeterLon
  const maxX = lon + radius * degPerMeterLon
  const minY = lat - radius * degPerMeterLat
  const maxY = lat + radius * degPerMeterLat

  // EPA Water Quality Portal Results endpoint.
  // Filter to water samples and nitrate-related characteristics, recent years for performance.
  const url = new URL("https://www.waterqualitydata.us/data/Result/search")
  url.searchParams.set("mimeType", "json")
  url.searchParams.set("zip", "no")
  url.searchParams.set("sorted", "no")
  url.searchParams.set("pagesize", String(limit))
  url.searchParams.set("bBox", `${minX},${minY},${maxX},${maxY}`)
  url.searchParams.append("sampleMedia", "Water")
  url.searchParams.append("characteristicName", "Nitrate")
  url.searchParams.append("characteristicName", "Nitrate-nitrite")
  url.searchParams.append("siteType", "Stream")
  url.searchParams.append("siteType", "River/Stream")
  url.searchParams.set("startDateLo", "2020-01-01")

  try {
    const res = await fetch(url.toString(), { cache: "no-store", headers: { accept: "application/json" } })
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch WQP" }), { status: 500 })
    }
    const data = (await res.json()) as WqpResult[]

    const markers = data
      .map((r) => {
        const latN = toNumber(r.MonitoringLocationLatitude)
        const lonN = toNumber(r.MonitoringLocationLongitude)
        if (latN == null || lonN == null) return null

        const value = toNumber(r.ResultMeasureValue)
        const unit = r.ResultMeasure?.MeasureUnitCode || ""
        // Simplified severity for nitrates (EPA MCL ~10 mg/L)
        // Treat missing/other units as unknown.
        const severity =
          value == null || !unit.toLowerCase().includes("mg")
            ? "unknown"
            : value <= 1
              ? "low"
              : value <= 10
                ? "moderate"
                : "high"

        return {
          lat: latN,
          lon: lonN,
          site: r.MonitoringLocationName || "Monitoring Site",
          org: r.OrganizationFormalName || "",
          characteristic: r.CharacteristicName || "Nitrate",
          value,
          unit,
          severity,
        }
      })
      .filter(Boolean)

    return Response.json({ center: { lat, lon }, markers })
  } catch {
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 })
  }
}
