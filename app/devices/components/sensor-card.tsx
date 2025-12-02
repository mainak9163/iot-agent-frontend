/* eslint-disable react-hooks/static-components */
"use client"

import { Card } from "@/components/ui/card"
import { LucideIcon, Thermometer, Droplet, Fuel, Scaling } from "lucide-react" // Importing relevant icons

// Helper function to get default icon if none is provided
const getDefaultIcon = (label: string): LucideIcon => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('temp')) return Thermometer;
    if (lowerLabel.includes('humid')) return Droplet;
    if (lowerLabel.includes('gas')) return Fuel;
    if (lowerLabel.includes('weight')) return Scaling;
    return Thermometer; // Default fallback
}

// Helper function to resolve icon outside of render
const resolveIcon = (iconProp: LucideIcon | undefined, label: string): LucideIcon => {
    return iconProp || getDefaultIcon(label);
}

export function SensorCard({
  label,
  value,
  unit,
  icon: IconProp, // Renaming to IconProp to avoid collision
  accent = "text-primary-accent" // Default accent color using the theme
}: {
  label: string
  value: string | number | null
  unit?: string
  icon?: LucideIcon // Optional icon component from Lucide
  accent?: string // Tailwind class for color (e.g., 'text-red-500')
}) {
    
    const Icon = resolveIcon(IconProp, label);
    const displayValue = value === null || value === undefined ? "—" : value.toString();
    const hasValue = displayValue !== "—";

    return (
        <Card className="p-4 flex flex-col justify-between h-full transition-shadow duration-200 hover:shadow-lg">
            
            {/* Top Row: Icon and Label */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground">{label}</p>
                {/* Icon uses a lighter background and the accent color */}
                <div className={`p-1 rounded-full bg-primary-accent/10 ${accent}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </div>

            {/* Bottom Row: Value and Unit */}
            <div className="flex items-end">
                <p className={`text-3xl font-extrabold ${hasValue ? accent : 'text-muted-foreground'}`}>
                    {displayValue}
                </p>
                {unit && hasValue ? (
                    <span className="text-sm font-medium ml-1 mb-1 text-muted-foreground">{unit}</span>
                ) : null}
            </div>

        </Card>
    )
}