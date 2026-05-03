import { URGENCY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import type { Urgency } from "@/types"

export function UrgencyDot({ urgency }: { urgency: Urgency }) {
  return (
    <span
      className={cn("inline-block flex-shrink-0 rounded-full", URGENCY_COLORS[urgency])}
      style={{ width: 10, height: 10 }}
      title={urgency}
    />
  )
}
