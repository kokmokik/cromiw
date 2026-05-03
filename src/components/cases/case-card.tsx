import Link from "next/link"
import { ROUTES } from "@/lib/constants"
import { formatDueDate } from "@/lib/utils"
import { StatusBadge } from "./status-badge"
import { UrgencyDot } from "./urgency-dot"
import { SourceBadge } from "./source-badge"
import type { Case } from "@/types"

export function CaseCard({ kase }: { kase: Case }) {
  return (
    <Link
      href={ROUTES.CASE(kase.id)}
      className="block rounded-lg border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <UrgencyDot urgency={kase.urgency} />
            <span className="truncate font-semibold">{kase.patientName}</span>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted">{kase.clinicName}</p>
        </div>
        <StatusBadge status={kase.status} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <SourceBadge source={kase.source} />
        <span className="text-xs text-muted">Due {formatDueDate(kase.dueDate)}</span>
      </div>
    </Link>
  )
}
