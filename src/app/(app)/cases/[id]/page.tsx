import { CaseDetailClient } from '@/components/cases/CaseDetailClient'
import casesData from '@/lib/data/mock/cases.json'

export function generateStaticParams() {
  return (casesData as Array<{ id: string }>).map((c) => ({ id: c.id }))
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <CaseDetailClient id={id} />
}
