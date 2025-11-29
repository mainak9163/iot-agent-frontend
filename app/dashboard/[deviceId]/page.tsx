import axios from "@/lib/axios"
import { useAuth } from "@/lib/auth-store"
import DeviceOverviewCard from "@/components/device/device-overview-card"
import SensorCards from "@/components/device/sensor-cards"
import { notFound } from "next/navigation"

export default async function DevicePage({
  params,
}: {
  params: { deviceId: string }
}) {
  const token = useAuth.getState().token

  if (!token) return notFound()

  const res = await axios.get(`/devices/${params.deviceId}/snapshot`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = res.data

  return (
    <div className="space-y-6">
      <DeviceOverviewCard device={data.device} />
      <SensorCards sensors={data.readings} />
    </div>
  )
}
