"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, School, GraduationCap, ArrowLeft } from "lucide-react"

interface HeroRegistrationProps {
  onComplete: (heroData: HeroData) => void
  onBack: () => void
}

export interface HeroData {
  name: string
  school: string
  grade: string
}

export function HeroRegistration({ onComplete, onBack }: HeroRegistrationProps) {
  const [heroData, setHeroData] = useState<HeroData>({
    name: "",
    school: "",
    grade: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (heroData.name && heroData.school && heroData.grade) {
      onComplete(heroData)
    }
  }

  const isValid = heroData.name && heroData.school && heroData.grade

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="p-8 glow-effect">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2 text-balance">Create Your EcoHero</h2>
            <p className="text-muted-foreground text-pretty">
              Tell us about yourself to start your environmental mission!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Hero Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={heroData.name}
                onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                className="glow-effect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school" className="flex items-center gap-2">
                <School className="w-4 h-4" />
                School
              </Label>
              <Input
                id="school"
                placeholder="Enter your school name"
                value={heroData.school}
                onChange={(e) => setHeroData({ ...heroData, school: e.target.value })}
                className="glow-effect"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Grade Level
              </Label>
              <Select value={heroData.grade} onValueChange={(value) => setHeroData({ ...heroData, grade: value })}>
                <SelectTrigger className="glow-effect">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elementary">Elementary (K-5)</SelectItem>
                  <SelectItem value="middle">Middle School (6-8)</SelectItem>
                  <SelectItem value="high">High School (9-12)</SelectItem>
                  <SelectItem value="college">College</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={!isValid} className="flex-1 pulse-glow">
                Start Mission!
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
