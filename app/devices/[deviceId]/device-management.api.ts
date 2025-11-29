
import { getToken } from "@/lib/api"
import type {
  UpdateDeviceNameResponse,
  UpdateDeviceLocationResponse,
  UpdateDeviceNameAndPasswordResponse,
  DeleteDeviceResponse,
} from "./device-management.types"
import api from "@/lib/axios"

export async function updateDeviceName(deviceId: string, name: string) {
  const token = await getToken()
  const res = await api.patch<UpdateDeviceNameResponse>(
    `/devices/${deviceId}`,
    { name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export async function updateDeviceLocation(
  deviceId: string,
  label: string,
  lat: number,
  lng: number
) {
  const token = await getToken()
  const res = await api.post<UpdateDeviceLocationResponse>(
    `/devices/${deviceId}/location`,
    { label, lat, lng },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export async function updateDeviceNameAndPassword(
  deviceId: string,
  name: string,
  newDevicePassword: string
) {
  const token = await getToken()
  const res = await api.patch<UpdateDeviceNameAndPasswordResponse>(
    `/devices/${deviceId}`,
    { name, newDevicePassword },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export async function deleteDevice(deviceId: string) {
  const token = await getToken()
  const res = await api.delete<DeleteDeviceResponse>(
    `/devices/${deviceId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}
