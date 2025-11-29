"use client"

import VisionUploader from "@/components/device/vision-uploader"



export default function VisionPage({ params }: { params: { deviceId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Vision Detection</h1>
      <VisionUploader deviceId={params.deviceId} />
    </div>
  )
}
