import type { CaseStatus, Urgency, Provider } from "@/types"

export const STATUS_LABELS: Record<CaseStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In Progress",
  QC: "Quality Check",
  READY_TO_SHIP: "Ready to Ship",
  SHIPPED: "Shipped",
}

export const STATUS_COLORS: Record<CaseStatus, string> = {
  NEW: "bg-blue-100 text-blue-800 border-transparent hover:bg-blue-100",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800 border-transparent hover:bg-yellow-100",
  QC: "bg-purple-100 text-purple-800 border-transparent hover:bg-purple-100",
  READY_TO_SHIP: "bg-green-100 text-green-800 border-transparent hover:bg-green-100",
  SHIPPED: "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-100",
}

export const URGENCY_COLORS: Record<Urgency, string> = {
  HIGH: "bg-red-500",
  MEDIUM: "bg-yellow-500",
  LOW: "bg-green-500",
}

export const PROVIDERS: { id: Provider; label: string; color: string }[] = [
  { id: "MEDIT", label: "Medit", color: "#0078D4" },
  { id: "3SHAPE", label: "3Shape", color: "#E31837" },
  { id: "ITERO", label: "iTero", color: "#00A651" },
  { id: "PLANMECA", label: "Planmeca", color: "#003087" },
]

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ONBOARDING: "/onboarding",
  DASHBOARD: "/dashboard",
  CASES: "/cases",
  CASE: (id: string) => `/cases/${id}`,
  SCAN: "/scan",
  SETTINGS_CONNECTIONS: "/settings/connections",
  SETTINGS_TEAM: "/settings/team",
  SETTINGS_PROFILE: "/settings/profile",
} as const
