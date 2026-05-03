import { PROVIDERS } from "@/lib/constants"
import type { Provider } from "@/types"

export function SourceBadge({ source }: { source: Provider }) {
  const provider = PROVIDERS.find((p) => p.id === source)
  if (!provider) return null
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold text-white"
      style={{ backgroundColor: provider.color }}
    >
      {provider.label}
    </span>
  )
}
