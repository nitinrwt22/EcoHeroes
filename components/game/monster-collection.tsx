"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Filter, Calendar, MapPin, Trophy, Lock } from "lucide-react"

interface CapturedMonster {
  id: string
  name: string
  type: string
  threat: "Low" | "Medium" | "High"
  captureDate: string
  location: string
  health: number
  maxHealth: number
  xpReward: number
  captured: boolean
  image: string
}

export function MonsterCollection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMonster, setSelectedMonster] = useState<CapturedMonster | null>(null)
  const [filterType, setFilterType] = useState<string>("all")

  const monsters: CapturedMonster[] = [
    {
      id: "smog-demon",
      name: "Smog Demon",
      type: "Air Pollution",
      threat: "High",
      captureDate: "2024-01-15",
      location: "Downtown Industrial District",
      health: 25,
      maxHealth: 100,
      xpReward: 150,
      captured: true,
      image: "🌫️",
    },
    {
      id: "plastic-kraken",
      name: "Plastic Kraken",
      type: "Water Pollution",
      threat: "Medium",
      captureDate: "2024-01-12",
      location: "Riverside Park",
      health: 60,
      maxHealth: 100,
      xpReward: 100,
      captured: true,
      image: "🐙",
    },
    {
      id: "carbon-ghost",
      name: "Carbon Ghost",
      type: "Carbon Emissions",
      threat: "Medium",
      captureDate: "",
      location: "",
      health: 100,
      maxHealth: 100,
      xpReward: 100,
      captured: false,
      image: "👻",
    },
    {
      id: "toxic-sludge",
      name: "Toxic Sludge",
      type: "Soil Pollution",
      threat: "Low",
      captureDate: "",
      location: "",
      health: 100,
      maxHealth: 100,
      xpReward: 75,
      captured: false,
      image: "🟢",
    },
    {
      id: "noise-beast",
      name: "Noise Beast",
      type: "Noise Pollution",
      threat: "Low",
      captureDate: "",
      location: "",
      health: 100,
      maxHealth: 100,
      xpReward: 75,
      captured: false,
      image: "🔊",
    },
  ]

  const filteredMonsters = monsters.filter((monster) => {
    const matchesSearch = monster.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter =
      filterType === "all" ||
      (filterType === "captured" && monster.captured) ||
      (filterType === "uncaptured" && !monster.captured) ||
      monster.type.toLowerCase().includes(filterType.toLowerCase())
    return matchesSearch && matchesFilter
  })

  const capturedCount = monsters.filter((m) => m.captured).length
  const totalCount = monsters.length

  return (
    <div className="space-y-6">
      {/* Collection Stats */}
      <Card className="p-4 glow-effect">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">Monster Collection</h2>
          <Badge variant="secondary" className="bg-primary/20 text-primary">
            {capturedCount}/{totalCount} Captured
          </Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{capturedCount}</div>
            <div className="text-xs text-muted-foreground">Captured</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{totalCount - capturedCount}</div>
            <div className="text-xs text-muted-foreground">Remaining</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">{Math.round((capturedCount / totalCount) * 100)}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search monsters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {["all", "captured", "uncaptured", "air", "water", "soil"].map((filter) => (
            <Button
              key={filter}
              variant={filterType === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterType(filter)}
              className="whitespace-nowrap"
            >
              <Filter className="w-3 h-3 mr-1" />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Monster Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredMonsters.map((monster) => (
          <Card
            key={monster.id}
            className={`p-4 cursor-pointer transition-all hover:scale-105 ${
              monster.captured ? "bg-primary/5 border-primary/20 glow-effect" : "bg-muted/50 border-muted opacity-75"
            }`}
            onClick={() => setSelectedMonster(monster)}
          >
            <div className="text-center space-y-2">
              {monster.captured ? (
                <div className="text-4xl">{monster.image}</div>
              ) : (
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                </div>
              )}

              <h3 className={`font-semibold text-sm ${monster.captured ? "text-foreground" : "text-muted-foreground"}`}>
                {monster.captured ? monster.name : "???"}
              </h3>

              <Badge
                variant={
                  monster.threat === "High" ? "destructive" : monster.threat === "Medium" ? "secondary" : "default"
                }
                className="text-xs"
              >
                {monster.captured ? monster.threat : "Unknown"}
              </Badge>

              {monster.captured && (
                <div className="space-y-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${((monster.maxHealth - monster.health) / monster.maxHealth) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Weakened: {Math.round(((monster.maxHealth - monster.health) / monster.maxHealth) * 100)}%
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Monster Detail Dialog */}
      <Dialog open={!!selectedMonster} onOpenChange={() => setSelectedMonster(null)}>
        <DialogContent className="bg-card glow-effect">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-2xl">{selectedMonster?.image}</span>
              {selectedMonster?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedMonster?.captured ? (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Type:</span>
                      <div className="text-muted-foreground">{selectedMonster.type}</div>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Threat Level:</span>
                      <Badge
                        variant={
                          selectedMonster.threat === "High"
                            ? "destructive"
                            : selectedMonster.threat === "Medium"
                              ? "secondary"
                              : "default"
                        }
                        className="ml-2"
                      >
                        {selectedMonster.threat}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Captured: {selectedMonster.captureDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{selectedMonster.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span className="text-sm">XP Reward: {selectedMonster.xpReward}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-sm font-medium">Monster Health:</span>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-destructive h-3 rounded-full transition-all"
                        style={{ width: `${(selectedMonster.health / selectedMonster.maxHealth) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {selectedMonster.health}/{selectedMonster.maxHealth} HP remaining
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Lock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-muted-foreground">
                    This monster hasn't been captured yet. Find it in the AR world to unlock its details!
                  </div>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
