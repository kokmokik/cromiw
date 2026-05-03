"use client"

import { useState } from "react"
import { Inbox, Clock, AlertCircle, Package } from "lucide-react"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { useCases } from "@/hooks/use-cases"
import { StatCard } from "@/components/dashboard/stat-card"
import { CaseCard } from "@/components/cases/case-card"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CaseStatus } from "@/types"

const urgencyOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 } as const

export default function DashboardPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<CaseStatus | "">("")

  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: cases, isLoading: casesLoading } = useCases({ search, status: status || undefined })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsLoading
          ? <LoadingSkeleton rows={1} />
          : <>
              <StatCard icon={Inbox}       value={stats?.newToday ?? 0}    label="New Today"     color="primary" />
              <StatCard icon={Clock}       value={stats?.inProgress ?? 0}  label="In Progress"   color="warning" />
              <StatCard icon={AlertCircle} value={stats?.overdue ?? 0}     label="Overdue"       color="danger"  />
              <StatCard icon={Package}     value={stats?.readyToShip ?? 0} label="Ready to Ship" color="success" />
            </>
        }
      </div>

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

      {casesLoading ? (
        <LoadingSkeleton rows={6} />
      ) : !cases?.length ? (
        <EmptyState icon={Inbox} heading="No cases found" subtext="Connect a scanner to start receiving cases automatically." />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[...cases]
            .sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency])
            .map((c) => <CaseCard key={c.id} kase={c} />)}
        </div>
      )}
      {/* TODO: Add pagination once case list exceeds 50 */}
    </div>
  )
}
