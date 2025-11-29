import { getToken } from "@/lib/api"
import { BarcodeScanRequest, BarcodeScanResponse } from "./barcode-scan.types"
import api from "@/lib/axios"


export async function scanBarcode(
  deviceId: string,
  payload: BarcodeScanRequest
): Promise<BarcodeScanResponse> {
  const token = await getToken()
  const res = await api.post<BarcodeScanResponse>(
    `/devices/${deviceId}/items/barcode-scan`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
