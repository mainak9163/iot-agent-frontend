"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { VisionDetectedItem, VisionDetectionResponse } from "./vision.types"
import { visionDetect } from "./vision.api"

export default function VisionDetectionPage({
  params
}: {
  params: { deviceId: string }
}) {
  const { deviceId } = params
  const router = useRouter()

  const [imageUrl, setImageUrl] = useState("")
  const [items, setItems] = useState<VisionDetectedItem[]>([])

  const [currentName, setCurrentName] = useState("")
  const [currentQty, setCurrentQty] = useState("")
  const [currentUnit, setCurrentUnit] = useState("")
  const [currentExpd, setCurrentExpd] = useState("")

  const [result, setResult] = useState<VisionDetectionResponse | null>(null)

  function addDetectedItem() {
    if (!currentName || !currentQty || !currentUnit) return

    setItems([
      ...items,
      {
        name: currentName,
        quantity: Number(currentQty),
        unit: currentUnit,
        expd: currentExpd || undefined
      }
    ])

    setCurrentName("")
    setCurrentQty("")
    setCurrentUnit("")
    setCurrentExpd("")
  }

  async function handleSubmit() {
    const payload = {
      image_url: imageUrl,
      items
    }

    const res = await visionDetect(deviceId, payload)
    setResult(res)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Vision Detection</h1>

      <Input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <h2 className="font-medium pt-4">Detected Items</h2>

      {/* Add detected item */}
      <div className="space-y-2 border rounded p-4">
        <Input
          placeholder="Name"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
        <Input
          placeholder="Quantity"
          value={currentQty}
          onChange={(e) => setCurrentQty(e.target.value)}
        />
        <Input
          placeholder="Unit"
          value={currentUnit}
          onChange={(e) => setCurrentUnit(e.target.value)}
        />
        <Input
          placeholder="EXPD (optional)"
          type="date"
          value={currentExpd}
          onChange={(e) => setCurrentExpd(e.target.value)}
        />
        <Button onClick={addDetectedItem}>Add Detected Item</Button>
      </div>

      {/* Display items list */}
      {items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="border rounded p-2 text-sm flex justify-between"
            >
              <span>
                {item.name} — {item.quantity} {item.unit}
                {item.expd && ` (exp: ${item.expd})`}
              </span>
            </div>
          ))}
        </div>
      )}

      <Button onClick={handleSubmit}>Run Vision Detection</Button>

      {result && (
        <div className="border rounded p-4 space-y-4">
          <h2 className="font-semibold">AI Result</h2>

          <img
            src={result.image_url}
            alt="detected"
            className="rounded border max-w-full mb-2"
          />

          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {result.aiSummary}
          </p>

          <h3 className="font-medium pt-4">Items Added</h3>
          {result.created.map((item) => (
            <div key={item.id} className="border rounded p-3 text-sm">
              <strong>{item.name}</strong> — {item.quantity} {item.unit}
            </div>
          ))}

          <Button
            className="w-full mt-4"
            onClick={() => router.push(`/devices/${deviceId}/items`)}
          >
            Back to Inventory
          </Button>
        </div>
      )}
    </div>
  )
}
