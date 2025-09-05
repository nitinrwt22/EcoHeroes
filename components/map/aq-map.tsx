"use client"

import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"

type AirMarker = {
  lat: number
  lon: number
  city: string
  country: string
  pm25: number | null
  severity: "low" | "moderate" | "high" | "unknown"
  values: Array<{ parameter: string; value: number; unit: string }>
}

type WaterMarker = {
  lat: number
  lon: number
  site: string
  org: string
  characteristic: string
  value: number | null
  unit: string
  severity: "low" | "moderate" | "high" | "unknown"
}

type LayerKind = "air" | "water" | "both"

function severityStyle(s: AirMarker["severity"] | WaterMarker["severity"]) {
  // Colors: emerald for low, amber for moderate/high, gray for unknown
  const emerald = "#16a34a" // emerald-600
  const amber = "#f59e0b" // amber-500
  switch (s) {
    case "low":
      return { color: emerald, fillColor: emerald, fillOpacity: 0.25, radius: 120 }
    case "moderate":
      return { color: amber, fillColor: amber, fillOpacity: 0.35, radius: 160 }
    case "high":
      return { color: amber, fillColor: amber, fillOpacity: 0.5, radius: 200 }
    default:
      return { color: "#9ca3af", fillColor: "#9ca3af", fillOpacity: 0.2, radius: 100 } // gray-400
  }
}

export function AQMap() {
  const mapRef = useRef<L.Map | null>(null)
  const airGroupRef = useRef<L.FeatureGroup | null>(null)
  const waterGroupRef = useRef<L.FeatureGroup | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [layer, setLayer] = useState<LayerKind>("air")

  // Fix default icon URLs
  useEffect(() => {
    const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png"
    const iconUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png"
    const shadowUrl = "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
    // @ts-expect-error leaflet types
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })
  }, [])

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      center: [37.7749, -122.4194],
      zoom: 11,
      zoomControl: true,
    })
    mapRef.current = map

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    airGroupRef.current = L.featureGroup().addTo(map)
    waterGroupRef.current = L.featureGroup().addTo(map)

    // Attempt geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          map.setView([latitude, longitude], 12)
          refresh(latitude, longitude)
        },
        () => {
          refresh(37.7749, -122.4194)
        },
        { enableHighAccuracy: true, timeout: 5000 },
      )
    } else {
      refresh(37.7749, -122.4194)
    }

    return () => {
      map.remove()
      mapRef.current = null
      airGroupRef.current = null
      waterGroupRef.current = null
    }
  }, [])

  async function loadAir(lat: number, lon: number) {
    const res = await fetch(`/api/air?lat=${lat}&lon=${lon}&radius=10000&limit=150`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to load air quality data")
    const payload = (await res.json()) as { markers: AirMarker[] }
    const map = mapRef.current
    const group = airGroupRef.current
    if (!map || !group) return
    group.clearLayers()
    payload.markers.forEach((m) => {
      const style = severityStyle(m.severity)
      const circle = L.circle([m.lat, m.lon], { ...style, weight: 1.5 }).addTo(group)
      const pm25 = m.pm25 != null ? `${m.pm25} µg/m³` : "N/A"
      const list = m.values
        .slice(0, 6)
        .map((v) => `${v.parameter.toUpperCase()}: ${v.value} ${v.unit}`)
        .join("<br/>")
      circle.bindPopup(
        `<div class="text-sm">
          <div class="font-medium text-gray-900">${m.city}${m.country ? `, ${m.country}` : ""}</div>
          <div class="text-gray-700 mt-1">PM2.5: ${pm25}</div>
          <div class="text-gray-700 mt-1">${list}</div>
        </div>`,
      )
    })
  }

  async function loadWater(lat: number, lon: number) {
    const res = await fetch(`/api/water?lat=${lat}&lon=${lon}&radius=10000&limit=150`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to load water quality data")
    const payload = (await res.json()) as { markers: WaterMarker[] }
    const group = waterGroupRef.current
    if (!group) return
    group.clearLayers()
    payload.markers.forEach((m) => {
      const style = severityStyle(m.severity)
      const circle = L.circle([m.lat, m.lon], { ...style, weight: 1.5, dashArray: "4 3" }).addTo(group)
      const val = m.value != null ? `${m.value} ${m.unit}` : "N/A"
      circle.bindPopup(
        `<div class="text-sm">
          <div class="font-medium text-gray-900">${m.site}</div>
          <div class="text-gray-700 mt-1">${m.characteristic}: ${val}</div>
          <div class="text-gray-700 mt-1">${m.org}</div>
        </div>`,
      )
    })
  }

  async function refresh(lat?: number, lon?: number) {
    const map = mapRef.current
    if (!map) return
    const c = map.getCenter()
    const targetLat = lat ?? c.lat
    const targetLon = lon ?? c.lng
    setLoading(true)
    setError(null)
    try {
      if (layer === "air" || layer === "both") await loadAir(targetLat, targetLon)
      if (layer === "water" || layer === "both") await loadWater(targetLat, targetLon)
      // Fit bounds to whichever groups have data
      const bounds = L.latLngBounds([])
      if (layer !== "water" && airGroupRef.current && airGroupRef.current.getLayers().length) {
        bounds.extend(airGroupRef.current.getBounds())
      }
      if (layer !== "air" && waterGroupRef.current && waterGroupRef.current.getLayers().length) {
        bounds.extend(waterGroupRef.current.getBounds())
      }
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.2))
    } catch (e: any) {
      setError(e?.message || "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // When layer changes, refresh from current center
    const map = mapRef.current
    if (!map) return
    refresh(map.getCenter().lat, map.getCenter().lng)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layer])

  return (
    <div className="space-y-3">
      <div ref={containerRef} className="h-[420px] w-full rounded-xl border border-gray-200" />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant={layer === "air" ? undefined : "outline"} onClick={() => setLayer("air")}>
            Air
          </Button>
          <Button variant={layer === "water" ? undefined : "outline"} onClick={() => setLayer("water")}>
            Water
          </Button>
          <Button variant={layer === "both" ? undefined : "outline"} onClick={() => setLayer("both")}>
            Both
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded px-2 py-0.5 text-white" style={{ background: "#16a34a" }}>
              Low
            </span>
            <span className="rounded px-2 py-0.5 text-white" style={{ background: "#f59e0b", opacity: 0.8 }}>
              Moderate
            </span>
            <span className="rounded px-2 py-0.5 text-white" style={{ background: "#f59e0b" }}>
              High
            </span>
            <span className="text-gray-500">Shared scale (Air PM2.5, Water Nitrate)</span>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const map = mapRef.current
              if (map) {
                const c = map.getCenter()
                refresh(c.lat, c.lng)
              }
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
      {loading ? <p className="text-sm text-gray-500">Loading environmental data…</p> : null}
      {error ? <p className="text-sm text-red-600">Error: {error}</p> : null}
    </div>
  )
}
