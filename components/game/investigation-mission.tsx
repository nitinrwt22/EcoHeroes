"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, Mic, FileText, Upload, ArrowLeft, Zap, CheckCircle, AlertTriangle } from "lucide-react"

interface Monster {
  id: string
  name: string
  type: string
  threat: "Low" | "Medium" | "High"
  health: number
  maxHealth: number
  color: string
}

interface MissionTask {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  completed: boolean
  evidence?: string
}

interface InvestigationMissionProps {
  monster: Monster
  onComplete: () => void
  onBack: () => void
}

export function InvestigationMission({ monster, onComplete, onBack }: InvestigationMissionProps) {
  const [tasks, setTasks] = useState<MissionTask[]>([
    {
      id: "photo",
      title: "Take Environmental Photos",
      description: "Capture 3 photos of the pollution source",
      icon: <Camera className="w-4 h-4" />,
      completed: false,
    },
    {
      id: "interview",
      title: "Interview Local Residents",
      description: "Record community impact stories",
      icon: <Mic className="w-4 h-4" />,
      completed: false,
    },
    {
      id: "data",
      title: "Record Environmental Data",
      description: "Measure air/water quality readings",
      icon: <FileText className="w-4 h-4" />,
      completed: false,
    },
  ])

  const [uploadedPhotos, setUploadedPhotos] = useState(0)
  const [missionProgress, setMissionProgress] = useState(0)

  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  const handleTaskComplete = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))

    // Update mission progress
    const newCompletedCount = tasks.filter((task) => (task.id === taskId ? !task.completed : task.completed)).length
    setMissionProgress((newCompletedCount / totalTasks) * 100)
  }

  const handlePhotoUpload = () => {
    setUploadedPhotos((prev) => Math.min(prev + 1, 3))
    if (uploadedPhotos + 1 >= 3) {
      handleTaskComplete("photo")
    }
  }

  const handleSubmitEvidence = () => {
    if (completedTasks === totalTasks) {
      onComplete()
    }
  }

  const canSubmit = completedTasks === totalTasks

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header with monster info */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-balance">{monster.name} Investigation</h1>
            <p className="text-white/90 text-sm">{monster.type}</p>
          </div>
        </div>

        {/* Circular health bar */}
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(monster.health / monster.maxHealth) * 251.2} 251.2`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold">{monster.health}</div>
                <div className="text-xs opacity-80">Health</div>
              </div>
            </div>
          </div>
        </div>

        {/* Threat level */}
        <div className="text-center">
          <Badge
            variant={monster.threat === "High" ? "destructive" : monster.threat === "Medium" ? "secondary" : "default"}
            className="bg-white/20 text-white border-white/30"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            {monster.threat} Threat
          </Badge>
        </div>
      </div>

      {/* Mission Progress */}
      <div className="p-4">
        <Card className="p-4 glow-effect">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-foreground">Mission Progress</h2>
            <span className="text-sm text-muted-foreground">
              {completedTasks}/{totalTasks} completed
            </span>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <p className="text-xs text-muted-foreground">Complete all tasks to weaken the {monster.name}</p>
        </Card>
      </div>

      {/* Mission Tasks */}
      <div className="px-4 space-y-3">
        {tasks.map((task) => (
          <Card
            key={task.id}
            className={`p-4 transition-all ${task.completed ? "bg-primary/5 border-primary/20" : ""}`}
          >
            <div className="flex items-start gap-3">
              <Checkbox checked={task.completed} onCheckedChange={() => handleTaskComplete(task.id)} className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {task.icon}
                  <h3 className={`font-medium ${task.completed ? "text-primary" : "text-foreground"}`}>{task.title}</h3>
                  {task.completed && <CheckCircle className="w-4 h-4 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                {/* Task-specific actions */}
                {task.id === "photo" && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={handlePhotoUpload} disabled={uploadedPhotos >= 3}>
                        <Upload className="w-3 h-3 mr-1" />
                        Upload Photo ({uploadedPhotos}/3)
                      </Button>
                    </div>
                  </div>
                )}

                {task.id === "interview" && !task.completed && (
                  <Button size="sm" variant="outline" onClick={() => handleTaskComplete(task.id)}>
                    <Mic className="w-3 h-3 mr-1" />
                    Start Recording
                  </Button>
                )}

                {task.id === "data" && !task.completed && (
                  <Button size="sm" variant="outline" onClick={() => handleTaskComplete(task.id)}>
                    <FileText className="w-3 h-3 mr-1" />
                    Record Data
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Submit Evidence Button */}
      <div className="p-4 mt-6">
        <Button
          onClick={handleSubmitEvidence}
          disabled={!canSubmit}
          className={`w-full py-6 text-lg font-semibold ${canSubmit ? "pulse-glow" : ""}`}
          size="lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          {canSubmit ? "Submit Evidence & Weaken Monster" : `Complete ${totalTasks - completedTasks} more tasks`}
        </Button>
      </div>
    </div>
  )
}
