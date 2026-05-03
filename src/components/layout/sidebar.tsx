"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FileSearch, QrCode, Plug, Users, Settings, LogOut } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { ROUTES } from "@/lib/constants"
import { cn } from "@/lib/utils"

const navItems = [
  { href: ROUTES.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: ROUTES.CASES, label: "Cases", icon: FileSearch },
  { href: ROUTES.SCAN, label: "Scan QR", icon: QrCode },
  { href: ROUTES.SETTINGS_CONNECTIONS, label: "Connections", icon: Plug },
  { href: ROUTES.SETTINGS_TEAM, label: "Team", icon: Users },
  { href: ROUTES.SETTINGS_PROFILE, label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <aside className="flex h-full w-60 flex-shrink-0 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <span className="text-xl font-bold text-primary">Cromiw</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname.startsWith(href)
                ? "bg-primary text-white"
                : "text-muted hover:bg-gray-100 hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t p-4">
        <p className="mb-2 truncate text-xs text-muted">{session?.user?.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: ROUTES.LOGIN })}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
