import { Badge } from '@/components/ui/badge'
import type { CaseStatus } from '@/lib/data/types'

const statusConfig: Record<CaseStatus, { label: string; variant: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'cream' }> = {
  AKTIV: { label: 'Aktiv', variant: 'default' },
  ERLEDIGT: { label: 'Erledigt', variant: 'success' },
  WARTEND: { label: 'Wartend', variant: 'secondary' },
  ÜBERFÄLLIG: { label: 'Überfällig', variant: 'danger' },
}

export function StatusBadge({ status }: { status: CaseStatus }) {
  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
