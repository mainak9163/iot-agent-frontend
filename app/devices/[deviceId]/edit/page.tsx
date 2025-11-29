"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { updateDeviceName } from "../device-management.api"

export default function EditDeviceNamePage({
  params,
}: {
  params: { deviceId: string }
}) {
  const router = useRouter()
  const { deviceId } = params

  const [name, setName] = useState("")

  async function handleSubmit() {
    await updateDeviceName(deviceId, name)
    router.push(`/devices/${deviceId}`)
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-medium">Rename Device</h1>

      <Input
        placeholder="New device name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
