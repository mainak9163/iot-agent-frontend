"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { addItem } from "../inventory-management.api"

export default function AddItemPage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params
  const router = useRouter()

  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState(0)
  const [unit, setUnit] = useState("")
  const [brand, setBrand] = useState("")
  const [mfd, setMfd] = useState("")
  const [expd, setExpd] = useState("")
  const [notes, setNotes] = useState("")

  async function handleSubmit() {
    await addItem(deviceId, {
      name,
      quantity,
      unit,
      brand: brand ?? null,
      mfd: mfd ?? null,
      expd: expd ?? null,
      notes: notes ?? null,
      source: "manual"
    })

    router.push(`/devices/${deviceId}/items`)
    router.refresh()
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold">Add Item</h2>

      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Brand (optional)" value={brand} onChange={(e) => setBrand(e.target.value)} />
      <Input placeholder="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
      <Input placeholder="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
      <Input placeholder="MFD" type="date" value={mfd} onChange={(e) => setMfd(e.target.value)} />
      <Input placeholder="EXPD" type="date" value={expd} onChange={(e) => setExpd(e.target.value)} />
      <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />

      <Button onClick={handleSubmit}>Save</Button>
    </div>
  )
}
