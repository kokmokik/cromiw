'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from '@tanstack/react-table'
import { ChevronRight, ChevronUp, ChevronDown, Search, Loader2 } from 'lucide-react'
import { useCases } from '@/lib/data/hooks'
import type { CaseWithDentist, Stage } from '@/lib/data/types'
import { Input } from '@/components/ui/input'
import { StageBadge } from './StageBadge'
import { StatusBadge } from './StatusBadge'
import { UrgencyDot, UrgencyDate, urgencyRowClass } from './UrgencyAccent'
import { cn } from '@/lib/utils/cn'

const STAGE_TABS: { value: Stage | 'all'; label: string }[] = [
  { value: 'all', label: 'Alle' },
  { value: 'model_stumpf', label: 'Modell & Stumpf' },
  { value: 'keramik', label: 'Keramik' },
  { value: 'finish', label: 'Finish' },
  { value: 'versand', label: 'Versand' },
  { value: 'abgeschlossen', label: 'Abgeschlossen' },
]

const TYPE_LABELS: Record<string, string> = {
  krone: 'Krone',
  bruecke: 'Brücke',
  implantat: 'Implantat',
  veneer: 'Veneer',
  prothese: 'Prothese',
}

const col = createColumnHelper<CaseWithDentist>()

const columns = [
  col.accessor('id', {
    header: 'Fall-ID',
    cell: (info) => (
      <span className="font-mono text-xs font-medium text-navy-deep">{info.getValue()}</span>
    ),
  }),
  col.accessor(
    (row) => `${row.patient.lastName}, ${row.patient.firstName}`,
    {
      id: 'patient',
      header: 'Patient',
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }
  ),
  col.accessor('dentist.name', {
    header: 'Zahnarzt',
    cell: (info) => <span className="text-ink/70">{info.getValue()}</span>,
  }),
  col.accessor('type', {
    header: 'Typ',
    cell: (info) => <span className="text-sm">{TYPE_LABELS[info.getValue()] ?? info.getValue()}</span>,
  }),
  col.accessor('stage', {
    header: 'Stufe',
    cell: (info) => <StageBadge stage={info.getValue()} />,
  }),
  col.accessor('dueDate', {
    header: 'Fällig',
    cell: (info) => (
      <div className="flex items-center gap-2">
        <UrgencyDot dueDate={info.getValue()} />
        <UrgencyDate dueDate={info.getValue()} />
      </div>
    ),
  }),
  col.accessor('status', {
    header: 'Status',
    cell: (info) => <StatusBadge status={info.getValue()} />,
  }),
  col.display({
    id: 'action',
    cell: () => <ChevronRight className="h-4 w-4 text-muted" />,
  }),
]

export function CasesTable() {
  const router = useRouter()
  const [stageFilter, setStageFilter] = useState<Stage | 'all'>('all')
  const [search, setSearch] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])

  const { data: cases, isLoading, isError } = useCases({
    stage: stageFilter,
    search: search || undefined,
  })

  const table = useReactTable({
    data: cases ?? [],
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="space-y-4">
      {/* Stage tabs */}
      <div className="flex flex-wrap gap-1 border-b border-navy-deep/10 pb-0">
        {STAGE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStageFilter(tab.value)}
            className={cn(
              '-mb-px px-4 py-2.5 text-sm font-medium border-b-2 transition-colors',
              stageFilter === tab.value
                ? 'border-navy-deep text-navy-deep'
                : 'border-transparent text-muted hover:text-ink'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted pointer-events-none" />
        <Input
          placeholder="Patient, Zahnarzt oder Fall-ID …"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-navy-deep/10 bg-paper overflow-hidden">
        {isLoading && (
          <div className="flex items-center justify-center py-16 text-muted gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Fälle werden geladen…</span>
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center py-16 text-crimson text-sm">
            Fehler beim Laden der Daten.
          </div>
        )}

        {!isLoading && !isError && (
          <table className="w-full text-sm">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-navy-deep/10 bg-cream/60">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:text-ink'
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getIsSorted() === 'asc' && <ChevronUp className="h-3 w-3" />}
                        {header.column.getIsSorted() === 'desc' && <ChevronDown className="h-3 w-3" />}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-12 text-center text-sm text-muted">
                    Keine Fälle gefunden.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => router.push(`/cases/${row.original.id}`)}
                    className={cn(
                      'cursor-pointer border-b border-navy-deep/5 last:border-0 hover:bg-cream/60 transition-colors',
                      urgencyRowClass(row.original.dueDate, row.original.status)
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {cases && (
        <p className="text-xs text-muted">
          {cases.length} {cases.length === 1 ? 'Fall' : 'Fälle'} gefunden
        </p>
      )}
    </div>
  )
}
