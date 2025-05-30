"use client"

import { useState } from "react"
import { WeatherDashboard } from "@/components/weather-dashboard"
import { AnimatedBackground } from "@/components/animated-background"
import type { WeatherData } from "@/components/weather-dashboard"

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  return (
    <main className="min-h-screen relative overflow-hidden">
      <AnimatedBackground weatherCondition={weatherData?.condition || "clear"} />
      <div className="relative z-10 bg-gradient-to-b from-blue-50/80 to-blue-100/80 dark:from-gray-900/80 dark:to-gray-800/80 min-h-screen p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-100">Weather Dashboard</h1>
          <WeatherDashboard onWeatherUpdate={setWeatherData} />
        </div>
      </div>
    </main>
  )
}
