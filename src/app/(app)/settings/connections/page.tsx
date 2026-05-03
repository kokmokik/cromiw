"use client"

import { CheckCircle2, Plug, XCircle } from "lucide-react"
import { useConnections } from "@/hooks/use-connections"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PROVIDERS } from "@/lib/constants"

export default function ConnectionsPage() {
  const { data: connections, isLoading } = useConnections()

  if (isLoading) return <LoadingSkeleton />

  return (
    <div className="max-w-2xl space-y-4">
      {PROVIDERS.map((provider) => {
        const conn = connections?.find((c) => c.provider === provider.id)
        const isConnected = conn?.status === "CONNECTED"
        return (
          <Card key={provider.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-white"
                  style={{ backgroundColor: provider.color }}>
                  {provider.label.slice(0, 2)}
                </div>
                <div>
                  <p className="font-medium">{provider.label}</p>
                  {isConnected && conn?.connectedAt && (
                    <p className="text-xs text-muted">Connected {new Date(conn.connectedAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <><CheckCircle2 className="h-4 w-4 text-success" /><Button variant="outline" size="sm">Disconnect</Button></>
                ) : (
                  <><XCircle className="h-4 w-4 text-muted" /><Button size="sm"><Plug className="mr-1 h-3 w-3" />Connect</Button></>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
      {/* TODO: Implement OAuth flows for each provider once credentials are available */}
    </div>
  )
}
