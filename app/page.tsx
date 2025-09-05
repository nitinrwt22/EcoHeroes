"use client"

import { useState, useEffect } from "react"
import { OnboardingFlow } from "@/components/game/onboarding-flow"
import type { HeroData } from "@/components/game/hero-registration"
import { Camera, BookOpen, Target, MapPin } from "lucide-react"
import { SectionCard } from "@/components/section-card"

export default function HomePage() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user has already completed onboarding
    const savedHeroData = localStorage.getItem("ecoHeroData")
    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData))
    }
    setIsLoading(false)
  }, [])

  const handleOnboardingComplete = (data: HeroData) => {
    setHeroData(data)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // Show onboarding if no hero data exists
  if (!heroData) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  // Show main game interface
  return (
    <main className="pb-20">
      <header className="mx-auto max-w-xl px-4 pt-6">
        <div className="text-center mb-2">
          <h1 className="text-pretty text-3xl font-bold text-primary">Welcome back, {heroData.name}!</h1>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Ready to hunt some pollution monsters?</p>
        </div>

        {/* Hero stats bar */}
        <div className="mt-4 p-3 bg-card rounded-lg border glow-effect">
          <div className="flex justify-between items-center text-sm">
            <div className="text-center">
              <div className="font-semibold text-primary">Level 1</div>
              <div className="text-muted-foreground">EcoHero</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-secondary">0 XP</div>
              <div className="text-muted-foreground">Experience</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-accent">0</div>
              <div className="text-muted-foreground">Monsters</div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto mt-6 max-w-xl px-4">
        <div className="grid gap-4">
          <SectionCard
            href="/ar"
            title="Start AR Hunt"
            description="Use your camera to discover and battle pollution monsters hiding nearby!"
            icon={<Camera className="h-5 w-5" />}
            className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors pulse-glow"
          />
          <SectionCard
            href="/monsterdex"
            title="MonsterDex"
            description="View your captured monsters, their stats, and environmental impact data."
            icon={<BookOpen className="h-5 w-5" />}
            className="border-secondary/20 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          />
          <SectionCard
            href="/profile"
            title="Hero Profile"
            description="Check your achievements, level progress, and hero statistics."
            icon={<Target className="h-5 w-5" />}
            className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors"
          />
          <SectionCard
            href="/map"
            title="Community Map"
            description="See monster activity and connect with other EcoHeroes in your area."
            icon={<MapPin className="h-5 w-5" />}
            className="border-muted-foreground/20 bg-muted hover:bg-muted/80 transition-colors"
          />
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-xl px-4">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 glow-effect">
          <h3 className="font-semibold text-primary mb-2">Mission Status</h3>
          <p className="text-sm text-foreground">
            Welcome to EcoHeroes! Start your first AR hunt to discover pollution monsters in your neighborhood.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground">Ready for action</span>
          </div>
        </div>
      </section>
    </main>
  )
}
