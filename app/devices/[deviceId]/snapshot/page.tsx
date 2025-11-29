import { fetchDeviceSnapshot } from "../device-monitoring.api"


export default async function SnapshotPage({ params }: { params: { deviceId: string } }) {
  const { deviceId } = params
  const snap = await fetchDeviceSnapshot(deviceId)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-semibold">{snap.name} — Snapshot</h1>

      <p className="text-muted-foreground">Last seen: {new Date(snap.last_seen_at).toLocaleString()}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
        <div className="border p-4 rounded">
          <p className="font-medium">Temperature</p>
          <p>{snap.temperature_c ?? "—"} °C</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium">Humidity</p>
          <p>{snap.humidity ?? "—"}%</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium">Gas</p>
          <p>{snap.gas_ppm ?? "—"} ppm</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium">Weight</p>
          <p>{snap.weight_g ?? "—"} g</p>
        </div>
      </div>

      {/* Vision info */}
      {snap.image_url && (
        <div className="space-y-2 pt-6">
          <img src={snap.image_url} className="rounded border w-full max-w-md" />
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {snap.cam_summary ?? "No camera summary"}
          </p>
        </div>
      )}

      {/* Outputs */}
      <div className="pt-6 grid grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <p className="font-medium">LED</p>
          <p>{snap.led_on ? "On" : "Off"}</p>
        </div>
        <div className="border p-4 rounded">
          <p className="font-medium">Buzzer</p>
          <p>{snap.buzzer_on ? "On" : "Off"}</p>
        </div>
      </div>
    </div>
  )
}
