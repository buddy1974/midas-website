// ─────────────────────────────────────────────────────────────────────────────
// Midas Page Builder — Core Types
// ─────────────────────────────────────────────────────────────────────────────

export type SectionType =
  | 'hero'
  | 'hero-light'
  | 'page-header'
  | 'stats-bar'
  | 'text-block'
  | 'text-image'
  | 'two-column'
  | 'card-grid'
  | 'steps'
  | 'cta-banner'
  | 'newsletter'
  | 'contact-block'
  | 'image-full'
  | 'faq'
  | 'testimonials'
  | 'properties-grid'
  | 'spacer'
  | 'divider'
  | 'rich-text'
  | 'contact-bar'
  | 'auction-types'

export type BackgroundStyle = 'dark' | 'light' | 'cream' | 'white' | 'gold'
export type PaddingSize = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export interface SectionSettings {
  background: BackgroundStyle
  paddingTop: PaddingSize
  paddingBottom: PaddingSize
  hidden: boolean
}

export interface BuilderSection {
  id: string
  type: SectionType
  data: Record<string, string | number | boolean | FAQItem[] | TestimonialItem[] | CardItem[] | StepItem[]>
  settings: SectionSettings
}

// \u2500\u2500 Nested data types \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export interface FAQItem {
  question: string
  answer: string
}

export interface TestimonialItem {
  quote: string
  author: string
  role: string
}

export interface CardItem {
  icon: string
  title: string
  body: string
}

export interface StepItem {
  title: string
  body: string
}

// \u2500\u2500 Page Layout \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export interface PageBuilderLayout {
  slug: string
  title: string
  metaTitle: string
  metaDesc: string
  sections: BuilderSection[]
  updatedAt?: string
}

// \u2500\u2500 Section library entry (shown in the left panel) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export interface SectionLibraryItem {
  type: SectionType
  label: string
  description: string
  icon: string
  category: 'hero' | 'content' | 'layout' | 'data' | 'utility'
}

export const SECTION_LIBRARY: SectionLibraryItem[] = [
  { type: 'hero',           label: 'Hero (Dark)',     description: 'Full-width dark hero with title & CTA',      icon: '\u25c9', category: 'hero' },
  { type: 'hero-light',     label: 'Hero (Light)',    description: 'Light/cream background hero section',         icon: '\u25ce', category: 'hero' },
  { type: 'page-header',    label: 'Page Header',     description: 'Compact inner-page header banner',            icon: '\u25ac', category: 'hero' },
  { type: 'text-block',     label: 'Text Block',      description: 'Single-column heading + body text',           icon: '\u2630', category: 'content' },
  { type: 'text-image',     label: 'Text + Image',    description: '50/50 text and image left or right',          icon: '\u229e', category: 'content' },
  { type: 'two-column',     label: 'Two Columns',     description: 'Two equal text columns side by side',         icon: '\u229f', category: 'content' },
  { type: 'card-grid',      label: 'Card Grid',       description: 'Grid of feature cards with icons',            icon: '\u22a0', category: 'content' },
  { type: 'steps',          label: 'Steps / Process', description: 'Numbered steps or process flow',              icon: '\u2780', category: 'content' },
  { type: 'faq',            label: 'FAQ',             description: 'Accordion-style questions and answers',       icon: '?', category: 'content' },
  { type: 'testimonials',   label: 'Testimonials',    description: 'Customer quote cards',                        icon: '"', category: 'content' },
  { type: 'rich-text',      label: 'Rich Text',       description: 'Free-form formatted text block',              icon: 'P', category: 'content' },
  { type: 'cta-banner',     label: 'CTA Banner',      description: 'Full-width call-to-action strip',             icon: '\u25b6', category: 'layout' },
  { type: 'stats-bar',      label: 'Stats Bar',       description: 'Row of key stat numbers',                     icon: '#', category: 'layout' },
  { type: 'newsletter',     label: 'Newsletter',      description: 'Email sign-up form section',                  icon: '@', category: 'layout' },
  { type: 'contact-block',  label: 'Contact Info',    description: 'Address, phone, email, hours',                icon: 'T', category: 'layout' },
  { type: 'image-full',     label: 'Image Banner',    description: 'Full-width image with optional caption',      icon: 'I', category: 'layout' },
  { type: 'properties-grid',label: 'Properties',      description: 'Live property listings from database',        icon: 'P', category: 'data' },
  { type: 'spacer',         label: 'Spacer',          description: 'Blank vertical space',                        icon: '-', category: 'utility' },
  { type: 'divider',        label: 'Divider',         description: 'Horizontal rule separator line',              icon: '_', category: 'utility' },
  { type: 'contact-bar',    label: 'Contact Bar',     description: 'Dark strip: phone, mobile, email, hours',     icon: 'C', category: 'layout' },
  { type: 'auction-types',  label: 'Auction Types',   description: '4 service cards: auction, timed, off-market, valuation', icon: 'A', category: 'content' },
]

// \u2500\u2500 Field definitions for the Properties Panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export type FieldType = 'text' | 'textarea' | 'url' | 'number' | 'select' | 'toggle' | 'faq-list' | 'testimonial-list' | 'card-list' | 'step-list'

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  placeholder?: string
  options?: string[]
  hint?: string
}

export interface SectionFieldGroup {
  group: string
  fields: FieldDef[]
}

export type SectionSchema = SectionFieldGroup[]

// \u2500\u2500 Default settings for new sections \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

export const DEFAULT_SETTINGS: Record<SectionType, SectionSettings> = {
  'hero':            { background: 'dark',  paddingTop: 'xl',  paddingBottom: 'xl',  hidden: false },
  'hero-light':      { background: 'cream', paddingTop: 'xl',  paddingBottom: 'xl',  hidden: false },
  'page-header':     { background: 'dark',  paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'stats-bar':       { background: 'dark',  paddingTop: 'md',  paddingBottom: 'md',  hidden: false },
  'text-block':      { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'text-image':      { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'two-column':      { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'card-grid':       { background: 'cream', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'steps':           { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'cta-banner':      { background: 'dark',  paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'newsletter':      { background: 'cream', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'contact-block':   { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'image-full':      { background: 'white', paddingTop: 'none',paddingBottom: 'none',hidden: false },
  'faq':             { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'testimonials':    { background: 'dark',  paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'properties-grid': { background: 'cream', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'spacer':          { background: 'white', paddingTop: 'none',paddingBottom: 'none',hidden: false },
  'divider':         { background: 'white', paddingTop: 'sm',  paddingBottom: 'sm',  hidden: false },
  'rich-text':       { background: 'white', paddingTop: 'lg',  paddingBottom: 'lg',  hidden: false },
  'contact-bar':     { background: 'dark',  paddingTop: 'none',paddingBottom: 'none',hidden: false },
  'auction-types':   { background: 'dark',  paddingTop: 'none',paddingBottom: 'none',hidden: false },
}
