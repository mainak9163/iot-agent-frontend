import Link from "next/link"
import { getDashboardData } from "./dashboard.api"
import DashboardCard from "./components/dashboard-card"
import SectionHeader from "./components/section-header"
import { HomeIcon, Zap, Tag, AlertTriangle } from "lucide-react" // Import icons for visual enhancement

export default async function DashboardPage() {
  const { homes, devices, deviceItemData } = await getDashboardData()

  // Calculation logic remains the same
  const totalItems = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + data.items.length
  }, 0)

  const expiringSoon = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + (data.counts.expiring_soon ?? 0)
  }, 0)

  const expired = Object.values(deviceItemData).reduce((acc, data) => {
    return acc + (data.counts.expired ?? 0)
  }, 0)
    
  // Determine if the expiringSoon card needs a warning style
  const isAlertStatus = expiringSoon > 0 || expired > 0;

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight">Dashboard Overview</h1>

      {/* ================================
          TOP CARDS 
      ================================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Homes Card - Primary Teal Accent */}
        <Link href="/homes" className="group">
          <DashboardCard
            title="Total Homes"
            value={homes.length}
            footer="Manage your homes"
            icon={<HomeIcon className="w-5 h-5" />}
            accent="primary-accent" // Custom prop for accenting
          />
        </Link>

        {/* Devices Card - Teal Accent */}
        <Link href="/devices" className="group">
          <DashboardCard
            title="Connected Devices"
            value={devices.length}
            footer="Manage devices"
            icon={<Zap className="w-5 h-5" />}
            accent="primary-accent"
          />
        </Link>

        {/* Total Items Card - Subtle Contrast */}
        <div className="group">
          <DashboardCard
            title="Items Tracked"
            value={totalItems}
            footer="Total inventory count"
            icon={<Tag className="w-5 h-5" />}
            accent="secondary" // Subtle accent for general stat
          />
        </div>

        {/* Expiry Alerts Card - Destructive/Urgent Accent */}
        <div className="group">
          <DashboardCard
            title="Expiring Soon"
            value={expiringSoon}
            footer={expired > 0 ? `${expired} already expired` : "No items expired"}
            icon={<AlertTriangle className="w-5 h-5" />}
            accent={isAlertStatus ? "destructive" : "primary-accent"} // Conditional color for urgency
          />
        </div>
      </div>

      {/* ================================
          HOMES PREVIEW
      ================================= */}
      <SectionHeader title="Your Homes" linkHref="/homes" linkText="View All" />

      {homes.length === 0 ? (
        <p className="text-muted-foreground pt-2">
          You don&apos;t have any homes yet. <Link href="/homes" className="text-primary-accent hover:underline">Add one now.</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Limit to a few homes for dashboard preview */}
          {homes.slice(0, 3).map((home) => (
            <Link
              href={`/homes/${home.id}`}
              key={home.id}
              className="border border-border p-4 rounded-lg bg-card hover:bg-primary-accent/10 transition-colors duration-300"
            >
              <p className="font-semibold text-lg">{home.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Created {new Date(home.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* ================================
          DEVICES PREVIEW
      ================================= */}
      <SectionHeader title="Your Devices" linkHref="/devices" linkText="View All" />

      <div className="space-y-3">
        {devices.length === 0 ? (
          <p className="text-muted-foreground pt-2">You have no devices yet. <Link href="/devices" className="text-primary-accent hover:underline">Add one now.</Link></p>
        ) : (
          devices.slice(0, 4).map((d) => { // Limit to 4 devices for preview
            const inv = deviceItemData[d?.id]

            // Apply conditional styling for urgent device items
            const isDeviceAlert = (inv.counts.expiring_soon ?? 0) > 0 || (inv.counts.expired ?? 0) > 0;

            return (
              <Link
                key={d?.id}
                href={`/devices/${d?.id}`}
                className={`border p-4 rounded-lg bg-card block transition-all duration-300 
                  ${isDeviceAlert 
                    ? 'border-destructive/50 hover:bg-destructive/10' 
                    : 'border-border hover:bg-primary-accent/10'
                  }`}
              >
                <p className="font-semibold text-base">{d?.name}</p>

                <p className="text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">{inv.items.length} items</span>, 
                  <span className={isDeviceAlert ? "text-destructive font-bold" : ""}>
                    {" "}{inv.counts.expiring_soon ?? 0} expiring
                  </span>,
                  <span className={(inv.counts.expired ?? 0) > 0 ? "text-destructive font-bold" : ""}>
                    {" "}{inv.counts.expired ?? 0} expired
                  </span>
                </p>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}