export const dynamic = "force-dynamic"

import { fetchDevice } from "../devices.api"
import { DeviceBootstrapInfo } from "../devices.types"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Cpu,
  MapPin,
  Clock,
  Boxes,
  Settings,
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
      <div className="flex items-center justify-center h-64">
        <p className="text-xl text-muted-foreground">
          Device not found or unavailable.
        </p>
      </div>
    )
  }

  return (
    // Applied max-width and padding for desktop constraint and spacing
    <div className="p-6 lg:p-10 space-y-10 max-w-6xl mx-auto"> 

      {/* Device Header & Summary */}
      <DeviceHeaderCard device={device} />

      {/* Future Sections (e.g., Device Metrics, Control Panel) */}
      {/* ... Add more components here later ... */}

    </div>
  )
}

// Helper component for the Header Card
function DeviceHeaderCard({ device }: { device: DeviceBootstrapInfo["device"] }) {
  const LastSeenDate = device.last_seen_at
    ? new Date(device.last_seen_at).toLocaleString()
    : "Never";

  return (
    <Card className="shadow-lg border-l-4 border-primary-accent"> {/* Added subtle accent border */}
      <CardHeader className="flex flex-row items-start justify-between pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{device.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1 inline align-text-bottom" />
            {device.location_label || "Location not set"}
          </p>
        </div>
      </CardHeader>

      {/* Information Grid */}
      <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1: Serial */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
          <Cpu className="h-5 w-5 text-primary-accent" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">Serial ID</p>
            <p className="text-sm font-semibold">{device.pi_serial}</p>
          </div>
        </div>
        
        {/* Metric 2: Last Seen */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
          <Clock className="h-5 w-5 text-primary-accent" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">Last Communication</p>
            <p className="text-sm font-semibold">{LastSeenDate}</p>
          </div>
        </div>

        {/* Placeholder Metric 3: Status/Home */}
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-secondary/50">
          <Boxes className="h-5 w-5 text-primary-accent" />
          <div>
            <p className="text-xs font-medium text-muted-foreground">Home ID</p>
            <p className="text-sm font-semibold">
                {/* Assuming homeId is part of device data or can be looked up */}
                {/* Fallback to device.id if home info is missing for now */}
                HOME-{device.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}