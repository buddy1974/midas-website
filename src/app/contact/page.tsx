// Server wrapper: checks Page Builder first, falls back to hardcoded client page

import { getBuilderLayout } from '@/lib/builder-render'
import { PageRenderer } from '@/components/builder/SectionRenderer'
import ContactClientPage from './ContactClientPage'

export default async function ContactPage() {
  const builderLayout = await getBuilderLayout('contact')
  if (builderLayout) return <main><PageRenderer sections={builderLayout.sections} /></main>
  return <ContactClientPage />
}
