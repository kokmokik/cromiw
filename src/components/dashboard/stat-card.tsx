import type { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  icon: LucideIcon
  value: number
  label: string
  color?: "primary" | "success" | "warning" | "danger"
}

const colorMap: Record<NonNullable<StatCardProps["color"]>, string> = {
  primary: "text-primary bg-blue-50",
  success: "text-success bg-green-50",
  warning: "text-warning bg-yellow-50",
  danger:  "text-danger bg-red-50",
}

export function StatCard({ icon: Icon, value, label, color = "primary" }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn("rounded-lg p-3", colorMap[color])}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm text-muted">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}
