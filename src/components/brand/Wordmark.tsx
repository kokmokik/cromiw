import { cn } from '@/lib/utils/cn'

interface WordmarkProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-4xl',
}

export function Wordmark({ className, size = 'md' }: WordmarkProps) {
  return (
    <span className={cn('font-display font-bold tracking-tight', sizeClasses[size], className)}>
      Cromiw
    </span>
  )
}
