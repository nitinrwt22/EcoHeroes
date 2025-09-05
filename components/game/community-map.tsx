"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Users, Plus, Zap, Target, School, AlertTriangle, Camera, Navigation } from "lucide-react"

interface MonsterLocation {
  id: string
  name: string
  type: string
  threat: "Low" | "Medium" | "High"
  x: number
  y: number
  reportedBy: string
  reportedAt: string
  status: "active" | "investigating" | "defeated"
  playersNearby: number
}

interface ActivePlayer {
  id: string
  name: string
  level: number
  x: number
  y: number
  status: "hunting" | "investigating" | "idle"
}

export function CommunityMap() {
  const [selectedMonster, setSelectedMonster] = useState<MonsterLocation | null>(null)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [mapView, setMapView] = useState<"monsters" | "players" | "both">("both")

  const monsterLocations: MonsterLocation[] = [
    {
      id: "smog-1",
      name: "Smog Demon",
      type: "Air Pollution",
      threat: "High",
      x: 30,
      y: 25,
      reportedBy: "EcoMaster2024",
      reportedAt: "2 hours ago",
      status: "active",
      playersNearby: 3,
    },
    {
      id: "plastic-1",
      name: "Plastic Kraken",
      type: "Water Pollution",
      threat: "Medium",
      x: 70,
      y: 60,
      reportedBy: "GreenGuardian",
      reportedAt: "1 hour ago",
      status: "investigating",
      playersNearby: 1,
    },
    {
      id: "carbon-1",
      name: "Carbon Ghost",
      type: "Carbon Emissions",
      threat: "Medium",
      x: 50,
      y: 40,
      reportedBy: "You",
      reportedAt: "30 minutes ago",
      status: "active",
      playersNearby: 2,
    },
    {
      id: "sludge-1",
      name: "Toxic Sludge",
      type: "Soil Pollution",
      threat: "Low",
      x: 20,
      y: 70,
      reportedBy: "PlanetProtector",
      reportedAt: "4 hours ago",
      status: "defeated",
      playersNearby: 0,
    },
  ]

  const activePlayers: ActivePlayer[] = [
    { id: "player-1", name: "EcoMaster2024", level: 15, x: 32, y: 27, status: "hunting" },
    { id: "player-2", name: "GreenGuardian", level: 12, x: 68, y: 58, status: "investigating" },
    { id: "player-3", name: "CleanAirFighter", level: 8, x: 45, y: 35, status: "hunting" },
    { id: "player-4", name: "EcoNewbie", level: 1, x: 55, y: 45, status: "idle" },
  ]

  const currentLocation = { x: 50, y: 50 } // User's current location
  const schoolTerritory = { x: 45, y: 45, radius: 15 } // School territory

  const handleReportMonster = () => {
    console.log("[v0] Reporting new monster location")
    setShowReportDialog(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-destructive"
      case "investigating":
        return "bg-secondary"
      case "defeated":
        return "bg-muted"
      default:
        return "bg-primary"
    }
  }

  const getPlayerStatusColor = (status: string) => {
    switch (status) {
      case "hunting":
        return "bg-primary"
      case "investigating":
        return "bg-secondary"
      case "idle":
        return "bg-muted"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Community Map</h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={mapView === "monsters" ? "default" : "outline"}
              onClick={() => setMapView("monsters")}
            >
              <Zap className="w-3 h-3 mr-1" />
              Monsters
            </Button>
            <Button
              size="sm"
              variant={mapView === "players" ? "default" : "outline"}
              onClick={() => setMapView("players")}
            >
              <Users className="w-3 h-3 mr-1" />
              Players
            </Button>
            <Button size="sm" variant={mapView === "both" ? "default" : "outline"} onClick={() => setMapView("both")}>
              Both
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span>You</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span>School Territory</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-destructive rounded-full" />
            <span>Active Monsters</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span>Other Players</span>
          </div>
        </div>
      </Card>

      {/* Interactive Map */}
      <Card className="relative aspect-square bg-gradient-to-br from-accent/10 to-primary/10 overflow-hidden glow-effect">
        {/* School Territory Circle */}
        <div
          className="absolute border-2 border-accent/30 bg-accent/10 rounded-full"
          style={{
            left: `${schoolTerritory.x - schoolTerritory.radius}%`,
            top: `${schoolTerritory.y - schoolTerritory.radius}%`,
            width: `${schoolTerritory.radius * 2}%`,
            height: `${schoolTerritory.radius * 2}%`,
          }}
        />

        {/* School Icon */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${schoolTerritory.x}%`, top: `${schoolTerritory.y}%` }}
        >
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <School className="w-3 h-3 text-accent-foreground" />
          </div>
        </div>

        {/* Current Location */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${currentLocation.x}%`, top: `${currentLocation.y}%` }}
        >
          <div className="w-4 h-4 bg-primary rounded-full border-2 border-white pulse-glow">
            <div className="w-full h-full bg-primary rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Monster Locations */}
        {(mapView === "monsters" || mapView === "both") &&
          monsterLocations.map((monster) => (
            <button
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 ${getStatusColor(
                monster.status,
              )} rounded-full border-2 border-white hover:scale-110 transition-all cursor-pointer`}
              style={{ left: `${monster.x}%`, top: `${monster.y}%` }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
              {monster.playersNearby > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-primary text-primary-foreground">
                  {monster.playersNearby}
                </Badge>
              )}
            </button>
          ))}

        {/* Active Players */}
        {(mapView === "players" || mapView === "both") &&
          activePlayers.map((player) => (
            <div
              key={player.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 ${getPlayerStatusColor(
                player.status,
              )} rounded-full border border-white`}
              style={{ left: `${player.x}%`, top: `${player.y}%` }}
              title={`${player.name} (Level ${player.level}) - ${player.status}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Users className="w-2 h-2 text-white" />
              </div>
            </div>
          ))}

        {/* Report New Monster Button */}
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogTrigger asChild>
            <Button className="absolute bottom-4 right-4 rounded-full w-14 h-14 pulse-glow" size="lg">
              <Plus className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card glow-effect">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Report New Monster
              </DialogTitle>
              <DialogDescription>
                Help the community by reporting a new pollution monster you've discovered.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Monster Type</label>
                <Input placeholder="e.g., Smog Demon, Plastic Kraken" />
              </div>
              <div>
                <label className="text-sm font-medium">Location Description</label>
                <Input placeholder="e.g., Near the industrial district" />
              </div>
              <div>
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea placeholder="Describe what you observed..." />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Camera className="w-4 h-4 mr-1" />
                  Add Photo
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Navigation className="w-4 h-4 mr-1" />
                  Use GPS
                </Button>
              </div>
              <Button onClick={handleReportMonster} className="w-full pulse-glow">
                Submit Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Card>

      {/* Active Monsters List */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Target className="w-4 h-4" />
          Nearby Activity ({monsterLocations.filter((m) => m.status === "active").length} active)
        </h3>
        <div className="space-y-2">
          {monsterLocations
            .filter((monster) => monster.status === "active")
            .map((monster) => (
              <div
                key={monster.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                onClick={() => setSelectedMonster(monster)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 ${getStatusColor(monster.status)} rounded-full`} />
                  <div>
                    <div className="font-medium text-sm">{monster.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Reported by {monster.reportedBy} • {monster.reportedAt}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      monster.threat === "High" ? "destructive" : monster.threat === "Medium" ? "secondary" : "default"
                    }
                    className="text-xs"
                  >
                    {monster.threat}
                  </Badge>
                  {monster.playersNearby > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">{monster.playersNearby} players nearby</div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Monster Detail Dialog */}
      <Dialog open={!!selectedMonster} onOpenChange={() => setSelectedMonster(null)}>
        <DialogContent className="bg-card glow-effect">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              {selectedMonster?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedMonster && (
                <div className="space-y-3 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium">Type:</span>
                      <p className="text-muted-foreground">{selectedMonster.type}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Status:</span>
                      <Badge
                        variant={
                          selectedMonster.status === "active"
                            ? "destructive"
                            : selectedMonster.status === "investigating"
                              ? "secondary"
                              : "default"
                        }
                        className="ml-2"
                      >
                        {selectedMonster.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Reported by:</span>
                    <p className="text-muted-foreground">
                      {selectedMonster.reportedBy} • {selectedMonster.reportedAt}
                    </p>
                  </div>

                  {selectedMonster.playersNearby > 0 && (
                    <div>
                      <span className="text-sm font-medium">Community Activity:</span>
                      <p className="text-muted-foreground">
                        {selectedMonster.playersNearby} EcoHeroes are investigating this area
                      </p>
                    </div>
                  )}

                  {selectedMonster.status === "active" && (
                    <Button className="w-full mt-4 pulse-glow">
                      <Navigation className="w-4 h-4 mr-1" />
                      Navigate to Location
                    </Button>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
