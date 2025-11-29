import { useAuth } from "@/lib/auth-store"
import axios from "@/lib/axios"
import InventoryTable from "@/components/device/inventory-table"

export default async function InventoryPage({ params }: { params: { deviceId: string } }) {
  const token = useAuth.getState().token
  const deviceId = params.deviceId

  const res = await axios.get(`/devices/${deviceId}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Inventory</h1>
      <InventoryTable deviceId={deviceId} data={res.data.items} />
    </div>
  )
}
