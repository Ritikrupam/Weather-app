"use client"

import { useEffect, useState } from "react"

interface AnimatedBackgroundProps {
  weatherCondition: string
}

export function AnimatedBackground({ weatherCondition }: AnimatedBackgroundProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const condition = weatherCondition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      const raindrops = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(raindrops)
    } else if (condition.includes("snow")) {
      const snowflakes = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
      setParticles(snowflakes)
    } else if (condition.includes("cloud")) {
      const clouds = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 120 - 20,
        y: Math.random() * 60 + 10,
        delay: Math.random() * 5,
      }))
      setParticles(clouds)
    } else {
      setParticles([])
    }
  }, [weatherCondition])

  const getBackgroundGradient = () => {
    const condition = weatherCondition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    } else if (condition.includes("snow")) {
      return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
    } else if (condition.includes("cloud")) {
      return "bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
    } else if (condition.includes("thunder") || condition.includes("lightning")) {
      return "bg-gradient-to-b from-gray-800 via-gray-900 to-black dark:from-gray-900 dark:via-gray-900 dark:to-black"
    } else if (condition.includes("clear") || condition.includes("sun")) {
      return "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900"
    } else if (condition.includes("mist") || condition.includes("fog")) {
      return "bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800"
    }

    return "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-gray-900"
  }

  const renderWeatherEffect = () => {
    const condition = weatherCondition.toLowerCase()

    if (condition.includes("rain") || condition.includes("drizzle")) {
      return (
        <>
          {particles.map((drop) => (
            <div
              key={drop.id}
              className="absolute w-0.5 h-8 bg-blue-300 dark:bg-blue-200 opacity-60 animate-rain"
              style={{
                left: `${drop.x}%`,
                top: `${drop.y}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </>
      )
    }

    if (condition.includes("snow")) {
      return (
        <>
          {particles.map((flake) => (
            <div
              key={flake.id}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80 animate-snow"
              style={{
                left: `${flake.x}%`,
                top: `${flake.y}%`,
                animationDelay: `${flake.delay}s`,
                animationDuration: "4s",
              }}
            />
          ))}
        </>
      )
    }

    if (condition.includes("cloud")) {
      return (
        <>
          {particles.map((cloud) => (
            <div
              key={cloud.id}
              className="absolute opacity-20 animate-float"
              style={{
                left: `${cloud.x}%`,
                top: `${cloud.y}%`,
                animationDelay: `${cloud.delay}s`,
                animationDuration: "20s",
              }}
            >
              <div className="w-16 h-8 bg-white rounded-full relative">
                <div className="absolute -top-2 left-2 w-8 h-8 bg-white rounded-full" />
                <div className="absolute -top-1 right-2 w-6 h-6 bg-white rounded-full" />
              </div>
            </div>
          ))}
        </>
      )
    }

    if (condition.includes("clear") || condition.includes("sun")) {
      return (
        <div className="absolute top-20 right-20 w-32 h-32 animate-pulse">
          <div className="w-full h-full bg-yellow-300 dark:bg-yellow-200 rounded-full opacity-60 animate-spin-slow relative">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-yellow-300 dark:bg-yellow-200 opacity-40"
                style={{
                  top: "-16px",
                  left: "50%",
                  transformOrigin: "50% 80px",
                  transform: `translateX(-50%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
        </div>
      )
    }

    if (condition.includes("thunder") || condition.includes("lightning")) {
      return (
        <div className="absolute inset-0 animate-lightning">
          <div className="absolute top-1/4 left-1/3 w-1 h-32 bg-yellow-200 opacity-0 animate-flash" />
          <div
            className="absolute top-1/3 right-1/4 w-1 h-24 bg-yellow-200 opacity-0 animate-flash"
            style={{ animationDelay: "2s" }}
          />
        </div>
      )
    }

    return null
  }

  return (
    <div className={`absolute inset-0 ${getBackgroundGradient()} transition-all duration-1000`}>
      {renderWeatherEffect()}
    </div>
  )
}
