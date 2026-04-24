'use client'

import Link from 'next/link'
import { ArrowLeft, FileText, Image, Stethoscope, FileCode2 } from 'lucide-react'
import { useCase } from '@/lib/data/hooks'
import type { AttachmentType } from '@/lib/data/types'
import { StageBadge } from './StageBadge'
import { StatusBadge } from './StatusBadge'
import { ToothChart } from './ToothChart'
import { StageTimeline } from './StageTimeline'
import { UrgencyDate } from './UrgencyAccent'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'

const TYPE_LABELS: Record<string, string> = {
  krone: 'Krone',
  bruecke: 'Brücke',
  implantat: 'Implantat',
  veneer: 'Veneer',
  prothese: 'Prothese',
}

const ATTACH_ICONS: Record<AttachmentType, React.ElementType> = {
  STL: FileCode2,
  FOTO: Image,
  RÖNTGEN: Stethoscope,
  DOKUMENT: FileText,
}

export function CaseDetailClient({ id }: { id: string }) {
  const { data: c, isLoading, isError } = useCase(id)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (isError || !c) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-muted">
        <p className="text-sm">Fall nicht gefunden.</p>
        <Link href="/cases" className="mt-3 text-sm text-navy-deep underline">
          Zurück zur Übersicht
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Back + header */}
      <div>
        <Link
          href="/cases"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zu Fällen
        </Link>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold text-navy-deep">{c.id}</h1>
            <p className="mt-1 text-lg text-ink/70">
              {c.patient.lastName}, {c.patient.firstName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StageBadge stage={c.stage} />
            <StatusBadge status={c.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main details — 2 cols */}
        <div className="space-y-6 lg:col-span-2">
          {/* Prescription card */}
          <div className="rounded-lg border border-navy-deep/10 bg-paper p-6">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">Verordnung</h2>

            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Patient</dt>
                <dd className="mt-0.5 font-medium">{c.patient.lastName}, {c.patient.firstName}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Zahnarzt</dt>
                <dd className="mt-0.5 font-medium">{c.dentist.name}</dd>
                <dd className="text-xs text-muted">{c.dentist.practice} · {c.dentist.city}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Typ</dt>
                <dd className="mt-0.5 font-medium">{TYPE_LABELS[c.type] ?? c.type}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Fällig</dt>
                <dd className="mt-0.5 font-medium">
                  <UrgencyDate dueDate={c.dueDate} />
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Material</dt>
                <dd className="mt-0.5 font-medium">{c.material}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Farbe</dt>
                <dd className="mt-0.5 font-medium">{c.shade}</dd>
              </div>
            </dl>

            {c.notes && (
              <>
                <Separator className="my-4" />
                <div>
                  <p className="text-xs text-muted uppercase tracking-wide mb-1">Hinweise</p>
                  <p className="text-sm text-ink/80 leading-relaxed">{c.notes}</p>
                </div>
              </>
            )}
          </div>

          {/* Tooth chart */}
          <ToothChart selectedTeeth={c.teeth} />

          {/* Attachments */}
          <div className="rounded-lg border border-navy-deep/10 bg-paper p-6">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
              Anhänge ({c.attachments.length})
            </h2>
            {c.attachments.length === 0 ? (
              <p className="text-sm text-muted">Keine Anhänge vorhanden.</p>
            ) : (
              <ul className="divide-y divide-navy-deep/8">
                {c.attachments.map((att) => {
                  const Icon = ATTACH_ICONS[att.type] ?? FileText
                  return (
                    <li key={att.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-cream">
                        <Icon className="h-4 w-4 text-navy-deep" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{att.name}</p>
                        <p className="text-xs text-muted">{att.type}{att.size ? ` · ${att.size}` : ''}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Comments placeholder */}
          <div className="rounded-lg border border-navy-deep/10 bg-paper p-6">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">Kommentare</h2>
            <p className="text-sm text-muted italic">
              Kommentarfunktion wird demnächst freigeschaltet.
            </p>
          </div>
        </div>

        {/* Timeline sidebar — 1 col */}
        <div className="rounded-lg border border-navy-deep/10 bg-paper p-6">
          <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-muted">Verlauf</h2>
          {c.stageHistory.length === 0 ? (
            <p className="text-sm text-muted">Noch keine Stufen abgeschlossen.</p>
          ) : (
            <StageTimeline currentStage={c.stage} history={c.stageHistory} />
          )}
        </div>
      </div>
    </div>
  )
}
