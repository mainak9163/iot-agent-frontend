import { getToken } from "@/lib/api"
import api from "@/lib/axios"
import { VisionDetectionRequest, VisionDetectionResponse } from "./vision.types"

export async function visionDetect(
  deviceId: string,
  payload: VisionDetectionRequest
): Promise<VisionDetectionResponse> {
  const token = await getToken()
  const res = await api.post<VisionDetectionResponse>(
    `/devices/${deviceId}/items/vision`,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res.data
}
