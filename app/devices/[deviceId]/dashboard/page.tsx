import DeviceDashboardLive from "../../components/device-dashboard-live"
import { fetchDeviceDashboard } from "../device-monitoring.api"


export default async function DeviceDashboardPage({ params }: { params: Promise<{ deviceId: string }> }) {
  const {deviceId}=await params
  const initial = await fetchDeviceDashboard(deviceId)

  return <DeviceDashboardLive deviceId={deviceId} initial={initial} />
}
