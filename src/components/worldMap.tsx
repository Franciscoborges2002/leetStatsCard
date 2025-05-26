"use client"

import { useEffect, useRef } from "react"

interface WorldMapProps {
  data: Array<{
    country: string
    users: number
  }>
}

export default function WorldMap({ data }: WorldMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real implementation, this would use a mapping library like react-simple-maps
    // or a visualization library like d3-geo to render an actual world map
    // For this example, we'll just create a placeholder

    if (mapRef.current) {
      const mapElement = mapRef.current
      mapElement.innerHTML = ""

      const mapPlaceholder = document.createElement("div")
      mapPlaceholder.className = "w-full h-full flex items-center justify-center bg-muted/30 rounded-lg"
      mapPlaceholder.innerHTML = `
        <div class="text-center">
          <div class="text-lg font-medium mb-2">World Map Visualization</div>
          <div class="text-sm text-muted-foreground">
            In a real implementation, this would show a heatmap of users by country.<br>
            Top countries: ${data
              .slice(0, 3)
              .map((d) => d.country)
              .join(", ")}
          </div>
        </div>
      `

      mapElement.appendChild(mapPlaceholder)
    }
  }, [data])

  return <div ref={mapRef} className="w-full h-full"></div>
}
