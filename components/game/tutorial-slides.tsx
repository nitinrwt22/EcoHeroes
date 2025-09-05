"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Camera, CheckCircle, Globe, ArrowLeft, ArrowRight } from "lucide-react"

interface TutorialSlidesProps {
  onComplete: () => void
  onBack: () => void
}

export function TutorialSlides({ onComplete, onBack }: TutorialSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: Camera,
      title: "Hunt Pollution Monsters",
      description:
        "Use your camera to discover aggressive pollution monsters lurking in your neighborhood. These ferocious beasts feed on environmental damage!",
      color: "text-red-600",
    },
    {
      icon: CheckCircle,
      title: "Complete Missions",
      description:
        "Take photos, record data, and interview locals to gather evidence and weaken these menacing creatures.",
      color: "text-emerald-600",
    },
    {
      icon: Globe,
      title: "Save the Environment",
      description:
        "Defeat the monsters to clean up pollution and protect your community from these environmental threats!",
      color: "text-emerald-600",
    },
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      onComplete()
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      onBack()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-emerald-600" : "bg-emerald-300"}`}
            />
          ))}
        </div>

        {/* Slide content */}
        <Card className="p-8 text-center mb-8 glow-effect bg-white border-emerald-200">
          <div className="mb-6">
            <div
              className={`w-20 h-20 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center ${slides[currentSlide].color}`}
            >
              {(() => {
                const IconComponent = slides[currentSlide].icon
                return <IconComponent className="w-10 h-10" />
              })()}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-balance">{slides[currentSlide].title}</h2>
            <p className="text-gray-600 text-pretty leading-relaxed">{slides[currentSlide].description}</p>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
          <Button
            variant="outline"
            onClick={prevSlide}
            className="flex-1 bg-white border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentSlide === 0 ? "Back" : "Previous"}
          </Button>
          <Button onClick={nextSlide} className="flex-1 pulse-glow bg-emerald-600 hover:bg-emerald-700">
            {currentSlide === slides.length - 1 ? "Start Hunting" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
