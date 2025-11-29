
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { checkItemExpiries } from "../../device-monitoring.api"

export default async function CheckExpiriesPage({
  params
}: {
  params: { deviceId: string }
}) {
  const { deviceId } = params
  const data = await checkItemExpiries(deviceId)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Expiry Check</h1>

      {data.buzzerTriggered && (
        <p className="text-red-600 font-medium">⚠️ Buzzer Triggered</p>
      )}

      <h2 className="text-lg font-medium">Expired Items</h2>

      {data.expired.length === 0 ? (
        <p className="text-muted-foreground">No expired items 🎉</p>
      ) : (
        <div className="space-y-2">
          {data.expired.map((item) => (
            <div key={item.id} className="border p-3 rounded">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                EXP: {new Date(item.expd).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <Button asChild>
        <Link href={`/devices/${deviceId}/items`}>
          Back to Inventory
        </Link>
      </Button>
    </div>
  )
}
