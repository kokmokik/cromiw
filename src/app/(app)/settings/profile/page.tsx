"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const schema = z.object({ name: z.string().min(2, "Lab name too short") })
type FormData = z.infer<typeof schema>

export default function ProfilePage() {
  const [saved, setSaved] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    await api.patch("/lab/profile", data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-lg space-y-6">
      <Card>
        <CardHeader><CardTitle>Lab Profile</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Lab name</label>
              <Input {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Logo</label>
              <Input type="file" accept="image/*" />
              {/* TODO: Wire up logo upload to cloud storage once S3 bucket is configured */}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {saved ? "Saved!" : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
