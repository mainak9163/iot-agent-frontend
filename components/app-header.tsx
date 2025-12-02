"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/api"

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/homes", label: "Homes" },
  { href: "/devices", label: "Devices" },
]

export function AppHeader() {
  const pathname = usePathname()
  const router = useRouter()

  // Hide header on auth routes
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register")

  if (isAuthRoute) return null

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: Logo / Brand */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight">
            IoT Kitchen Shelf
          </span>
        </Link>

        {/* Right: Nav + Logout */}
        <div className="flex items-center gap-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "rounded-full px-4",
                    isActive && "shadow-sm"
                  )}
                >
                  {link.label}
                </Button>
              </Link>
            )
          })}

          <Button
            variant="outline"
            size="sm"
            className="ml-2 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
