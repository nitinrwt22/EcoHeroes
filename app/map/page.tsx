"use client"

import { CommunityMap } from "@/components/game/community-map"
import { BottomNav } from "@/components/bottom-nav"

export default function MapPage() {
  return (
    <main className="pb-20">
      <header className="mx-auto max-w-xl px-4 pt-6">
        <h1 className="text-pretty text-2xl font-bold text-primary">Community Map</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Discover monster locations, connect with other EcoHeroes, and coordinate community investigations.
        </p>
      </header>

      <section className="mx-auto mt-6 max-w-xl px-4">
        <CommunityMap />
      </section>

      <BottomNav />
    </main>
  )
}
