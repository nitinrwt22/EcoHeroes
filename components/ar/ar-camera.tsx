"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Bell, Zap, Target, Flashlight, RotateCcw, X } from "lucide-react"
import { useRouter } from "next/navigation"

interface Monster {
  id: string
  name: string
  type: string
  threat: "Low" | "Medium" | "High"
  x: number
  y: number
  color: string
  pollutionData: string
}

export function ARCamera() {
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null)
  const [heroLevel] = useState(1)
  const [heroXP] = useState(0)
  const [captureCount] = useState(0)
  const [torch, setTorch] = useState(false)
  const [radarActive, setRadarActive] = useState(true)
  const router = useRouter()

  const monsters: Monster[] = [
    {
      id: "smog-demon",
      name: "Smog Demon",
      type: "Air Pollution",
      threat: "High",
      x: 25,
      y: 30,
      color: "bg-red-600",
      pollutionData: "PM2.5: 85 μg/m³ (Unhealthy)",
    },
    {
      id: "plastic-kraken",
      name: "Plastic Kraken",
      type: "Water Pollution",
      threat: "Medium",
      x: 70,
      y: 45,
      color: "bg-blue-600",
      pollutionData: "Microplastics: 12 particles/L",
    },
    {
      id: "carbon-ghost",
      name: "Carbon Ghost",
      type: "Carbon Emissions",
      threat: "Medium",
      x: 45,
      y: 20,
      color: "bg-gray-600",
      pollutionData: "CO2: 420 ppm (Elevated)",
    },
    {
      id: "toxic-sludge",
      name: "Toxic Sludge",
      type: "Soil Pollution",
      threat: "Low",
      x: 80,
      y: 70,
      color: "bg-yellow-600",
      pollutionData: "Heavy metals detected",
    },
  ]

  const handleMonsterTap = (monster: Monster) => {
    setSelectedMonster(monster)
  }

  const handleInvestigate = () => {
    if (selectedMonster) {
      router.push("/investigation")
      setSelectedMonster(null)
    }
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Fullscreen camera background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Camera feed placeholder with subtle pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(5,150,105,0.1),transparent_50%)]" />
        </div>

        {monsters.map((monster) => (
          <button
            key={monster.id}
            onClick={() => handleMonsterTap(monster)}
            className={`absolute w-20 h-16 opacity-80 hover:opacity-100 transition-all duration-300 float-animation glow-effect cursor-pointer`}
            style={{
              left: `${monster.x}%`,
              top: `${monster.y}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {/* Aggressive Monster Silhouette */}
            <div className="relative w-full h-full">
              {/* Main body */}
              <div className={`absolute inset-0 ${monster.color} rounded-lg transform rotate-12 opacity-90`}></div>
              {/* Glowing eyes */}
              <div className="absolute top-1 left-2 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1 right-2 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
              {/* Menacing mouth */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-red-700 rounded-full"></div>
              {/* Spikes/horns */}
              <div className="absolute -top-1 left-1/4 w-2 h-4 bg-red-500 transform rotate-45"></div>
              <div className="absolute -top-1 right-1/4 w-2 h-4 bg-red-500 transform -rotate-45"></div>
              {/* Claws */}
              <div className="absolute -bottom-1 left-1 w-2 h-3 bg-red-800 rounded-full"></div>
              <div className="absolute -bottom-1 right-1 w-2 h-3 bg-red-800 rounded-full"></div>
            </div>
          </button>
        ))}

        {/* AR Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 border-2 border-emerald-500/60 rounded-lg">
            <div className="w-full h-full border border-emerald-500/40 rounded-lg m-1">
              <div className="w-full h-full flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-500/80" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400 border-emerald-500/30">
              Level {heroLevel}
            </Badge>
            <div className="text-white text-sm">
              <span className="text-emerald-400">{heroXP}</span> XP
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <Bell className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={() => setTorch(!torch)}>
              <Flashlight className={`w-4 h-4 ${torch ? "text-yellow-400" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex justify-between items-center">
          {/* Monster Radar */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={radarActive ? "default" : "ghost"}
              onClick={() => setRadarActive(!radarActive)}
              className="pulse-glow bg-emerald-600 hover:bg-emerald-700"
            >
              <Target className="w-4 h-4 mr-1" />
              Radar
            </Button>
            {radarActive && (
              <div className="text-white text-sm">
                <span className="text-emerald-400">{monsters.length}</span> detected
              </div>
            )}
          </div>

          {/* Capture Count */}
          <div className="text-center">
            <div className="text-white text-lg font-bold">{captureCount}</div>
            <div className="text-white/70 text-xs">Captured</div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Monster Detection Dialog */}
      <Dialog open={!!selectedMonster} onOpenChange={() => setSelectedMonster(null)}>
        <DialogContent className="bg-card border-emerald-500/20 glow-effect">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-600">
              <Zap className="w-5 h-5" />
              {selectedMonster?.name} Detected!
            </DialogTitle>
            <DialogDescription>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <Badge variant="outline" className="border-emerald-500/30">
                    {selectedMonster?.type}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Threat Level:</span>
                  <Badge
                    variant={
                      selectedMonster?.threat === "High"
                        ? "destructive"
                        : selectedMonster?.threat === "Medium"
                          ? "secondary"
                          : "default"
                    }
                  >
                    {selectedMonster?.threat}
                  </Badge>
                </div>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium">Pollution Data:</p>
                  <p className="text-sm text-muted-foreground">{selectedMonster?.pollutionData}</p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setSelectedMonster(null)}>
              <X className="w-4 h-4 mr-1" />
              Ignore
            </Button>
            <Button onClick={handleInvestigate} className="pulse-glow bg-emerald-600 hover:bg-emerald-700">
              <Target className="w-4 h-4 mr-1" />
              Investigate Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
