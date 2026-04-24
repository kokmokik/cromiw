import type { CasesRepository } from '../repository'
import type { CaseWithDentist, CaseFilter, CasesStats, Dentist, DentalCase } from '../types'
import casesData from './cases.json'
import dentistsData from './dentists.json'

export class MockRepository implements CasesRepository {
  private cases = casesData as unknown as DentalCase[]
  private dentists = dentistsData as Dentist[]

  private getDentistById(id: string): Dentist {
    return (
      this.dentists.find((d) => d.id === id) ?? {
        id,
        name: 'Unbekannt',
        practice: '',
        city: '',
      }
    )
  }

  private attachDentist(c: DentalCase): CaseWithDentist {
    return { ...c, dentist: this.getDentistById(c.dentistId) }
  }

  async list(filter?: CaseFilter): Promise<CaseWithDentist[]> {
    let results = this.cases.map((c) => this.attachDentist(c))

    if (filter?.stage && filter.stage !== 'all') {
      results = results.filter((c) => c.stage === filter.stage)
    }

    if (filter?.status) {
      results = results.filter((c) => c.status === filter.status)
    }

    if (filter?.search) {
      const q = filter.search.toLowerCase()
      results = results.filter(
        (c) =>
          c.patient.firstName.toLowerCase().includes(q) ||
          c.patient.lastName.toLowerCase().includes(q) ||
          c.dentist.name.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
      )
    }

    results.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    return results
  }

  async get(id: string): Promise<CaseWithDentist | null> {
    const c = this.cases.find((c) => c.id === id)
    if (!c) return null
    return this.attachDentist(c)
  }

  async getStats(): Promise<CasesStats> {
    const all = this.cases
    const active = all.filter((c) => c.status === 'AKTIV' || c.status === 'WARTEND').length
    const overdue = all.filter((c) => c.status === 'ÜBERFÄLLIG').length
    const completed = all.filter((c) => c.status === 'ERLEDIGT').length
    const onTimePercent = completed + overdue > 0
      ? Math.round((completed / (completed + overdue)) * 100)
      : 98
    return { total: all.length, active, overdue, onTimePercent, completedToday: 3 }
  }

  async getDentists(): Promise<Dentist[]> {
    return this.dentists
  }
}
