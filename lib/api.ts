// lib/api.ts
import api from "./axios"
import Cookies from "js-cookie"
import { cookies } from "next/headers"
import { useAuth } from "./auth-store"

/* ======================================================================
   TOKEN HANDLING (Client + Server Safe)
======================================================================== */

export async function getToken() {
  try {
    if (typeof window !== "undefined") {
      return Cookies.get("token") || null
    }
    const cookieStore = await cookies()
    return cookieStore.get("token")?.value || null
  } catch {
    return null
  }
}

/* ======================================================================
   AUTH
======================================================================== */

export async function login(email: string, password: string) {
  const res = await api.post("/auth/login", { email, password })

  if (typeof window !== "undefined") {
    Cookies.set("token", res.data.token, { expires: 7 })
    useAuth.getState().setToken(res.data.token)
  }

  return res.data
}

export async function register(email: string, password: string) {
  return api.post("/auth/register", { email, password })
}

export function logout() {
  Cookies.remove("token")
  useAuth.getState().setToken(null)
}

/* ======================================================================
   USER DEVICES
======================================================================== */

export async function fetchDevices() {
  const token = await getToken()
  return api.get("/devices", {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function fetchDeviceSnapshot(deviceId: string) {
  const token = await getToken()
  return api.get(`/devices/${deviceId}/snapshot`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function fetchDeviceOutputs(deviceId: string) {
  const token = await getToken()
  return api.get(`/devices/${deviceId}/outputs/latest`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateDeviceName(deviceId: string, name: string) {
  const token = await getToken()
  return api.patch(`/devices/${deviceId}`, { name }, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export async function updateDevicePassword(deviceId: string, newPassword: string) {
  const token = await getToken()
  return api.patch(`/devices/${deviceId}`, { newDevicePassword: newPassword }, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export async function updateDeviceLocation(deviceId: string, location: any) {
  const token = await getToken()
  return api.post(`/devices/${deviceId}/location`, location, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function deleteDevice(deviceId: string) {
  const token = await getToken()
  return api.delete(`/devices/${deviceId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function claimDevice(deviceId: string, devicePassword: string, homeId: string) {
  const token = await getToken()
  return api.post(`/devices/${deviceId}/claim`, {
    devicePassword,
    homeId,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   DEVICE: SENSOR WRITE (Device Token)
======================================================================== */

export async function pushDHT11(deviceId: string, data: any, deviceToken: string) {
  return api.post(`/devices/${deviceId}/dht11`, data, {
    headers: { Authorization: `Bearer ${deviceToken}` },
  })
}

export async function pushMQ2(deviceId: string, data: any, deviceToken: string) {
  return api.post(`/devices/${deviceId}/mq2`, data, {
    headers: { Authorization: `Bearer ${deviceToken}` },
  })
}

export async function pushHX711(deviceId: string, data: any, deviceToken: string) {
  return api.post(`/devices/${deviceId}/hx711`, data, {
    headers: { Authorization: `Bearer ${deviceToken}` },
  })
}

/* ======================================================================
   WEBCAM & AI
======================================================================== */

export async function webcamAnalyze(deviceId: string, imageUrl: string, deviceToken: string) {
  return api.post(`/devices/${deviceId}/webcam/analyze`, {
    image_url: imageUrl,
  }, {
    headers: { Authorization: `Bearer ${deviceToken}` },
  })
}

export async function evaluateSpoilage(deviceId: string) {
  const token = await getToken()
  return api.post(`/devices/${deviceId}/evaluate`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   INVENTORY
======================================================================== */

export async function fetchItems(deviceId: string) {
  const token = await getToken()
  return api.get(`/devices/${deviceId}/items`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function addItem(deviceId: string, item: any) {
  const token = await getToken()
  return api.post(`/devices/${deviceId}/items`, item, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function updateItem(deviceId: string, itemId: string, updates: any) {
  const token = await getToken()
  return api.patch(`/devices/${deviceId}/items/${itemId}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function deleteItem(deviceId: string, itemId: string) {
  const token = await getToken()
  return api.delete(`/devices/${deviceId}/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   BARCODE
======================================================================== */

export async function scanBarcode(deviceId: string, data: any, tokenOverride?: string) {
  const token = tokenOverride || await getToken()

  return api.post(`/devices/${deviceId}/items/barcode-scan`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   VISION
======================================================================== */

export async function visionRecord(deviceId: string, data: any, tokenOverride?: string) {
  const token = tokenOverride || await getToken()

  return api.post(`/devices/${deviceId}/items/vision`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   EXPIRY CHECK
======================================================================== */

export async function checkExpiries(deviceId: string) {
  const token = await getToken()
  return api.post(`/devices/${deviceId}/items/check-expiries`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

/* ======================================================================
   HOMES
======================================================================== */

export async function fetchHomes() {
  const token = await getToken()
  return api.get(`/devices/homes`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function createHome(name: string) {
  const token = await getToken()
  return api.post(`/devices/homes`, { name }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function deleteHome(homeId: string) {
  const token = await getToken()
  return api.delete(`/devices/homes/${homeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/* ======================================================================
   AGENT
======================================================================== */

export async function agentQuery(deviceId: string, question: string, actions: string[]) {
  const token = await getToken()

  return api.post(`/devices/${deviceId}/agent/query`, {
    question,
    actions,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export async function agentSuggestions(deviceId: string) {
  const token = await getToken()

  return api.get(`/devices/${deviceId}/agent/suggestions`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
