import type { NextRequest } from "next/server"

type OpenAQLatest = {
  results: Array<{
    coordinates?: { latitude: number; longitude: number }
    city?: string | null
    country?: string | null
    location?: string
    measurements?: Array<{ parameter: string; value: number; unit: string }>
  }>
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat = Number(searchParams.get("lat") || "37.7749") // default SF
  const lon = Number(searchParams.get("lon") || "-122.4194")
  const radius = Number(searchParams.get("radius") || "10000") // meters
  const limit = Number(searchParams.get("limit") || "100")

  const url = new URL("https://api.openaq.org/v2/latest")
  url.searchParams.set("coordinates", `${lat},${lon}`)
  url.searchParams.set("radius", String(radius))
  url.searchParams.set("limit", String(limit))
  url.searchParams.set("parameter", ["pm25", "pm10", "no2", "o3", "so2", "co"].join(","))

  try {
    const res = await fetch(url.toString(), {
      headers: { accept: "application/json" },
      // Avoid caching so we see fresh readings
      cache: "no-store",
    })
    if (!res.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch OpenAQ" }), { status: 500 })
    }
    const data = (await res.json()) as OpenAQLatest

    const markers = data.results
      .filter((r) => r.coordinates)
      .map((r) => {
        const pm25 = r.measurements?.find((m) => m.parameter.toLowerCase() === "pm25")?.value
        // Basic severity based on PM2.5 (EPA breakpoints simplified)
        // <=12 good/low (emerald), <=35 moderate (amber), >35 high (amber emphasized)
        const severity = typeof pm25 === "number" ? (pm25 <= 12 ? "low" : pm25 <= 35 ? "moderate" : "high") : "unknown"
        return {
          lat: r.coordinates!.latitude,
          lon: r.coordinates!.longitude,
          city: r.city ?? r.location ?? "Unknown",
          country: r.country ?? "",
          values: r.measurements ?? [],
          pm25: typeof pm25 === "number" ? pm25 : null,
          severity,
        }
      })

    return Response.json({ center: { lat, lon }, markers })
  } catch (e) {
    return new Response(JSON.stringify({ error: "Unexpected error" }), { status: 500 })
  }
}
