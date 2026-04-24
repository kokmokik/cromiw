'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    let authed = false
    try {
      authed = localStorage.getItem('cromiw_authed') === 'true'
    } catch {}
    if (!authed) {
      authed = document.cookie.includes('cromiw_authed=true')
    }
    router.replace(authed ? '/dashboard' : '/login')
  }, [router])

  return (
    <div className="flex h-screen items-center justify-center bg-cream">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-navy-deep border-t-transparent" />
    </div>
  )
}
