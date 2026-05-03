export type CaseStatus = 'NEW' | 'IN_PROGRESS' | 'QC' | 'READY_TO_SHIP' | 'SHIPPED'
export type Urgency    = 'HIGH' | 'MEDIUM' | 'LOW'
export type Provider   = 'MEDIT' | '3SHAPE' | 'ITERO' | 'PLANMECA'
export type UserRole   = 'ADMIN' | 'TECHNICIAN'

export interface Lab {
  id: string; name: string; email: string; logoUrl?: string
}
export interface User {
  id: string; name: string; email: string; role: UserRole; labId: string
}
export interface CaseFile {
  id: string; name: string; fileType: string; downloadUrl: string; sizeBytes: number
}
export interface Note {
  id: string; text: string; createdAt: string; author: { name: string }
}
export interface StatusHistoryEntry {
  id: string; fromStatus: CaseStatus; toStatus: CaseStatus
  changedAt: string; changedBy: { name: string }
}
export interface Case {
  id: string; externalId: string; source: Provider
  patientName: string; clinicName: string; dentistName?: string
  status: CaseStatus; urgency: Urgency; dueDate: string; createdAt: string
  technician?: User; files?: CaseFile[]; notes?: Note[]; history?: StatusHistoryEntry[]
}
export interface DashboardStats {
  newToday: number; inProgress: number; overdue: number; readyToShip: number
}
export interface Connection {
  id: string; provider: Provider; status: 'CONNECTED' | 'DISCONNECTED'; connectedAt?: string
}
