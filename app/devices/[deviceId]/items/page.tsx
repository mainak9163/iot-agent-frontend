
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GetAllItemsResponse } from "./inventory-management.types"
import { fetchAllItems } from "./inventory-management.api"
import ItemCard from "./components/item-card"


export default async function ItemsPage({ params }: { params: Promise<{ deviceId: string }> }) {
  const { deviceId } =await params
  const data: GetAllItemsResponse = await fetchAllItems(deviceId)

  const { items, counts } = data

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Inventory</h1>

        <Link href={`/devices/${deviceId}/items/add`}>
          <Button>+ Add Item</Button>
        </Link>
      </div>

      {/* Status Overview */}
      <div className="flex gap-4 flex-wrap text-sm text-muted-foreground">
        <p>OK: {counts.ok ?? 0}</p>
        <p>Expiring Soon: {counts.expiring_soon ?? 0}</p>
        <p>Expired: {counts.expired ?? 0}</p>
        <p>Consumed: {counts.consumed ?? 0}</p>
        <p>Spoilt: {counts.spoilt ?? 0}</p>
      </div>

      <div className="space-y-4 pt-4">
        {items.length === 0 ? (
          <p className="text-muted-foreground">
            Your shelf is empty — a quiet little void waiting for ingredients. 🌫️
          </p>
        ) : (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}
