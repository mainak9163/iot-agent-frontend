"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useAuth } from "@/lib/auth-store"
import DeviceSettings from "@/components/device/device-settings"

export default function DeviceSettingsPage({ params }: { params: { deviceId: string } }) {
  const token = useAuth(s => s.token)
  const [device, setDevice] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const res = await axios.get(`/devices/${params.deviceId}/snapshot`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setDevice(res.data.device)
    }
    load()
  }, [params.deviceId, token])

  if (!device) return <p className="text-muted-foreground">Loading...</p>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Device Settings</h1>
      <DeviceSettings device={device} />
    </div>
  )
}
