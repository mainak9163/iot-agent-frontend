import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeviceBootstrapInfo } from "../devices.types"
import { fetchDevice } from "../devices.api"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Cpu, MapPin, Clock } from "lucide-react"

export default async function DeviceOverviewPage({
  params,
}: {
  params: Promise<{ deviceId: string }>
}) {
  const { deviceId } = await params
  const device: DeviceBootstrapInfo["device"] | undefined = await fetchDevice(deviceId)

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">

      {/* ===========================
          HEADER CARD
      ============================ */}
      <Card className="shadow-sm">
        <CardHeader>
          <h1 className="text-3xl font-semibold">{device?.name}</h1>
        </CardHeader>

        <CardContent className="text-muted-foreground space-y-2">
          <p className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Serial: {device?.pi_serial}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location: {device?.location_label}
          </p>

          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Last Seen:{" "}
            {device?.last_seen_at
              ? new Date(device.last_seen_at).toLocaleString()
              : "Never"}
          </p>
        </CardContent>
      </Card>

      {/* ===========================
          ACTIONS SECTION
      ============================ */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Device Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Link href={`/devices/${deviceId}/edit`} className="w-full">
            <Button variant="secondary" className="w-full justify-start gap-2">
              ✏️ Edit Name
            </Button>
          </Link>

          <Link href={`/devices/${deviceId}/location`} className="w-full">
            <Button variant="secondary" className="w-full justify-start gap-2">
              📍 Update Location
            </Button>
          </Link>

          <Link href={`/devices/${deviceId}/security`} className="w-full">
            <Button variant="secondary" className="w-full justify-start gap-2">
              🔐 Update Name + Password
            </Button>
          </Link>

          <Link href={`/devices/${deviceId}/delete`} className="w-full">
            <Button
              variant="destructive"
              className="w-full justify-start gap-2"
            >
              🗑️ Delete Device
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
