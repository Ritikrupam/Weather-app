import { NextResponse } from "next/server"

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get("location")
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!API_KEY) {
      return NextResponse.json({ message: "Weather API key is not configured" }, { status: 500 })
    }

    let url: string

    if (lat && lon) {
      url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    } else if (location) {
      url = `${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`
    } else {
      return NextResponse.json({ message: "Location or coordinates are required" }, { status: 400 })
    }

    const response = await fetch(url)

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()

    const weatherData = {
      location: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      dt: data.dt,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 500 })
  }
}
