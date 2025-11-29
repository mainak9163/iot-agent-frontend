"use client"

import { Card } from "@/components/ui/card"

export default function DashboardCard({
  title,
  value,
  footer,
  onClick
}: {
  title: string
  value: string | number
  footer?: string
  onClick?: () => void
}) {
  return (
    <Card
      className="p-4 hover:bg-accent transition cursor-pointer"
      onClick={onClick}
    >
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      {footer && (
        <p className="text-xs text-muted-foreground mt-1">{footer}</p>
      )}
    </Card>
  )
}
