"use client"

import dynamic from "next/dynamic"
import { QrCode } from "lucide-react"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"

const QrScanner = dynamic(() => import("@/components/cases/qr-scanner"), {
  ssr: false,
  loading: () => <LoadingSkeleton rows={3} />,
})

export default function ScanPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-2 text-sm text-muted">
        <QrCode className="h-5 w-5" />
        Point your camera at a case QR code
      </div>
      <div className="w-full max-w-sm">
        <QrScanner />
      </div>
      {/* TODO: Add manual case-ID entry as a fallback for devices without camera */}
    </div>
  )
}
