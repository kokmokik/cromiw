"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, Plug } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"

const STEPS = ["Welcome", "Connect Scanner", "All Set"]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg">
        <div className="mb-6 flex justify-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                {i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 w-12 ${i < step ? "bg-primary" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
        <Card>
          <CardHeader><CardTitle className="text-center">{STEPS[step]}</CardTitle></CardHeader>
          <CardContent className="text-center space-y-4">
            {step === 0 && (
              <>
                <p className="text-muted">Welcome to Cromiw! Connect your scanner accounts and all cases appear here automatically.</p>
                <Button onClick={() => setStep(1)}>Get started</Button>
              </>
            )}
            {step === 1 && (
              <>
                <Plug className="mx-auto h-12 w-12 text-primary" />
                <p className="text-muted">Connect your first scanner to start receiving cases automatically.</p>
                <Button className="gap-2" onClick={() => setStep(2)}>
                  <Plug className="h-4 w-4" /> Connect Medit
                </Button>
                {/* TODO: Implement OAuth flow for Medit when API credentials are available */}
              </>
            )}
            {step === 2 && (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                <p className="text-muted">You&apos;re all set! Your dashboard is ready.</p>
                <Button onClick={() => router.push(ROUTES.DASHBOARD)}>Go to dashboard</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
