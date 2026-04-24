import { Badge } from '@/components/ui/badge'
import type { Stage } from '@/lib/data/types'

const stageConfig: Record<Stage, { label: string; variant: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger' | 'cream' }> = {
  model_stumpf: { label: 'Modell & Stumpf', variant: 'secondary' },
  keramik: { label: 'Keramik', variant: 'outline' },
  finish: { label: 'Finish', variant: 'warning' },
  versand: { label: 'Versand', variant: 'default' },
  abgeschlossen: { label: 'Abgeschlossen', variant: 'success' },
}

export function StageBadge({ stage }: { stage: Stage }) {
  const config = stageConfig[stage]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
