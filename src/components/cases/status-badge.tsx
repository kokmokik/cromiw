import { Badge } from "@/components/ui/badge"
import { STATUS_LABELS, STATUS_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { CaseStatus } from "@/types"

export function StatusBadge({ status }: { status: CaseStatus }) {
  return (
    <Badge className={cn("font-medium", STATUS_COLORS[status])}>
      {STATUS_LABELS[status]}
    </Badge>
  )
}
