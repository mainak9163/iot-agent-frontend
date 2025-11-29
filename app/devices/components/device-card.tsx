"use client"

import { Card, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeviceBootstrapInfo } from "../devices.types"

export default function DeviceCard({ device }: { device: DeviceBootstrapInfo["device"] }) {

  return (
    <Card className="p-4 flex justify-between items-center">
      <div>
        <CardTitle>{device.name}</CardTitle>
        <CardDescription>
          {device.location_label || "No location set"}
        </CardDescription>
        <p className="text-xs text-muted-foreground mt-1">
          Last seen: {new Date(device.last_seen_at).toLocaleString()}
        </p>
      </div>

      <Link href={`/devices/${device.id}`}>
        <Button variant="secondary">Open</Button>
      </Link>
    </Card>
  )
}
