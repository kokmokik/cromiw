import { Wordmark } from '@/components/brand/Wordmark'

export function EditorialShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream">
      {/* Left panel — editorial */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-navy-deep text-cream">
        <Wordmark className="text-cream" size="lg" />
        <div>
          <h1 className="font-display text-6xl font-bold leading-tight text-cream">
            Jeder Fall.
            <br />
            <span className="text-crimson">Pünktlich.</span>
          </h1>
          <p className="mt-6 text-lg text-cream/60 leading-relaxed">
            Cromiw verbindet jeden Schritt des Dentallabor-Workflows — von der Verordnung bis zur
            Auslieferung.
          </p>
        </div>
        <p className="text-sm text-cream/30">Dentallabor-Automatisierung · {new Date().getFullYear()}</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Wordmark size="md" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
