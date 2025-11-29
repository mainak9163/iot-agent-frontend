"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useRouter } from "next/navigation"
import { claimDevice } from "../devices.api"

export default function DeviceActions() {
  const router = useRouter()

  const [deviceId, setDeviceId] = useState("")
  const [password, setPassword] = useState("")
  const [homeId, setHomeId] = useState("")

  async function handleClaim() {
    if (!deviceId || !password || !homeId) return

    await claimDevice(deviceId, password, homeId)
    router.refresh()
  }

  return (
    <div className="border p-4 rounded-md space-y-3">
      <p className="font-medium">Claim a Device</p>

      <Input
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />
      <Input
        placeholder="Device Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        placeholder="Home ID"
        value={homeId}
        onChange={(e) => setHomeId(e.target.value)}
      />

      <Button onClick={handleClaim}>Claim Device</Button>
    </div>
  )
}
