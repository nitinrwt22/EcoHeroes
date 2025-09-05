"use client"

import { useState } from "react"
import { SplashScreen } from "./splash-screen"
import { TutorialSlides } from "./tutorial-slides"
import { HeroRegistration, type HeroData } from "./hero-registration"

interface OnboardingFlowProps {
  onComplete: (heroData: HeroData) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<"splash" | "tutorial" | "registration">("splash")

  const handleSplashComplete = () => {
    setCurrentStep("tutorial")
  }

  const handleTutorialComplete = () => {
    setCurrentStep("registration")
  }

  const handleTutorialBack = () => {
    setCurrentStep("splash")
  }

  const handleRegistrationComplete = (heroData: HeroData) => {
    // Store hero data in localStorage for persistence
    localStorage.setItem("ecoHeroData", JSON.stringify(heroData))
    onComplete(heroData)
  }

  const handleRegistrationBack = () => {
    setCurrentStep("tutorial")
  }

  switch (currentStep) {
    case "splash":
      return <SplashScreen onComplete={handleSplashComplete} />
    case "tutorial":
      return <TutorialSlides onComplete={handleTutorialComplete} onBack={handleTutorialBack} />
    case "registration":
      return <HeroRegistration onComplete={handleRegistrationComplete} onBack={handleRegistrationBack} />
    default:
      return <SplashScreen onComplete={handleSplashComplete} />
  }
}
