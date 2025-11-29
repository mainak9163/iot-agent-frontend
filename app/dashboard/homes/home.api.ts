import { getToken } from "@/lib/api"
import { CreateHomeResponse, DeleteHomeResponse, ListAllHomesResponse } from "./homes.types"
import api from "@/lib/axios"


export async function fetchHomes(): Promise<ListAllHomesResponse> {
  const token = await getToken()
  const res = await api.get<ListAllHomesResponse>("/devices/homes", {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export async function createHome(name: string): Promise<CreateHomeResponse> {
  const token = await getToken()
  const res = await api.post<CreateHomeResponse>(
    "/devices/homes",
    { name },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export async function deleteHome(homeId: string): Promise<DeleteHomeResponse> {
  const token = await getToken()
  return api.delete(`/devices/homes/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
