"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Item } from "../inventory-management.types"


const statusColors: Record<Item["status"], string> = {
  ok: "bg-green-600",
  expiring_soon: "bg-yellow-500",
  expired: "bg-red-600",
  consumed: "bg-blue-500",
  spoilt: "bg-zinc-600"
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <Link href={`/devices/${item.device_id}/items/${item.id}`}>
      <Card className="p-4 hover:bg-accent transition cursor-pointer flex justify-between">
        <div>
          <h3 className="font-medium">{item.name}</h3>
          {item.brand && (
            <p className="text-sm text-muted-foreground">{item.brand}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            Qty: {item.quantity} {item.unit}
          </p>
        </div>

        <Badge className={statusColors[item.status]}>
          {item.status.replace("_", " ")}
        </Badge>
      </Card>
    </Link>
  )
}
