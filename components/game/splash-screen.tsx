"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Leaf, Zap, Users, ArrowRight } from "lucide-react"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Aggressive Shadow Monster */}
        <div className="absolute top-20 left-10 w-20 h-16 float-animation opacity-30" style={{ animationDelay: "0s" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-red-600 rounded-lg transform rotate-12"></div>
            <div className="absolute top-1 left-2 w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="absolute top-1 right-2 w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-red-700 rounded-full"></div>
          </div>
        </div>

        {/* Toxic Waste Monster */}
        <div className="absolute top-40 right-16 w-16 h-20 float-animation opacity-25" style={{ animationDelay: "1s" }}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-yellow-500 rounded-t-full"></div>
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full"></div>
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-yellow-600 rounded-b-lg"></div>
            <div className="absolute -bottom-1 left-1 w-2 h-3 bg-yellow-700 rounded-full"></div>
            <div className="absolute -bottom-1 right-1 w-2 h-3 bg-yellow-700 rounded-full"></div>
          </div>
        </div>

        {/* Smog Beast */}
        <div
          className="absolute bottom-32 left-20 w-24 h-18 float-animation opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gray-700 rounded-lg transform -rotate-6"></div>
            <div className="absolute top-1 left-3 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="absolute top-1 right-3 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-2 left-2 right-2 h-3 bg-gray-800 rounded-full"></div>
          </div>
        </div>

        {/* Pollution Demon */}
        <div
          className="absolute bottom-20 right-10 w-18 h-22 float-animation opacity-35"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-purple-600 rounded-lg"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-400 rounded-full"></div>
            <div className="absolute top-3 left-1 w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="absolute top-3 right-1 w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-purple-800 rounded-full"></div>
          </div>
        </div>
      </div>

      <div
        className={`text-center transition-all duration-1000 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center glow-effect">
            <Leaf className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2 text-balance">EcoHeroes</h1>
          <p className="text-xl text-white/90 text-pretty">Hunt Pollution Monsters, Save the Planet</p>
        </div>

        {/* Features */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-white/80">Hunt Monsters</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-white/80">Save Environment</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <p className="text-sm text-white/80">Join Community</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          onClick={onComplete}
          size="lg"
          className="bg-white text-emerald-600 hover:bg-white/90 pulse-glow text-lg px-8 py-6 rounded-xl font-semibold"
        >
          Join as EcoHero
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
