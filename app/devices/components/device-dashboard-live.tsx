/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { DeviceDashboardResponse } from "../[deviceId]/device-monitoring.types"
import { SensorCard } from "./sensor-card" // Assuming SensorCard is also modernized
import { fetchDeviceDashboard } from "../[deviceId]/device-monitoring.api"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { MapPin, Clock, Lightbulb, Volume2, Maximize, AlertTriangle, Box } from "lucide-react"
import GraphCard from "./graph-card"

// Assuming GraphCard is defined at the bottom or imported
// Assuming SensorCard is defined/imported

export default function DeviceDashboardLive({
  deviceId,
  initial
}: {
  deviceId: string
  initial: DeviceDashboardResponse
}) {
  const [snapshot, setSnapshot] = useState(initial.snapshot)
  const [summary, setSummary] = useState(initial.summary)
  const [loadingError, setLoadingError] = useState<boolean>(false);

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
        setLoadingError(false); // Clear error on success

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
        setLoadingError(true);
      }
    }, 10_000)

    return () => clearInterval(interval)
  }, [deviceId])

  const { device, latest } = snapshot

  return (
    // Applied max-width and padding for desktop constraint and spacing
    <div className="p-6 lg:p-10 space-y-10 max-w-6xl mx-auto"> 
      
      {/* --- HEADER --- */}
      <div className="border-b pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {device.name} <span className="text-muted-foreground text-sm font-normal">— Live Monitoring</span>
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
            <span className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {device.location.label}
            </span>
            <span className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Last Seen: {new Date(device.last_seen_at).toLocaleTimeString()}
            </span>
          </div>
        </div>
        {loadingError && (
            <div className="text-red-500 flex items-center space-x-1 p-2 bg-red-50 border border-red-300 rounded">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Data feed error!</span>
            </div>
        )}
      </div>

      {/* --- LIVE VALUES --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Current Readings</h2>
        {/* Use a 4-column layout for sensor cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <SensorCard label="Temperature" value={latest.dht11?.temperature_c ?? null} unit="°C" accent="text-red-500" />
          <SensorCard label="Humidity" value={latest.dht11?.humidity ?? null} unit="%" accent="text-blue-500" />
          <SensorCard label="Gas Level" value={latest.mq2?.gas_ppm ?? null} unit="ppm" accent="text-orange-500" />
          <SensorCard label="Weight" value={latest.hx711?.weight_g ?? null} unit="g" accent="text-green-500" />
        </div>
      </section>

      {/* --- GRAPHS, WEBCAM & SUMMARY (Main Grid) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Column 1 & 2: Real-Time Graphs (Takes up 2/3 width) */}
        <section className="space-y-8 lg:col-span-2">
            <h2 className="text-xl font-semibold">Real-Time History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GraphCard title="Temperature (°C)" data={history.temp} color="#ef4444" /> {/* Red */}
                <GraphCard title="Gas PPM" data={history.gas} color="#f97316" /> {/* Orange */}
            </div>
            {/* Third graph is placed below the pair for better use of space */}
            <div className="grid grid-cols-1">
                <GraphCard title="Weight (g)" data={history.weight} color="#22c55e" /> {/* Green */}
            </div>
        </section>

        {/* Column 3: Webcam, Outputs, AI Summary (Takes up 1/3 width) */}
        <aside className="space-y-8 lg:col-span-1">
            
            {/* Webcam / Snapshot Card */}
            <Card className="shadow-lg">
                <CardHeader className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                        <Maximize className="h-4 w-4 mr-2 text-primary-accent" /> Live View
                    </h3>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                    {latest.webcam ? (
                        <>
                            <img src={latest.webcam.image_url} alt="Webcam view" className="rounded border w-full max-h-72 object-cover" />
                            <p className="text-muted-foreground text-xs whitespace-pre-wrap leading-relaxed">
                                {latest.webcam.summary}
                            </p>
                        </>
                    ) : (
                        <p className="text-muted-foreground text-sm">No live webcam feed available.</p>
                    )}
                </CardContent>
            </Card>

            {/* Outputs Card */}
            <Card>
                <CardHeader className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-primary-accent" /> Device Outputs
                    </h3>
                </CardHeader>
                <CardContent className="p-4 grid grid-cols-2 gap-4">
                    <SensorCard label="LED" value={latest.outputs?.led_on ? "On" : "Off"} icon={Lightbulb} />
                    <SensorCard label="Buzzer" value={latest.outputs?.buzzer_on ? "On" : "Off"} icon={Volume2} />
                </CardContent>
            </Card>

            {/* AI SUMMARY CARD */}
            <Card className="shadow-lg">
                <CardHeader className="p-4 border-b">
                    <h3 className="text-lg font-medium flex items-center">
                        <Box className="h-4 w-4 mr-2 text-primary-accent" /> AI System Summary
                    </h3>
                </CardHeader>
                <CardContent className="p-4">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{summary}</p>
                </CardContent>
            </Card>
        </aside>
      </div>
    </div>
  )
}