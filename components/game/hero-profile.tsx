"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Zap, Target, Calendar, MapPin, Award, Users, TrendingUp, Star } from "lucide-react"
import type { HeroData } from "./hero-registration"

export function HeroProfile() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    const savedHeroData = localStorage.getItem("ecoHeroData")
    if (savedHeroData) {
      setHeroData(JSON.parse(savedHeroData))
    }
  }, [])

  const heroStats = {
    level: 1,
    xp: 0,
    xpToNext: 100,
    monstersDefeated: 2,
    totalMonsters: 5,
    investigationsCompleted: 2,
    communityRank: 15,
    joinDate: "2024-01-10",
    lastActive: "Today",
  }

  const achievements = [
    {
      id: "first-capture",
      name: "First Capture",
      description: "Defeated your first pollution monster",
      icon: <Target className="w-4 h-4" />,
      unlocked: true,
      rarity: "Common",
    },
    {
      id: "air-specialist",
      name: "Air Specialist",
      description: "Defeated 3 air pollution monsters",
      icon: <Zap className="w-4 h-4" />,
      unlocked: false,
      rarity: "Rare",
    },
    {
      id: "community-hero",
      name: "Community Hero",
      description: "Completed 10 community investigations",
      icon: <Users className="w-4 h-4" />,
      unlocked: false,
      rarity: "Epic",
    },
    {
      id: "eco-champion",
      name: "Eco Champion",
      description: "Reached level 10",
      icon: <Trophy className="w-4 h-4" />,
      unlocked: false,
      rarity: "Legendary",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "EcoMaster2024", level: 15, score: 2450 },
    { rank: 2, name: "GreenGuardian", level: 12, score: 1890 },
    { rank: 3, name: "PlanetProtector", level: 11, score: 1675 },
    { rank: 14, name: "CleanAirFighter", level: 8, score: 890 },
    { rank: 15, name: heroData?.name || "You", level: heroStats.level, score: 150, isCurrentUser: true },
    { rank: 16, name: "EcoNewbie", level: 1, score: 120 },
  ]

  if (!heroData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading hero profile...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Hero Info Card */}
      <Card className="p-6 glow-effect">
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="w-16 h-16 border-2 border-primary">
            <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
              {heroData.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-primary">{heroData.name}</h2>
            <p className="text-muted-foreground">{heroData.school}</p>
            <Badge variant="secondary" className="mt-1">
              {heroData.grade} • Level {heroStats.level} EcoHero
            </Badge>
          </div>
        </div>

        {/* XP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Experience Points</span>
            <span>
              {heroStats.xp}/{heroStats.xpToNext} XP
            </span>
          </div>
          <Progress value={(heroStats.xp / heroStats.xpToNext) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground">
            {heroStats.xpToNext - heroStats.xp} XP needed for Level {heroStats.level + 1}
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{heroStats.monstersDefeated}</div>
          <div className="text-sm text-muted-foreground">Monsters Defeated</div>
          <div className="text-xs text-muted-foreground mt-1">
            {heroStats.totalMonsters - heroStats.monstersDefeated} remaining
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-secondary">{heroStats.investigationsCompleted}</div>
          <div className="text-sm text-muted-foreground">Investigations</div>
          <div className="text-xs text-muted-foreground mt-1">Completed</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent">#{heroStats.communityRank}</div>
          <div className="text-sm text-muted-foreground">Community Rank</div>
          <div className="text-xs text-muted-foreground mt-1">Local leaderboard</div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">
            {Math.round((heroStats.monstersDefeated / heroStats.totalMonsters) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">Collection</div>
          <div className="text-xs text-muted-foreground mt-1">Complete</div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Award className="w-5 h-5" />
          Achievements
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                achievement.unlocked
                  ? "bg-primary/5 border-primary/20 glow-effect"
                  : "bg-muted/50 border-muted opacity-60"
              }`}
            >
              <div
                className={`p-2 rounded-full ${
                  achievement.unlocked ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${achievement.unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                  {achievement.name}
                </h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              <Badge
                variant={
                  achievement.rarity === "Legendary"
                    ? "destructive"
                    : achievement.rarity === "Epic"
                      ? "secondary"
                      : achievement.rarity === "Rare"
                        ? "default"
                        : "outline"
                }
                className="text-xs"
              >
                {achievement.rarity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Local Leaderboard
        </h3>
        <div className="space-y-2">
          {leaderboard.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                player.isCurrentUser ? "bg-primary/10 border border-primary/20 glow-effect" : "bg-muted/30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  player.rank <= 3 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {player.rank <= 3 ? <Star className="w-4 h-4" /> : player.rank}
              </div>
              <div className="flex-1">
                <div className="font-medium">{player.name}</div>
                <div className="text-sm text-muted-foreground">Level {player.level}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-primary">{player.score}</div>
                <div className="text-xs text-muted-foreground">points</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Activity Info */}
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Joined: {heroStats.joinDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>Last active: {heroStats.lastActive}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
