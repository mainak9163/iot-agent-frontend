import DeviceCard from "./components/device-card"
import DeviceActions from "./components/devices-actions"
import { fetchDevices } from "./devices.api"
import { ListAllDevicesResponse } from "./devices.types"


export default async function DevicesPage() {
  const devices: ListAllDevicesResponse = await fetchDevices()

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-semibold">Your Devices</h1>

      <DeviceActions />

      <div className="pt-4 space-y-4">
        {devices.length === 0 ? (
          <p className="text-muted-foreground">
            No devices yet — a silent workshop waiting for its first tool. 🛠️🌙
          </p>
        ) : (
          devices.map((d) => <DeviceCard key={d.id} device={d} />)
        )}
      </div>
    </div>
  )
}
