"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Html5Qrcode } from "html5-qrcode"
import { ROUTES } from "@/lib/constants"

export default function QrScanner() {
  const router = useRouter()

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader")
    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (text) => {
          scanner.stop().catch(() => {})
          router.push(ROUTES.CASE(text))
        },
        undefined
      )
      .catch(console.error)

    return () => {
      scanner.stop().catch(() => {})
    }
  }, [router])

  return <div id="qr-reader" className="w-full overflow-hidden rounded-xl border bg-black" />
}
