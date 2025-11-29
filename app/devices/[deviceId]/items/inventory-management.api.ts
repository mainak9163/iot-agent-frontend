
import { getToken } from "@/lib/api"
import type {
  AddItemResponse,
  GetAllItemsResponse,
  UpdateItemResponse,
  DeleteItemResponse,
  AddItemRequest,
  Item,
  UpdateItemRequest,
} from "./inventory-management.types"
import api from "@/lib/axios"

export async function fetchAllItems(deviceId: string): Promise<GetAllItemsResponse> {
  const token = await getToken()
  const res = await api.get<GetAllItemsResponse>(`/devices/${deviceId}/items`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export async function addItem(deviceId: string, payload: AddItemRequest): Promise<AddItemResponse> {
  const token = await getToken()
  const res = await api.post<AddItemResponse>(
    `/devices/${deviceId}/items`,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export async function fetchItem(deviceId: string, itemId: string): Promise<Item> {
  const token = await getToken()
  const res = await api.get<{ item: Item }>(
    `/devices/${deviceId}/items/${itemId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data.item
}

export async function updateItem(
  deviceId: string,
  itemId: string,
  payload: UpdateItemRequest
): Promise<UpdateItemResponse> {
  const token = await getToken()
  const res = await api.patch<UpdateItemResponse>(
    `/devices/${deviceId}/items/${itemId}`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export async function deleteItem(
  deviceId: string,
  itemId: string
): Promise<DeleteItemResponse> {
  const token = await getToken()
  const res = await api.delete<DeleteItemResponse>(
    `/devices/${deviceId}/items/${itemId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}
