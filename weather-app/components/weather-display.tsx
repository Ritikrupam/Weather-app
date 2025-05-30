import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/components/weather-dashboard"
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  Sun,
  SunDim,
  Thermometer,
  Wind,
} from "lucide-react"

interface WeatherDisplayProps {
  data: WeatherData
}

export function WeatherDisplay({ data }: WeatherDisplayProps) {
  const { location, country, temperature, feelsLike, humidity, windSpeed, condition, dt } = data

  const date = new Date(dt * 1000)
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date)

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("clear")) return <Sun className="h-12 w-12 text-yellow-500" />
    if (lowerCondition.includes("cloud") && !lowerCondition.includes("rain"))
      return <Cloud className="h-12 w-12 text-gray-500" />
    if (lowerCondition.includes("rain") || lowerCondition.includes("drizzle"))
      return <CloudRain className="h-12 w-12 text-blue-500" />
    if (lowerCondition.includes("thunder") || lowerCondition.includes("lightning"))
      return <CloudLightning className="h-12 w-12 text-purple-500" />
    if (lowerCondition.includes("snow")) return <CloudSnow className="h-12 w-12 text-blue-200" />
    if (lowerCondition.includes("mist") || lowerCondition.includes("fog"))
      return <CloudFog className="h-12 w-12 text-gray-400" />
    if (lowerCondition.includes("haze") || lowerCondition.includes("smoke"))
      return <SunDim className="h-12 w-12 text-orange-300" />
    if (lowerCondition.includes("drizzle")) return <CloudDrizzle className="h-12 w-12 text-blue-400" />

    return <Sun className="h-12 w-12 text-yellow-500" />
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex justify-between items-center">
            <span>
              {location}, {country}
            </span>
            {getWeatherIcon(condition)}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-4xl font-bold">{Math.round(temperature)}°C</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Feels like {Math.round(feelsLike)}°C</p>
              </div>
            </div>
            <p className="text-lg font-medium">{condition}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <p className="font-medium">{humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</p>
                <p className="font-medium">{windSpeed} m/s</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
