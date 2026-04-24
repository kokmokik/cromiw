'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Bitte E-Mail und Passwort eingeben.')
      return
    }
    setLoading(true)
    setError('')

    await new Promise((r) => setTimeout(r, 600))

    try {
      localStorage.setItem('cromiw_authed', 'true')
    } catch {}
    document.cookie = 'cromiw_authed=true; path=/; max-age=86400'
    router.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-2xl font-display font-bold text-navy-deep">Anmelden</h2>
        <p className="mt-1 text-sm text-muted">Willkommen zurück im Cromiw-Labor.</p>
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink/70 uppercase tracking-wide">
            E-Mail-Adresse
          </label>
          <Input
            id="email"
            type="email"
            placeholder="labor@praxis.de"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink/70 uppercase tracking-wide">
            Passwort
          </label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      {error && <p className="text-sm text-crimson">{error}</p>}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Wird angemeldet…' : 'Anmelden'}
      </Button>
    </form>
  )
}
