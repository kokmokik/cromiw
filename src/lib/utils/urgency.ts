import type { UrgencyLevel } from '@/lib/data/types'

export function getUrgencyLevel(dueDate: string): UrgencyLevel {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  const diffDays = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays <= 1) return 'crimson'
  if (diffDays <= 3) return 'yellow'
  return 'green'
}

export const urgencyClasses: Record<UrgencyLevel, { border: string; row: string; text: string }> = {
  crimson: {
    border: 'border-l-crimson',
    row: 'bg-crimson/5',
    text: 'text-crimson',
  },
  yellow: {
    border: 'border-l-amber-400',
    row: 'bg-amber-50',
    text: 'text-amber-700',
  },
  green: {
    border: 'border-l-emerald-500',
    row: 'bg-emerald-50/40',
    text: 'text-emerald-700',
  },
}
