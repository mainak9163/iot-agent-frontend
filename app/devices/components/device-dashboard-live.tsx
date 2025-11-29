"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DeviceDashboardResponse } from "../[deviceId]/device-monitoring.types"
import { SensorCard } from "./sensor-card"
import { fetchDeviceDashboard } from "../[deviceId]/device-monitoring.api"


export default function DeviceDashboardLive({
  deviceId,
  initial
}: {
  deviceId: string
  initial: DeviceDashboardResponse
}) {
  const [snapshot, setSnapshot] = useState(initial.snapshot)
  const [summary, setSummary] = useState(initial.summary)

  // History arrays for graph - initialize with initial data
  const [history, setHistory] = useState<{
    temp: any[]
    gas: any[]
    weight: any[]
  }>(() => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    })
    return {
      temp: [{ ts: time, value: Number(initial.snapshot.latest.dht11?.temperature_c ?? 0) }],
      gas: [{ ts: time, value: Number(initial.snapshot.latest.mq2?.gas_ppm ?? 0) }],
      weight: [{ ts: time, value: Number(initial.snapshot.latest.hx711?.weight_g ?? 0) }]
    }
  })

  // Poll every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const fresh = await fetchDeviceDashboard(deviceId)

        setSnapshot(fresh.snapshot)
        setSummary(fresh.summary)

        // Update history with new reading
        const time = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        })

        setHistory((prev) => ({
          temp: [...prev.temp, { ts: time, value: Number(fresh.snapshot.latest.dht11?.temperature_c ?? 0) }].slice(-50),
          gas: [...prev.gas, { ts: time, value: Number(fresh.snapshot.latest.mq2?.gas_ppm ?? 0) }].slice(-50),
          weight: [...prev.weight, { ts: time, value: Number(fresh.snapshot.latest.hx711?.weight_g ?? 0) }].slice(-50)
        }))
      } catch (error) {
        console.error('Failed to fetch dashboard:', error)
      }
    }, 10_000)

    return () => clearInterval(interval)
  }, [deviceId])

  const { device, latest } = snapshot

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-semibold">{device.name} — Live Dashboard</h1>

      <p className="text-sm text-muted-foreground">
        Location: {device.location.label}  
        <br />
        Last Seen: {new Date(device.last_seen_at).toLocaleString()}
      </p>

      {/* LIVE VALUES */}
      <h2 className="text-xl font-medium">Live Readings</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SensorCard label="Temperature" value={latest.dht11?.temperature_c ?? null} unit="°C" />
        <SensorCard label="Humidity" value={latest.dht11?.humidity ?? null} unit="%" />
        <SensorCard label="Gas" value={latest.mq2?.gas_ppm ?? null} unit="ppm" />
        <SensorCard label="Weight" value={latest.hx711?.weight_g ?? null} unit="g" />
      </div>

      {/* REAL-TIME GRAPHS */}
      <h2 className="text-xl font-medium pt-6">Real-Time Graphs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Temperature Graph */}
        <GraphCard title="Temperature (°C)" data={history.temp} />

        {/* Gas Graph */}
        <GraphCard title="Gas PPM" data={history.gas} />

        {/* Weight Graph */}
        <GraphCard title="Weight (g)" data={history.weight} />
      </div>

      {/* Webcam */}
      <h2 className="text-xl font-medium pt-6">Webcam</h2>
      {latest.webcam && (
        <div className="p-4 border rounded space-y-2 max-w-md">
          <img src={latest.webcam.image_url} alt="Webcam view" className="rounded border" />
          <p className="text-muted-foreground text-sm whitespace-pre-wrap">
            {latest.webcam.summary}
          </p>
        </div>
      )}

      {/* Outputs */}
      <h2 className="text-xl font-medium pt-6">Outputs</h2>
      <div className="grid grid-cols-2 gap-4">
        <SensorCard label="LED" value={latest.outputs?.led_on ? "On" : "Off"} />
        <SensorCard label="Buzzer" value={latest.outputs?.buzzer_on ? "On" : "Off"} />
      </div>

      {/* AI SUMMARY */}
      <h2 className="text-xl font-medium pt-6">AI Summary</h2>
      <p className="text-muted-foreground whitespace-pre-wrap">{summary}</p>
    </div>
  )
}

function GraphCard({ title, data }: { title: string; data: any[] }) {
  return (
    <div className="p-4 border rounded bg-card">
      <p className="text-sm text-muted-foreground mb-2">{title}</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}