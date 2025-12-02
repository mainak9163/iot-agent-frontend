export const dynamic = "force-dynamic"

import { fetchDevice } from "../devices.api"
import { DeviceBootstrapInfo } from "../devices.types"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Cpu,
  MapPin,
  Clock,
  Thermometer,
  Gauge,
  ListChecks,
  Boxes,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DeviceOverviewPage({
  params,
}: {
  params: Promise<{ deviceId: string }>
}) {
  const { deviceId } = await params

  const device: DeviceBootstrapInfo["device"] | undefined =
    await fetchDevice(deviceId)

  if (!device) {
    return (
      <p className="text-muted-foreground">
        Device not found or unavailable.
      </p>
    )
  }

  return (
    <div className="space-y-10">

      {/* HEADER SUMMARY CARD */}
      <Card className="shadow-sm">
        <CardHeader>
          <h1 className="text-2xl font-semibold">{device.name}</h1>
          <p className="text-sm text-muted-foreground">
            Device Overview
          </p>
        </CardHeader>

        <CardContent className="space-y-3 text-muted-foreground">
          <p className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Serial: {device.pi_serial}
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location: {device.location_label}
          </p>
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Last Seen:{" "}
            {device.last_seen_at
              ? new Date(device.last_seen_at).toLocaleString()
              : "Never"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
