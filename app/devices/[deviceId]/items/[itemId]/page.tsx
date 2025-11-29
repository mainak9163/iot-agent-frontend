import Link from "next/link";
import { fetchItem } from "../inventory-management.api";
import { Item } from "../inventory-management.types";
import { Button } from "@/components/ui/button";


export default async function ItemDetailPage({
  params,
}: {
  params: { deviceId: string; itemId: string }
}) {
  const { deviceId, itemId } = params
  const item: Item = await fetchItem(deviceId, itemId)

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">{item.name}</h1>

      <p>Brand: {item.brand ?? "–"}</p>
      <p>Quantity: {item.quantity} {item.unit}</p>
      <p>Status: {item.status}</p>
      <p>MFD: {item.mfd ?? "–"}</p>
      <p>EXPD: {item.expd ?? "–"}</p>
      <p>Source: {item.source}</p>
      <p>Notes: {item.notes ?? "–"}</p>

      <div className="space-y-2 pt-4">
        <Link href={`/devices/${deviceId}/items/${itemId}/edit`}>
          <Button className="w-full">Edit</Button>
        </Link>

        <Link href={`/devices/${deviceId}/items/${itemId}/delete`}>
          <Button variant="destructive" className="w-full">
            Delete
          </Button>
        </Link>
      </div>
    </div>
  )
}
