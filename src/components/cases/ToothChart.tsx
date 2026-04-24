import { cn } from '@/lib/utils/cn'

const UPPER_RIGHT = [18, 17, 16, 15, 14, 13, 12, 11]
const UPPER_LEFT = [21, 22, 23, 24, 25, 26, 27, 28]
const LOWER_LEFT = [31, 32, 33, 34, 35, 36, 37, 38]
const LOWER_RIGHT = [48, 47, 46, 45, 44, 43, 42, 41]

interface ToothCellProps {
  number: number
  active: boolean
}

function ToothCell({ number, active }: ToothCellProps) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={cn(
          'flex h-7 w-7 items-center justify-center rounded-sm border text-xs font-medium transition-colors',
          active
            ? 'border-crimson bg-crimson text-paper'
            : 'border-navy-deep/15 bg-cream text-ink/50 hover:border-navy-deep/30'
        )}
      >
        {number}
      </div>
    </div>
  )
}

interface ToothChartProps {
  selectedTeeth: number[]
  className?: string
}

export function ToothChart({ selectedTeeth, className }: ToothChartProps) {
  const selected = new Set(selectedTeeth)

  return (
    <div className={cn('rounded-lg border border-navy-deep/10 bg-paper p-4', className)}>
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">Zahnschema (FDI)</p>

      {/* Upper jaw */}
      <div className="mb-1 flex justify-center gap-1">
        {UPPER_RIGHT.map((n) => (
          <ToothCell key={n} number={n} active={selected.has(n)} />
        ))}
        <div className="w-px bg-navy-deep/10 mx-1" />
        {UPPER_LEFT.map((n) => (
          <ToothCell key={n} number={n} active={selected.has(n)} />
        ))}
      </div>

      <div className="my-2 h-px bg-navy-deep/10" />

      {/* Lower jaw */}
      <div className="flex justify-center gap-1">
        {LOWER_RIGHT.map((n) => (
          <ToothCell key={n} number={n} active={selected.has(n)} />
        ))}
        <div className="w-px bg-navy-deep/10 mx-1" />
        {LOWER_LEFT.map((n) => (
          <ToothCell key={n} number={n} active={selected.has(n)} />
        ))}
      </div>

      <div className="mt-3 flex items-center gap-3 text-xs text-muted">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-sm bg-crimson" />
          <span>Betroffene Zähne</span>
        </div>
      </div>
    </div>
  )
}
