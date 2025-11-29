import { fetchLatestOutputs } from "../../device-monitoring.api"


export default async function LatestOutputPage({
  params
}: {
  params: { deviceId: string }
}) {
  const out = await fetchLatestOutputs(params.deviceId)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Latest Output</h1>

      <p className="text-muted-foreground">
        Timestamp: {new Date(out.ts).toLocaleString()}
      </p>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="border p-4 rounded">
          <p className="font-medium">LED</p>
          <p>{out.led_on ? "On" : "Off"}</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium">Buzzer</p>
          <p>{out.buzzer_on ? "On" : "Off"}</p>
        </div>

        <div className="border p-4 rounded">
          <p className="font-medium">Spoilage Score</p>
          <p>{out.spoilage_score}</p>
        </div>
      </div>
    </div>
  )
}
