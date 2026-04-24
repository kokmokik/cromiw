'use client'

import { useQuery } from '@tanstack/react-query'
import { getRepository } from './index'
import { queryKeys } from './queryKeys'
import type { CaseFilter } from './types'

export function useCases(filter?: CaseFilter) {
  return useQuery({
    queryKey: queryKeys.cases.list(filter),
    queryFn: () => getRepository().list(filter),
  })
}

export function useCase(id: string) {
  return useQuery({
    queryKey: queryKeys.cases.detail(id),
    queryFn: () => getRepository().get(id),
    enabled: !!id,
  })
}

export function useCasesStats() {
  return useQuery({
    queryKey: queryKeys.cases.stats,
    queryFn: () => getRepository().getStats(),
  })
}
