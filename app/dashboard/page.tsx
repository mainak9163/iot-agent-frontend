import Link from "next/link"
import { getDashboardData } from "./dashboard.api"
import DashboardCard from "./components/dashboard-card"
import SectionHeader from "./components/section-header"


export default async function DashboardPage() {
  const { homes, devices, deviceItemData } = await getDashboardData()

  const totalItems = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + data.items.length
  }, 0)

  const expiringSoon = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + (data.counts.expiring_soon ?? 0)
  }, 0)

  const expired = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + (data.counts.expired ?? 0)
  }, 0)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>

      {/* ================================
           TOP CARDS
      ================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Homes */}
        <Link href="/homes">
          <DashboardCard
            title="Homes"
            value={homes.length}
            footer="View homes"
          />
        </Link>

        {/* Devices */}
        <Link href="/devices">
          <DashboardCard
            title="Devices"
            value={devices.length}
            footer="Manage devices"
          />
        </Link>

        {/* Total Items */}
        <Link href="/devices">
          <DashboardCard
            title="Items Tracked"
            value={totalItems}
            footer="Across all devices"
          />
        </Link>

        {/* Expiry Alerts */}
        <Link href="/devices">
          <DashboardCard
            title="Expiring Soon"
            value={expiringSoon}
            footer={`${expired} already expired`}
          />
        </Link>
      </div>

      {/* ================================
           HOMES PREVIEW
      ================================= */}
      <SectionHeader title="Your Homes" />

      {homes.length === 0 ? (
        <p className="text-muted-foreground">You don&apos;t have any homes yet.</p>
      ) : (
        <div className="grid gap-4">
          {homes.map((home) => (
            <Link
              href={`/homes/${home.id}`}
              key={home.id}
              className="border p-4 rounded hover:bg-accent transition"
            >
              <p className="font-medium">{home.name}</p>
              <p className="text-xs text-muted-foreground">
                Created {new Date(home.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* ================================
           DEVICES PREVIEW
      ================================= */}
      <SectionHeader title="Your Devices" />

      <div className="space-y-3">
        {devices.length === 0 ? (
          <p className="text-muted-foreground">You have no devices yet.</p>
        ) : (
          devices.map((d) => {
            const inv = deviceItemData[d?.id]

            return (
              <Link
                key={d?.id}
                href={`/devices/${d?.id}`}
                className="border p-4 rounded hover:bg-accent transition block"
              >
                <p className="font-medium">{d?.name}</p>

                <p className="text-sm text-muted-foreground">
                  {inv.items.length} items, {inv.counts.expiring_soon ?? 0} expiring,
                  {inv.counts.expired ?? 0} expired
                </p>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}
