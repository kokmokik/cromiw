'use client'

import Link from 'next/link'
import { ArrowRight, AlertCircle } from 'lucide-react'
import { useCases, useCasesStats } from '@/lib/data/hooks'
import { KpiCard } from './KpiCard'
import { StageBadge } from './StageBadge'
import { StatusBadge } from './StatusBadge'
import { UrgencyDot, UrgencyDate } from './UrgencyAccent'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardContent() {
  const { data: stats, isLoading: statsLoading } = useCasesStats()
  const { data: urgentCases, isLoading: casesLoading } = useCases({ status: 'ÜBERFÄLLIG' })
  const { data: activeCases } = useCases({ status: 'AKTIV' })

  const todayUrgent = [
    ...(urgentCases ?? []),
    ...(activeCases ?? []).filter((c) => {
      const diff = Math.ceil(
        (new Date(c.dueDate).setHours(0,0,0,0) - new Date().setHours(0,0,0,0)) / 86400000
      )
      return diff <= 1
    }),
  ].slice(0, 8)

  return (
    <div className="space-y-8">
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-lg" />
          ))
        ) : (
          <>
            <KpiCard
              label="Aktive Fälle"
              value={stats?.active ?? 0}
              delta={`+3 heute`}
              accent
            />
            <KpiCard
              label="Pünktlich"
              value={`${stats?.onTimePercent ?? 0}%`}
              delta="+2% ggü. Vormonat"
            />
            <KpiCard
              label="Überfällig"
              value={stats?.overdue ?? 0}
              className={stats && stats.overdue > 0 ? 'border-crimson/30' : ''}
            />
            <KpiCard
              label="Gesamt"
              value={stats?.total ?? 0}
            />
          </>
        )}
      </div>

      {/* Urgent / today section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-crimson" />
            <h2 className="text-sm font-medium text-ink">Dringende Fälle</h2>
          </div>
          <Link
            href="/cases"
            className="flex items-center gap-1 text-xs text-muted hover:text-navy-deep transition-colors"
          >
            Alle Fälle ansehen
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {casesLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : todayUrgent.length === 0 ? (
          <div className="rounded-lg border border-navy-deep/10 bg-paper p-8 text-center text-sm text-muted">
            Keine dringenden Fälle — alles im grünen Bereich.
          </div>
        ) : (
          <div className="rounded-lg border border-navy-deep/10 bg-paper overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-navy-deep/10 bg-cream/60">
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted">Fall</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted">Patient</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted hidden sm:table-cell">Zahnarzt</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted">Stufe</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted">Fällig</th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-widest text-muted">Status</th>
                </tr>
              </thead>
              <tbody>
                {todayUrgent.map((c) => (
                  <tr key={c.id} className="border-b border-navy-deep/5 last:border-0 border-l-4 border-l-crimson">
                    <td className="px-4 py-3">
                      <Link href={`/cases/${c.id}`} className="font-mono text-xs font-medium text-navy-deep hover:underline">
                        {c.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-medium">{c.patient.lastName}, {c.patient.firstName}</td>
                    <td className="px-4 py-3 text-ink/70 hidden sm:table-cell">{c.dentist.name}</td>
                    <td className="px-4 py-3"><StageBadge stage={c.stage} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <UrgencyDot dueDate={c.dueDate} />
                        <UrgencyDate dueDate={c.dueDate} />
                      </div>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
