"use client"

import AgentInterface from "@/components/device/agent-interface"

export default function AgentPage({ params }: { params: { deviceId: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Kitchen AI Assistant</h1>
      <AgentInterface deviceId={params.deviceId} />
    </div>
  )
}
