export const dynamic = "force-dynamic"

import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Gauge,
  Navigation,
  PanelTop,
  Eye,
  ListChecks,
  Boxes,
  PlusCircle,
  ScanBarcode,
  Camera,
  Settings,
  MapPin,
  Shield,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import { ReactNode } from "react"

export default async function DeviceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ deviceId: string }>
}) {
  const { deviceId } = await params

  const nav = [
    {
      label: "Overview",
      href: `/devices/${deviceId}`,
      icon: PanelTop,
    },
    {
      label: "Live Dashboard",
      href: `/devices/${deviceId}/dashboard`,
      icon: Gauge,
    },
    {
      label: "Snapshot",
      href: `/devices/${deviceId}/snapshot`,
      icon: Navigation,
    },
    {
      label: "Latest Outputs",
      href: `/devices/${deviceId}/outputs/latest`,
      icon: ListChecks,
    },
  ]

  const inventory = [
    {
      label: "Inventory",
      href: `/devices/${deviceId}/items`,
      icon: Boxes,
    },
    {
      label: "Add Item",
      href: `/devices/${deviceId}/items/add`,
      icon: PlusCircle,
    },
    {
      label: "Barcode Scan",
      href: `/devices/${deviceId}/items/barcode-scan`,
      icon: ScanBarcode,
    },
    {
      label: "Vision Detection",
      href: `/devices/${deviceId}/items/vision`,
      icon: Camera,
    },
    {
      label: "Check Expiries",
      href: `/devices/${deviceId}/items/check-expiries`,
      icon: Eye,
    },
  ]

  const settings = [
    {
      label: "Edit Name",
      href: `/devices/${deviceId}/edit`,
      icon: Settings,
    },
    {
      label: "Location",
      href: `/devices/${deviceId}/location`,
      icon: MapPin,
    },
    {
      label: "Security",
      href: `/devices/${deviceId}/security`,
      icon: Shield,
    },
    {
      label: "Delete Device",
      href: `/devices/${deviceId}/delete`,
      icon: Trash2,
      destructive: true,
    },
  ]

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r bg-background p-6 space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Device Navigation
          </h2>
          <nav className="space-y-1">
            {nav.map((item) => (
              <SidebarLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </SidebarLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Inventory
          </h2>
          <nav className="space-y-1">
            {inventory.map((item) => (
              <SidebarLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </SidebarLink>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">
            Settings
          </h2>
          <nav className="space-y-1">
            {settings.map((item) => (
              <SidebarLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                destructive={item.destructive}
              >
                {item.label}
              </SidebarLink>
            ))}
          </nav>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
function SidebarLink({
  href,
  icon: Icon,
  children,
  destructive,
}: {
  href: string
  icon: LucideIcon
  children: ReactNode
  destructive?: boolean
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition",
        destructive
          ? "text-red-600 hover:bg-red-600/10"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  )
}
