import type { CaseWithDentist, CaseFilter, CasesStats, Dentist } from './types'

export interface CasesRepository {
  list(filter?: CaseFilter): Promise<CaseWithDentist[]>
  get(id: string): Promise<CaseWithDentist | null>
  getStats(): Promise<CasesStats>
  getDentists(): Promise<Dentist[]>
}
