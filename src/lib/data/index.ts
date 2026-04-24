import { MockRepository } from './mock/mockRepository'
import type { CasesRepository } from './repository'

let _repository: CasesRepository | null = null

export function getRepository(): CasesRepository {
  if (!_repository) {
    _repository = new MockRepository()
  }
  return _repository
}
