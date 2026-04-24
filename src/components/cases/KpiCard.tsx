import { cn } from '@/lib/utils/cn'

interface KpiCardProps {
  label: string
  value: string | number
  delta?: string
  accent?: boolean
  className?: string
}

export function KpiCard({ label, value, delta, accent = false, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border p-6',
        accent
          ? 'border-navy-deep bg-navy-deep text-cream'
          : 'border-navy-deep/10 bg-paper text-ink',
        className
      )}
    >
      <p className={cn('text-xs font-medium uppercase tracking-widest', accent ? 'text-cream/50' : 'text-muted')}>
        {label}
      </p>
      <p className={cn('mt-2 font-bold-serif text-4xl font-bold', accent ? 'text-cream' : 'text-navy-deep')}>
        {value}
      </p>
      {delta && (
        <p className={cn('mt-1 text-sm', accent ? 'text-cream/60' : 'text-muted')}>{delta}</p>
      )}
    </div>
  )
}
