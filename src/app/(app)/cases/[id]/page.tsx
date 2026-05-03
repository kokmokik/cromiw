"use client"

import { useParams } from "next/navigation"
import { FileText, User, Clock, MessageSquare } from "lucide-react"
import { useCase } from "@/hooks/use-case"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { StatusBadge } from "@/components/cases/status-badge"
import { UrgencyDot } from "@/components/cases/urgency-dot"
import { SourceBadge } from "@/components/cases/source-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDueDate, formatFileSize } from "@/lib/utils"

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: kase, isLoading, isError } = useCase(id)

  if (isLoading) return <LoadingSkeleton rows={8} />
  if (isError || !kase) return (
    <EmptyState icon={FileText} heading="Case not found" subtext="This case may have been removed or you may not have access." />
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <UrgencyDot urgency={kase.urgency} />
        <h2 className="text-xl font-bold">{kase.patientName}</h2>
        <SourceBadge source={kase.source} />
        <StatusBadge status={kase.status} />
        <span className="ml-auto text-sm text-muted">Due {formatDueDate(kase.dueDate)}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-sm">Patient Info</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Clinic</span><span>{kase.clinicName}</span></div>
            {kase.dentistName && <div className="flex justify-between"><span className="text-muted">Dentist</span><span>{kase.dentistName}</span></div>}
            <div className="flex justify-between"><span className="text-muted">External ID</span><code className="text-xs">{kase.externalId}</code></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Technician</CardTitle></CardHeader>
          <CardContent className="text-sm">
            {kase.technician ? (
              <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted" />{kase.technician.name}</div>
            ) : (
              <span className="text-muted">Unassigned</span>
            )}
            {/* TODO: Add technician assignment dropdown once users list endpoint is ready */}
          </CardContent>
        </Card>
      </div>

      {!!kase.files?.length && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Files</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {kase.files.map((f) => (
              <a key={f.id} href={f.downloadUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-md border p-2 text-sm hover:bg-gray-50">
                <span className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted" />{f.name}</span>
                <span className="text-xs text-muted">{formatFileSize(f.sizeBytes)}</span>
              </a>
            ))}
          </CardContent>
        </Card>
      )}

      {!!kase.notes?.length && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><MessageSquare className="h-4 w-4" />Notes</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {kase.notes.map((n) => (
              <div key={n.id} className="rounded-md bg-gray-50 p-3 text-sm">
                <p>{n.text}</p>
                <p className="mt-1 text-xs text-muted">{n.author.name} · {new Date(n.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {!!kase.history?.length && (
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4" />History</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {kase.history.map((h) => (
              <div key={h.id} className="flex items-center gap-2 text-sm">
                <StatusBadge status={h.fromStatus} />
                <span className="text-muted">→</span>
                <StatusBadge status={h.toStatus} />
                <span className="ml-auto text-xs text-muted">{h.changedBy.name} · {new Date(h.changedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
