"use client"

import BarcodeScan from "@/components/device/barcode-scan"

export default function BarcodeScanPage({ params }: { params: { deviceId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Barcode Scan</h1>
      <BarcodeScan deviceId={params.deviceId} />
    </div>
  )
}
