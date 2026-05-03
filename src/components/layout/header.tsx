"use client"

import { Bell } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ROUTES } from "@/lib/constants"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/cases": "Cases",
  "/scan": "Scan QR",
  "/settings/connections": "Connections",
  "/settings/team": "Team",
  "/settings/profile": "Profile",
}

function deriveTitle(pathname: string) {
  return Object.entries(PAGE_TITLES).find(([k]) => pathname.startsWith(k))?.[1] ?? "Cromiw"
}

export function Header() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const initials = session?.user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() ?? "U"

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between border-b bg-white px-6">
      <h1 className="text-lg font-semibold">{deriveTitle(pathname)}</h1>
      <div className="flex items-center gap-3">
        <button className="p-2 text-muted hover:text-foreground">
          <Bell className="h-5 w-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarFallback className="bg-primary text-white text-xs">{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => signOut({ callbackUrl: ROUTES.LOGIN })}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
