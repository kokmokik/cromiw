import { Settings } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-navy-deep/8 mb-6">
        <Settings className="h-8 w-8 text-navy-deep/40" />
      </div>
      <h1 className="font-display text-2xl font-bold text-navy-deep">Bald verfügbar</h1>
      <p className="mt-2 text-sm text-muted max-w-xs">
        Einstellungen und Konfiguration werden in Kürze freigeschaltet.
      </p>
    </div>
  )
}
