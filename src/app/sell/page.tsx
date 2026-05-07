// Server wrapper: checks Page Builder first, falls back to hardcoded client page

import { getBuilderLayout } from '@/lib/builder-render'
import { PageRenderer } from '@/components/builder/SectionRenderer'
import SellClientPage from './SellClientPage'

export default async function SellPage() {
  const builderLayout = await getBuilderLayout('sell')
  if (builderLayout) return <main><PageRenderer sections={builderLayout.sections} /></main>
  return <SellClientPage />
}
