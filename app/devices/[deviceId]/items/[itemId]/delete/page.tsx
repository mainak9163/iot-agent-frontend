"use client"

import { Button } from "@/components/ui/button"
import { deleteItem } from "@/lib/api";

import { useRouter } from "next/navigation"

export default function DeleteItemPage({
  params,
}: {
  params: { deviceId: string; itemId: string }
}) {
  const { deviceId, itemId } = params
  const router = useRouter()

  async function handleDelete() {
    await deleteItem(deviceId, itemId)
    router.push(`/devices/${deviceId}/items`)
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold text-red-600">Delete Item?</h1>

      <p className="text-muted-foreground">
        This will remove the item from your shelf forever.
      </p>

      <Button variant="destructive" onClick={handleDelete}>
        Yes, delete item
      </Button>

      <Button variant="secondary" onClick={() => router.back()}>
        Cancel
      </Button>
    </div>
  )
}
