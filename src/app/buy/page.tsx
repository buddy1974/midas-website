// Server wrapper: checks Page Builder first, falls back to hardcoded client page

import { getBuilderLayout } from '@/lib/builder-render'
import { PageRenderer } from '@/components/builder/SectionRenderer'
import BuyClientPage from './BuyClientPage'

export default async function BuyPage() {
  const builderLayout = await getBuilderLayout('buy')
  if (builderLayout) return <main><PageRenderer sections={builderLayout.sections} /></main>
  return <BuyClientPage />
}
