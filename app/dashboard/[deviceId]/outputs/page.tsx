"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useAuth } from "@/lib/auth-store"
import OutputsDetail from "@/components/device/outputs-detail"

export default function OutputsPage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params
  const token = useAuth(s => s.token)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      const res = await axios.get(`/devices/${deviceId}/outputs/latest`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data)
    }
    load()
  }, [deviceId, token])

  if (!data) {
    return <p className="text-muted-foreground">Loading outputs...</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Outputs</h1>
      <OutputsDetail data={data} />
    </div>
  )
}
