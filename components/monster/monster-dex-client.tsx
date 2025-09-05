"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Monster = {
  id: string
  name: string
  type: "Air" | "Water" | "Waste"
  threat: "Low" | "Medium" | "High"
  region: string
}

const ALL_MONSTERS: Monster[] = [
  { id: "smogling", name: "Smogling", type: "Air", threat: "Low", region: "Urban" },
  { id: "littergeist", name: "Littergeist", type: "Waste", threat: "Medium", region: "Parks" },
  { id: "oilwyrm", name: "Oilwyrm", type: "Water", threat: "High", region: "Coast" },
  { id: "dustmaw", name: "Dustmaw", type: "Air", threat: "Medium", region: "Industrial" },
  { id: "plastivore", name: "Plastivore", type: "Waste", threat: "High", region: "Rivers" },
  { id: "algebane", name: "Algebane", type: "Water", threat: "Low", region: "Lakes" },
]

export function MonsterDexClient() {
  const [q, setQ] = useState("")
  const [type, setType] = useState<"All" | Monster["type"]>("All")
  const [threat, setThreat] = useState<"Any" | Monster["threat"]>("Any")
  const [selected, setSelected] = useState<Monster | null>(null)

  const filtered = useMemo(() => {
    return ALL_MONSTERS.filter((m) => {
      if (type !== "All" && m.type !== type) return false
      if (threat !== "Any" && m.threat !== threat) return false
      if (q && !m.name.toLowerCase().includes(q.toLowerCase())) return false
      return true
    })
  }, [q, type, threat])

  return (
    <section className="mx-auto mt-4 max-w-xl px-4">
      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label htmlFor="search" className="block text-xs font-medium text-gray-600">
              Search
            </label>
            <input
              id="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search monsters..."
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-xs font-medium text-gray-600">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option>All</option>
              <option>Air</option>
              <option>Water</option>
              <option>Waste</option>
            </select>
          </div>
          <div>
            <label htmlFor="threat" className="block text-xs font-medium text-gray-600">
              Threat
            </label>
            <select
              id="threat"
              value={threat}
              onChange={(e) => setThreat(e.target.value as any)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option>Any</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((m) => (
          <Card key={m.id} className="overflow-hidden border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-gray-900">{m.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="aspect-[16/9] w-full rounded-md bg-amber-50/40 ring-1 ring-amber-100">
                <div className="flex h-full items-center justify-center">
                  <span className="text-xs text-gray-400">Image placeholder</span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-gray-700">
                    {m.type}
                  </Badge>
                  <span className="text-gray-500">Threat: {m.threat}</span>
                </div>
                <button
                  onClick={() => setSelected(m)}
                  className="text-emerald-600 underline-offset-2 hover:text-emerald-700 hover:underline"
                >
                  View
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900">{selected?.name}</DialogTitle>
            <DialogDescription>
              Type: {selected?.type} • Threat: {selected?.threat} • Region: {selected?.region}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3">
            <p className="text-sm text-gray-800">
              Field notes placeholder. Describe patterns, habitats, and detection tips here.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button className="bg-emerald-600 text-white hover:bg-emerald-700" disabled>
              Add to Squad (UI only)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
