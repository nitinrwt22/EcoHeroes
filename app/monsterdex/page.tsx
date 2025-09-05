"use client"

import { MonsterCollection } from "@/components/game/monster-collection"
import { BottomNav } from "@/components/bottom-nav"

export default function MonsterDexPage() {
  return (
    <main className="pb-20">
      <header className="mx-auto max-w-xl px-4 pt-6">
        <h1 className="text-pretty text-2xl font-bold text-primary">MonsterDex</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Your collection of captured pollution monsters and their environmental impact data.
        </p>
      </header>

      <section className="mx-auto mt-6 max-w-xl px-4">
        <MonsterCollection />
      </section>

      <BottomNav />
    </main>
  )
}
