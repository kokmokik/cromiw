import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Case } from "@/types"

export function useCase(id: string) {
  return useQuery({
    queryKey: ["cases", id],
    queryFn: async () => {
      const { data } = await api.get<Case>(`/cases/${id}`)
      return data
    },
    enabled: !!id,
  })
}
