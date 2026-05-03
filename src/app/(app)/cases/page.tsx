"use client"

import { useState } from "react"
import { Inbox } from "lucide-react"
import { useCases } from "@/hooks/use-cases"
import { CaseCard } from "@/components/cases/case-card"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Input } from "@/components/ui/input"
import type { CaseStatus } from "@/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const urgencyOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const

export default function CasesPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<CaseStatus | "">("")
  const { data: cases, isLoading } = useCases({ search, status: status || undefined })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search patient or clinic…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Tabs value={status} onValueChange={(v) => setStatus(v as CaseStatus | "")}>
          <TabsList>
            <TabsTrigger value="">All</TabsTrigger>
            <TabsTrigger value="NEW">New</TabsTrigger>
            <TabsTrigger value="IN_PROGRESS">In Progress</TabsTrigger>
            <TabsTrigger value="QC">QC</TabsTrigger>
            <TabsTrigger value="READY_TO_SHIP">Ready</TabsTrigger>
            <TabsTrigger value="SHIPPED">Shipped</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {isLoading ? (
        <LoadingSkeleton rows={8} />
      ) : !cases?.length ? (
        <EmptyState icon={Inbox} heading="No cases" subtext="Connect a scanner or adjust your filters." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...cases]
            .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
            .map((c) => <CaseCard key={c.id} kase={c} />)}
        </div>
      )}
      {/* TODO: Add infinite scroll / pagination */}
    </div>
  )
}
