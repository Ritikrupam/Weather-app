"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon, MapPin } from "lucide-react"

interface SearchProps {
  onSearch: (location: string) => void
  onGetLocation: () => void
}

export function Search({ onSearch, onGetLocation }: SearchProps) {
  const [location, setLocation] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (location.trim()) {
      onSearch(location.trim())
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            placeholder="Enter city name..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Search
        </Button>
        <Button type="button" variant="outline" onClick={onGetLocation} className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span className="hidden sm:inline">Current Location</span>
        </Button>
      </form>
    </div>
  )
}
