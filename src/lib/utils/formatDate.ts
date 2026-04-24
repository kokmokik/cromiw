import { format, formatDistance, isToday, isTomorrow, isPast } from 'date-fns'
import { de } from 'date-fns/locale'

export function formatDueDate(dueDate: string): string {
  const date = new Date(dueDate)
  if (isPast(date) && !isToday(date)) {
    return `${formatDistance(date, new Date(), { locale: de })} überfällig`
  }
  if (isToday(date)) return 'Heute'
  if (isTomorrow(date)) return 'Morgen'
  return format(date, 'dd.MM.yyyy', { locale: de })
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), 'dd.MM.yyyy HH:mm', { locale: de })
}

export function formatDateShort(dateString: string): string {
  return format(new Date(dateString), 'dd.MM.yy', { locale: de })
}
