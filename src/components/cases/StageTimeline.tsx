import { CheckCircle2, Circle } from 'lucide-react'
import type { Stage, StageHistoryEntry } from '@/lib/data/types'
import { formatDateTime } from '@/lib/utils/formatDate'
import { cn } from '@/lib/utils/cn'

const ALL_STAGES: Stage[] = ['model_stumpf', 'keramik', 'finish', 'versand', 'abgeschlossen']
const STAGE_LABELS: Record<Stage, string> = {
  model_stumpf: 'Modell & Stumpf',
  keramik: 'Keramik',
  finish: 'Finish',
  versand: 'Versand',
  abgeschlossen: 'Abgeschlossen',
}

interface StageTimelineProps {
  currentStage: Stage
  history: StageHistoryEntry[]
}

export function StageTimeline({ currentStage, history }: StageTimelineProps) {
  const completedStages = new Set(history.map((h) => h.stage))
  const currentIdx = ALL_STAGES.indexOf(currentStage)

  return (
    <div className="space-y-0">
      {ALL_STAGES.map((stage, idx) => {
        const done = completedStages.has(stage)
        const current = stage === currentStage
        const entry = history.find((h) => h.stage === stage)
        const future = idx > currentIdx && !done

        return (
          <div key={stage} className="flex gap-4">
            {/* Icon column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border-2',
                  done
                    ? 'border-emerald-500 bg-emerald-500 text-paper'
                    : current
                    ? 'border-navy-deep bg-navy-deep text-cream'
                    : 'border-navy-deep/20 bg-paper text-muted'
                )}
              >
                {done ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
              </div>
              {idx < ALL_STAGES.length - 1 && (
                <div
                  className={cn('mt-1 w-0.5 flex-1 min-h-6', done ? 'bg-emerald-500' : 'bg-navy-deep/10')}
                />
              )}
            </div>

            {/* Content */}
            <div className={cn('pb-6 pt-0.5', idx === ALL_STAGES.length - 1 && 'pb-0')}>
              <p
                className={cn(
                  'text-sm font-medium',
                  done
                    ? 'text-ink'
                    : current
                    ? 'text-navy-deep'
                    : future
                    ? 'text-muted'
                    : 'text-muted'
                )}
              >
                {STAGE_LABELS[stage]}
                {current && !done && (
                  <span className="ml-2 text-xs text-crimson font-normal">In Bearbeitung</span>
                )}
              </p>
              {entry && (
                <div className="mt-0.5 text-xs text-muted space-y-0">
                  <p>{entry.technician}</p>
                  <p>{formatDateTime(entry.completedAt)}</p>
                  {entry.notes && <p className="italic">{entry.notes}</p>}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
