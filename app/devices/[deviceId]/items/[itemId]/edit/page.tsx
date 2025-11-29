"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { Item } from "../../inventory-management.types"
import { fetchItem, updateItem } from "../../inventory-management.api"


export default function EditItemPage({ params }: { params: { deviceId: string; itemId: string } }) {
  const { deviceId, itemId } = params
  const router = useRouter()

  const [item, setItem] = useState<Item | null>(null)

  const [quantity, setQuantity] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchItem(deviceId, itemId).then((data) => {
      setItem(data)
      setQuantity(data.quantity)
      setNotes(data.notes ?? "")
    })
  }, [])

  async function handleSubmit() {
    await updateItem(deviceId, itemId, {
      quantity:Number(quantity),
      notes,
    })
    router.push(`/devices/${deviceId}/items`)
    router.refresh()
  }

  if (!item) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Edit Item</h2>

      <Input
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <Input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
