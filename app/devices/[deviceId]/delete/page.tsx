"use client"

import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { deleteDevice } from "../device-management.api"

export default function DeleteDevicePage({
  params,
}: {
  params: { deviceId: string }
}) {
  const router = useRouter()
  const { deviceId } = params

  async function handleDelete() {
    await deleteDevice(deviceId)
    router.push("/devices")
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-red-600">Delete Device?</h1>

      <p className="text-muted-foreground">
        This action removes the device and its linked data.  
        Like sweeping a tool off the workbench — there&apos;s no undo.
      </p>

      <Button variant="destructive" onClick={handleDelete}>
        Yes, delete device
      </Button>

      <Button variant="secondary" onClick={() => router.push(`/devices/${deviceId}`)}>
        Cancel
      </Button>
    </div>
  )
}
