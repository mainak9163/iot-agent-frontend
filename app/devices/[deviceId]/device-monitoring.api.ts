
import { getToken } from "@/lib/api"
import type {
  DeviceDashboardResponse,
  DeviceSnapshotResponse,
  LatestOutputResponse,
  CheckExpiriesResponse,
} from "./device-monitoring.types"
import api from "@/lib/axios"

export async function fetchDeviceDashboard(deviceId: string): Promise<DeviceDashboardResponse> {
  const token = await getToken()
  const res = await api.get<DeviceDashboardResponse>(
    `/devices/${deviceId}/dashboard`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export async function fetchDeviceSnapshot(deviceId: string): Promise<DeviceSnapshotResponse> {
  const token = await getToken()
  const res = await api.get<DeviceSnapshotResponse>(
    `/devices/${deviceId}/snapshot`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export async function fetchLatestOutputs(deviceId: string): Promise<LatestOutputResponse> {
  const token = await getToken()
  const res = await api.get<LatestOutputResponse>(
    `/devices/${deviceId}/outputs/latest`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}

export async function checkItemExpiries(deviceId: string): Promise<CheckExpiriesResponse> {
  const token = await getToken()
  const res = await api.post<CheckExpiriesResponse>(
    `/devices/${deviceId}/items/check-expiries`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res.data
}
