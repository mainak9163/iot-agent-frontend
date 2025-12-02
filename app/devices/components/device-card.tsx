"use client"

import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeviceBootstrapInfo } from "../devices.types"
import { ArrowRight, Zap, MapPin } from "lucide-react" 

export default function DeviceCard({ device }: { device: DeviceBootstrapInfo["device"] }) {
  
  // Determines the icon for a small visual differentiation
  const getDeviceIcon = (name: string) => {
    // Example: If device name suggests a light, use yellow color
    if (name.toLowerCase().includes('light')) return <Zap className="w-5 h-5 text-yellow-400" />;
    // Default: Use the primary-accent color for general devices
    return <Zap className="w-5 h-5 text-primary-accent" />; 
  }

  return (
    <Card 
      className="p-6 flex flex-col justify-between h-full 
                 transition-all duration-300 hover:shadow-xl 
                 border-2 border-transparent hover:border-primary-accent/50" // Sleek border-accent on hover
    >
      
      {/* Top Section: Icon and Title */}
      <div className="flex items-start space-x-4 mb-4">
        {/* Icon background uses the primary-accent color for emphasis */}
        <div className="p-3 rounded-full bg-primary-accent/10 flex-shrink-0"> 
            {getDeviceIcon(device.name)}
        </div>
        <div className="flex-grow">
          <CardTitle className="text-xl font-bold truncate">
            {device.name}
          </CardTitle>
          <CardDescription className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="w-3 h-3 mr-1" />
            {device.location_label || "No location set"}
          </CardDescription>
        </div>
      </div>

      {/* Bottom Section: Metadata and Action */}
      <div className="mt-4 pt-4 border-t border-gray-200/50 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Last seen: {new Date(device.last_seen_at).toLocaleDateString()} at {new Date(device.last_seen_at).toLocaleTimeString()}
        </p>

        <Link href={`/devices/${device.id}`} className="flex-shrink-0">
          {/* Subtle icon button using the primary-accent color on hover */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="group text-muted-foreground hover:text-primary-accent"
          >
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </Card>
  )
}