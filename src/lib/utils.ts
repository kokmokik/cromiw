import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Urgency } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getUrgency(dueDate: string): Urgency {
  const diffHours = (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60)
  if (diffHours < 24) return "HIGH"
  if (diffHours < 48) return "MEDIUM"
  return "LOW"
}

export function formatDueDate(dueDate: string): string {
  const diffHours = Math.round((new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60))
  if (diffHours < 0) return "Overdue"
  if (diffHours < 24) return `in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
  if (diffHours < 48) return "tomorrow"
  return `in ${Math.round(diffHours / 24)} days`
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
