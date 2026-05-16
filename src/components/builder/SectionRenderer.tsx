'use client'

import type { BuilderSection } from '@/lib/builder-types'
import HeroSection from './sections/HeroSection'
import HeroLightSection from './sections/HeroLightSection'
import PageHeaderSection from './sections/PageHeaderSection'
import StatsBarSection from './sections/StatsBarSection'
import TextBlockSection from './sections/TextBlockSection'
import TextImageSection from './sections/TextImageSection'
import TwoColumnSection from './sections/TwoColumnSection'
import CardGridSection from './sections/CardGridSection'
import StepsSection from './sections/StepsSection'
import CTABannerSection from './sections/CTABannerSection'
import NewsletterSection from './sections/NewsletterSection'
import ContactBlockSection from './sections/ContactBlockSection'
import ImageFullSection from './sections/ImageFullSection'
import FAQSection from './sections/FAQSection'
import TestimonialsSection from './sections/TestimonialsSection'
import PropertiesGridSection from './sections/PropertiesGridSection'
import SpacerSection from './sections/SpacerSection'
import DividerSection from './sections/DividerSection'
import RichTextSection from './sections/RichTextSection'
import ContactBarSection from './sections/ContactBarSection'
import AuctionTypesSection from './sections/AuctionTypesSection'

interface Props {
  section: BuilderSection
  preview?: boolean
}

export default function SectionRenderer({ section, preview }: Props) {
  if (section.settings.hidden && !preview) return null

  const data = section.data as Record<string, string>
  const bg = section.settings.background

  switch (section.type) {
    case 'hero':            return <HeroSection data={data} preview={preview} />
    case 'hero-light':      return <HeroLightSection data={data} preview={preview} />
    case 'page-header':     return <PageHeaderSection data={data} />
    case 'stats-bar':       return <StatsBarSection data={data} />
    case 'text-block':      return <TextBlockSection data={data} bg={bg} />
    case 'text-image':      return <TextImageSection data={data} bg={bg} />
    case 'two-column':      return <TwoColumnSection data={data} bg={bg} />
    case 'card-grid':       return <CardGridSection data={data} bg={bg} />
    case 'steps':           return <StepsSection data={data} bg={bg} />
    case 'cta-banner':      return <CTABannerSection data={data} />
    case 'newsletter':      return <NewsletterSection data={data} bg={bg} />
    case 'contact-block':   return <ContactBlockSection data={data} bg={bg} />
    case 'image-full':      return <ImageFullSection data={data} />
    case 'faq':             return <FAQSection data={data} bg={bg} />
    case 'testimonials':    return <TestimonialsSection data={data} bg={bg} />
    case 'properties-grid': return <PropertiesGridSection data={data} bg={bg} />
    case 'spacer':          return <SpacerSection data={data} />
    case 'divider':         return <DividerSection data={data} bg={bg} />
    case 'rich-text':       return <RichTextSection data={data} bg={bg} />
    case 'contact-bar':     return <ContactBarSection data={data} />
    case 'auction-types':   return <AuctionTypesSection data={data} preview={preview} />
    default:                return null
  }
}

// Full page renderer
export function PageRenderer({ sections: rawSections }: { sections: BuilderSection[] | string }) {
  const sections: BuilderSection[] = Array.isArray(rawSections)
    ? rawSections
    : typeof rawSections === 'string'
      ? JSON.parse(rawSections)
      : []
  return (
    <>
      {sections
        .filter(s => !s.settings.hidden)
        .map(section => (
          <SectionRenderer key={section.id} section={section} />
        ))}
    </>
  )
}
