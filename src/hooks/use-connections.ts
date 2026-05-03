import { useQuery } from "@tanstack/react-query"
import { api } from "@/lib/api"
import type { Connection } from "@/types"

export function useConnections() {
  return useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const { data } = await api.get<Connection[]>("/connections")
      return data
    },
  })
}
