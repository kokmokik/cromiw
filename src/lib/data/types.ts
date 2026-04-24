export type Stage = 'model_stumpf' | 'keramik' | 'finish' | 'versand' | 'abgeschlossen'

export type CaseType = 'krone' | 'bruecke' | 'implantat' | 'veneer' | 'prothese'

export type CaseStatus = 'AKTIV' | 'ERLEDIGT' | 'WARTEND' | 'ÜBERFÄLLIG'

export type UrgencyLevel = 'green' | 'yellow' | 'crimson'

export type AttachmentType = 'STL' | 'FOTO' | 'RÖNTGEN' | 'DOKUMENT'

export interface Dentist {
  id: string
  name: string
  practice: string
  city: string
}

export interface Patient {
  firstName: string
  lastName: string
}

export interface Attachment {
  id: string
  name: string
  type: AttachmentType
  size?: string
  uploadedAt: string
}

export interface StageHistoryEntry {
  stage: Stage
  technician: string
  completedAt: string
  notes?: string
}

export interface DentalCase {
  id: string
  patient: Patient
  dentistId: string
  type: CaseType
  stage: Stage
  status: CaseStatus
  dueDate: string
  createdAt: string
  teeth: number[]
  material: string
  shade: string
  notes?: string
  attachments: Attachment[]
  stageHistory: StageHistoryEntry[]
}

export interface CaseWithDentist extends DentalCase {
  dentist: Dentist
}

export interface CaseFilter {
  stage?: Stage | 'all'
  search?: string
  status?: CaseStatus
}

export interface CasesStats {
  total: number
  active: number
  overdue: number
  onTimePercent: number
  completedToday: number
}
