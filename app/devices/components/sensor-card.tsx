"use client"

import { Card } from "@/components/ui/card"

export function SensorCard({
  label,
  value,
  unit
}: {
  label: string
  value: string | null
  unit?: string
}) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold mt-1">
        {value ?? "—"}
        {unit && value !== null ? <span className="text-sm ml-1">{unit}</span> : null}
      </p>
    </Card>
  )
}
