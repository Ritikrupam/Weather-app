"use client"

import { useState, useEffect } from "react"
import { Search } from "@/components/search"
import { WeatherDisplay } from "@/components/weather-display"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export type WeatherData = {
  location: string
  country: string
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  condition: string
  icon: string
  dt: number
}

interface WeatherDashboardProps {
  onWeatherUpdate: (data: WeatherData | null) => void
}

export function WeatherDashboard({ onWeatherUpdate }: WeatherDashboardProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeatherByLocation = async (location: string) => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch weather data")
      }

      const data = await response.json()
      setWeatherData(data)
      onWeatherUpdate(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
      setWeatherData(null)
      onWeatherUpdate(null)
    } finally {
      setLoading(false)
    }
  }

  const getUserLocation = () => {
    setLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}`)

            if (!response.ok) {
              const errorData = await response.json()
              throw new Error(errorData.message || "Failed to fetch weather data")
            }

            const data = await response.json()
            setWeatherData(data)
            onWeatherUpdate(data)
          } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
            setWeatherData(null)
            onWeatherUpdate(null)
          } finally {
            setLoading(false)
          }
        },
        (err) => {
          setError("Unable to retrieve your location. Please search manually.")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <div className="space-y-6">
      <Search onSearch={fetchWeatherByLocation} onGetLocation={getUserLocation} />

      {loading && (
        <div className="flex justify-center my-12">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weatherData && !loading && <WeatherDisplay data={weatherData} />}
    </div>
  )
}
