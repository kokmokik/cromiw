import { cn } from '@/lib/utils/cn'
import { getUrgencyLevel, urgencyClasses } from '@/lib/utils/urgency'
import { formatDueDate } from '@/lib/utils/formatDate'

export function UrgencyDot({ dueDate }: { dueDate: string }) {
  const level = getUrgencyLevel(dueDate)
  const cls = urgencyClasses[level]
  return (
    <span className={cn('inline-block h-2 w-2 rounded-full shrink-0', {
      'bg-crimson': level === 'crimson',
      'bg-amber-400': level === 'yellow',
      'bg-emerald-500': level === 'green',
    })} />
  )
}

export function UrgencyDate({ dueDate }: { dueDate: string }) {
  const level = getUrgencyLevel(dueDate)
  const cls = urgencyClasses[level]
  return (
    <span className={cn('text-xs font-medium', cls.text)}>
      {formatDueDate(dueDate)}
    </span>
  )
}

export function urgencyRowClass(dueDate: string, status: string): string {
  if (status === 'ERLEDIGT') return ''
  const level = getUrgencyLevel(dueDate)
  return cn('border-l-4', urgencyClasses[level].border)
}
