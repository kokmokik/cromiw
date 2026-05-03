"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/lib/constants"

const schema = z.object({
  labName: z.string().min(2, "Lab name too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "At least 8 characters"),
})
type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setError(null)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data)
      router.push(ROUTES.ONBOARDING)
    } catch {
      setError("Registration failed. Try a different email.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Create your lab</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Lab name" {...register("labName")} />
            {errors.labName && <p className="mt-1 text-xs text-danger">{errors.labName.message}</p>}
          </div>
          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
          </div>
          <div>
            <Input placeholder="Password" type="password" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-danger">{errors.password.message}</p>}
          </div>
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href={ROUTES.LOGIN} className="text-primary underline">Sign in</Link>
        </p>
        {/* TODO: Add email verification once backend supports it */}
      </CardContent>
    </Card>
  )
}
