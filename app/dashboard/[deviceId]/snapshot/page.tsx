/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import axios from "@/lib/axios"
import { useAuth } from "@/lib/auth-store"
import SnapshotView from "@/components/device/snapshot-view"


export default function SnapshotPage({ params }: { params: { deviceId: string } }) {
  const [data, setData] = useState<any>(null)
  const token = useAuth(s => s.token)
  const { deviceId } = params

  useEffect(() => {
    async function load() {
      const res = await axios.get(`/devices/${deviceId}/snapshot`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setData(res.data)
    }
    load()
  }, [deviceId, token])

  if (!data) {
    return <p className="text-muted-foreground">Loading snapshot...</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Snapshot</h1>
      <SnapshotView data={data} />
    </div>
  )
}
