"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { BarcodeScanResponse } from "./barcode-scan.types"
import { scanBarcode } from "./barcode-scan.api"


export default function BarcodeScanPage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params
  const router = useRouter()

  const [barcode, setBarcode] = useState("")
  const [timestamp, setTimestamp] = useState("")
  const [locationOverride, setLocationOverride] = useState("")
  const [result, setResult] = useState<BarcodeScanResponse | null>(null)

  async function handleScan() {
    const payload = {
      barcode,
      timestamp: timestamp || undefined,
      locationOverride: locationOverride || undefined
    }

    const res = await scanBarcode(deviceId, payload)
    setResult(res)
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Scan Barcode</h1>

      <Input
        placeholder="Barcode"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />

      <Input
        placeholder="Timestamp (optional)"
        type="datetime-local"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />

      <Input
        placeholder="Location override (optional)"
        value={locationOverride}
        onChange={(e) => setLocationOverride(e.target.value)}
      />

      <Button onClick={handleScan}>Scan</Button>

      {result && (
        <div className="border rounded p-4 space-y-2">
          <h2 className="font-semibold">Scan Result</h2>

          <p><strong>Name:</strong> {result.item.name}</p>
          <p><strong>Qty:</strong> {result.item.quantity}</p>
          <p><strong>Unit:</strong> {result.item.unit}</p>

          <p><strong>Parsed GTIN:</strong> {result.parsed.gtin ?? "–"}</p>
          <p><strong>MFD:</strong> {result.parsed.mfd ?? "–"}</p>
          <p><strong>EXPD:</strong> {result.parsed.expd ?? "–"}</p>

          <p>
            <strong>Expired:</strong>{" "}
            <span className={result.expired ? "text-red-600" : "text-green-600"}>
              {result.expired ? "Yes" : "No"}
            </span>
          </p>

          <p>
            <strong>Buzzer:</strong>{" "}
            {result.buzzerTriggered ? "Triggered" : "Silent"}
          </p>

          <Button
            className="w-full mt-2"
            onClick={() => router.push(`/devices/${deviceId}/items`)}
          >
            Back to Inventory
          </Button>
        </div>
      )}
    </div>
  )
}
