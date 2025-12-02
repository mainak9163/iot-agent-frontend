import DeviceCard from "./components/device-card"
import DeviceActions from "./components/devices-actions"
import { fetchDevices } from "./devices.api"
import { ListAllDevicesResponse } from "./devices.types"

export default async function DevicesPage() {
  const devices: ListAllDevicesResponse = await fetchDevices()

  return (
    <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between">
      <h1 className="text-4xl font-extrabold tracking-tight">
        ✨ Your Devices
      </h1>

      {/* DeviceActions (Assumed to contain Add Device button/filter) */}
      <DeviceActions /> 
</div>
      <div className="pt-2">
        {devices.length === 0 ? (
          // Sleeker Empty State
          <div className="flex flex-col items-center justify-center space-y-4 p-12 bg-muted/50 rounded-xl border border-dashed">
            <p className="text-xl text-muted-foreground font-medium">
              No devices registered yet.
            </p>
            <p className="text-sm text-gray-500">
              A silent workshop waiting for its first tool. 🛠️🌙
            </p>
          </div>
        ) : (
          // Modern, responsive grid layout for devices
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((d) => (
              <DeviceCard key={d.id} device={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}