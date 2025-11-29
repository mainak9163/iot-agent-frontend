
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DeviceBootstrapInfo } from "../devices.types"
import { fetchDevice } from "../devices.api"


export default async function DeviceOverviewPage({
  params,
}: {
  params: { deviceId: string }
}) {
  const { deviceId } = params
  const data: DeviceBootstrapInfo = await fetchDevice(deviceId)
  const device = data.device

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">{device.name}</h1>

      <div className="space-y-2 text-muted-foreground">
        <p>Serial: {device.pi_serial}</p>
        <p>Location: {device.location_label}</p>
        <p>Last Seen: {new Date(device.last_seen_at).toLocaleString()}</p>
      </div>

      <div className="space-y-3 pt-4">
        <Link href={`/devices/${deviceId}/edit`}>
          <Button className="w-full">Edit Name</Button>
        </Link>

        <Link href={`/devices/${deviceId}/location`}>
          <Button className="w-full">Update Location</Button>
        </Link>

        <Link href={`/devices/${deviceId}/security`}>
          <Button className="w-full">Update Name + Password</Button>
        </Link>

        <Link href={`/devices/${deviceId}/delete`}>
          <Button variant="destructive" className="w-full">
            Delete Device
          </Button>
        </Link>
      </div>
    </div>
  )
}
