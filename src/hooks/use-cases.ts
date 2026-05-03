import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Case } from "@/types"

interface Params { search?: string; status?: string }

export function useCases(params?: Params) {
  return useQuery({
    queryKey: ["cases", params],
    queryFn: async () => {
      const { data } = await api.get<Case[]>("/cases", { params })
      return data
    },
  })
}
