import type { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  heading: string
  subtext: string
  ctaLabel?: string
  onCta?: () => void
}

export function EmptyState({ icon: Icon, heading, subtext, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Icon className="mb-4 h-12 w-12 text-muted" />
      <h3 className="text-lg font-semibold">{heading}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted">{subtext}</p>
      {ctaLabel && onCta && (
        <Button className="mt-6" onClick={onCta}>{ctaLabel}</Button>
      )}
    </div>
  )
}
