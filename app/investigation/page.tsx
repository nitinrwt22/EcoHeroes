"use client"

import { useState } from "react"
import { InvestigationMission } from "@/components/game/investigation-mission"
import { useRouter } from "next/navigation"

export default function InvestigationPage() {
  const router = useRouter()
  const [monster] = useState({
    id: "smog-demon",
    name: "Smog Demon",
    type: "Air Pollution Monster",
    threat: "High" as const,
    health: 75,
    maxHealth: 100,
    color: "bg-destructive",
  })

  const handleMissionComplete = () => {
    // Show success animation and redirect
    console.log("[v0] Mission completed! Monster weakened.")
    router.push("/ar")
  }

  const handleBack = () => {
    router.push("/ar")
  }

  return <InvestigationMission monster={monster} onComplete={handleMissionComplete} onBack={handleBack} />
}
