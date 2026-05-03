"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Users, Mail } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { LoadingSkeleton } from "@/components/shared/loading-skeleton"
import { EmptyState } from "@/components/shared/empty-state"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User } from "@/types"

const schema = z.object({ email: z.string().email("Invalid email") })
type FormData = z.infer<typeof schema>

export default function TeamPage() {
  const { data: members, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: async () => {
      const { data } = await api.get<User[]>("/team")
      return data
    },
  })

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onInvite(data: FormData) {
    await api.post("/team/invite", data)
    reset()
  }

  if (isLoading) return <LoadingSkeleton />

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader><CardTitle>Invite team member</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onInvite)} className="flex gap-2">
            <div className="flex-1">
              <Input placeholder="colleague@lab.com" type="email" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="gap-2">
              <Mail className="h-4 w-4" />Invite
            </Button>
          </form>
        </CardContent>
      </Card>

      {!members?.length ? (
        <EmptyState icon={Users} heading="No team members yet" subtext="Invite colleagues to collaborate on cases." />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.email}</TableCell>
                    <TableCell>{m.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {/* TODO: Add role management and remove-member functionality */}
    </div>
  )
}
