"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { updateDeviceNameAndPassword } from "../device-management.api"

export default function DeviceSecurityPage({
  params,
}: {
  params: { deviceId: string }
}) {
  const router = useRouter()
  const { deviceId } = params

  const [name, setName] = useState("")
  const [newPassword, setNewPassword] = useState("")

  async function handleSubmit() {
    await updateDeviceNameAndPassword(deviceId, name, newPassword)
    router.push(`/devices/${deviceId}`)
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-medium">Update Device Details</h1>

      <Input
        placeholder="New device name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="New device password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
