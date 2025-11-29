import { fetchAllItems } from "../devices/[deviceId]/items/inventory-management.api"
import { GetAllItemsResponse } from "../devices/[deviceId]/items/inventory-management.types"
import { fetchDevices } from "../devices/devices.api"
import { fetchHomes } from "../homes/home.api"



export async function getDashboardData() {
  const homes = await fetchHomes()
  const devices = await fetchDevices()
  // Gather item counts per device (optional but useful)
  const deviceItemData: Record<string, GetAllItemsResponse> = {}
  for (const d of devices) {
    const deviceId = d?.id
    const inventory:GetAllItemsResponse = await fetchAllItems(deviceId)
    deviceItemData[deviceId] = inventory
  }

  return {
    homes,
    devices,
    deviceItemData
  }
}
