import { EditorialShell } from '@/components/layout/EditorialShell'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <EditorialShell>{children}</EditorialShell>
}
