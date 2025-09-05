"use client"

import { HeroProfile } from "@/components/game/hero-profile"
import { BottomNav } from "@/components/bottom-nav"

export default function ProfilePage() {
  return (
    <main className="pb-20">
      <header className="mx-auto max-w-xl px-4 pt-6">
        <h1 className="text-pretty text-2xl font-bold text-primary">Hero Profile</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Track your progress, achievements, and community standing.
        </p>
      </header>

      <section className="mx-auto mt-6 max-w-xl px-4">
        <HeroProfile />
      </section>

      <BottomNav />
    </main>
  )
}
