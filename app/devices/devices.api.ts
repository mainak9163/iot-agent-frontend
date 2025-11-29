import { getToken } from "@/lib/api"
import { ClaimDeviceResponse, DeviceBootstrapInfo, ListAllDevicesResponse } from "./devices.types"
import api from "@/lib/axios"


export async function fetchDevices(): Promise<ListAllDevicesResponse> {
  const token = await getToken()
  const res = await api.get<ListAllDevicesResponse>("/devices", {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export async function fetchDevice(deviceId: string): Promise<DeviceBootstrapInfo> {
  const token = await getToken()
  const res = await api.get<DeviceBootstrapInfo>(`/devices/${deviceId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export async function claimDevice(
  deviceId: string,
  devicePassword: string,
  homeId: string
): Promise<ClaimDeviceResponse> {
  const token = await getToken()
  const res = await api.post<ClaimDeviceResponse>(
    `/devices/${deviceId}/claim`,
    { devicePassword, homeId },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}

export async function deleteDevice(deviceId: string) {
  const token = await getToken()
  return api.delete(`/devices/${deviceId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}
