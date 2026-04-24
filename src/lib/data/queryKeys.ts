import type { CaseFilter } from './types'

export const queryKeys = {
  cases: {
    all: ['cases'] as const,
    list: (filter?: CaseFilter) => ['cases', 'list', filter] as const,
    detail: (id: string) => ['cases', 'detail', id] as const,
    stats: ['cases', 'stats'] as const,
  },
  dentists: {
    all: ['dentists'] as const,
  },
}
