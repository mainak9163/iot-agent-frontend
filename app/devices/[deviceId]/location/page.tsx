"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { updateDeviceLocation } from "../device-management.api"

export default function UpdateLocationPage({
  params,
}: {
  params: { deviceId: string }
}) {
  const router = useRouter()
  const { deviceId } = params

  const [label, setLabel] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")

  async function handleSubmit() {
    await updateDeviceLocation(deviceId, label, Number(lat), Number(lng))
    router.push(`/devices/${deviceId}`)
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-medium">Update Location</h1>

      <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} />
      <Input placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} />
      <Input placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
