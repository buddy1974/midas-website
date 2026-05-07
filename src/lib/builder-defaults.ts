// ─────────────────────────────────────────────────────────────────────────────
// Midas Page Builder — Default data for each section type
// These are the values a new section gets when dragged onto the canvas.
// ─────────────────────────────────────────────────────────────────────────────

import type { SectionType, SectionSchema } from './builder-types'

// ── Default data ──────────────────────────────────────────────────────────────

export const SECTION_DEFAULTS: Record<SectionType, Record<string, unknown>> = {
  'hero': {
    eyebrow: 'PROPERTY BROKERAGE — LONDON, ESSEX & NATIONWIDE',
    title: 'Midas Property Auctions',
    subtitle: 'Standing in the middle, connecting buyers, sellers and investors across the UK through our network of established auction companies and exclusive off-market services.',
    ctaText: 'View Current Lots',
    ctaUrl: '/current-auction',
    ctaText2: 'Register Interest',
    ctaUrl2: '/register',
  },
  'hero-light': {
    eyebrow: 'YOUR SUBTITLE HERE',
    title: 'Compelling Page Title',
    subtitle: 'A clear, concise description of what this page is about and how it helps the visitor.',
    ctaText: 'Get Started',
    ctaUrl: '/contact',
  },
  'page-header': {
    eyebrow: 'Section',
    title: 'Page Title',
    subtitle: 'Short supporting description for this page.',
  },
  'stats-bar': {
    stat1Label: 'Properties Sold',
    stat1Value: '340+',
    stat2Label: 'Active Investors',
    stat2Value: '2,847',
    stat3Label: 'Years Experience',
    stat3Value: '15+',
    stat4Label: '',
    stat4Value: '',
  },
  'text-block': {
    eyebrow: 'About Us',
    heading: 'A Team of Dedicated Experts',
    body: 'At Midas Property Group, we focus on ensuring we deliver a professional service for each of our clients. Our team has a drive and a vision to help Midas Property Group become one of the leaders in our industry.',
    ctaText: '',
    ctaUrl: '',
    alignment: 'center',
  },
  'text-image': {
    eyebrow: 'Our Approach',
    heading: 'Why Choose Midas?',
    body: 'We have a strong ethos and a desire to provide a turn-key solution for our clients. Due diligence and research are part of what we do.',
    imageUrl: '',
    imageAlt: 'Midas Property',
    ctaText: 'Learn More',
    ctaUrl: '/about',
    imagePosition: 'right',
  },
  'two-column': {
    heading: 'Two Column Heading',
    col1Title: 'Column One',
    col1Body: 'Write your first column content here. This can be a longer description of a service, feature, or key point.',
    col2Title: 'Column Two',
    col2Body: 'Write your second column content here. Match the length to the first column for a balanced layout.',
  },
  'card-grid': {
    heading: 'Our Services',
    subheading: 'Everything you need in one place.',
    columns: '3',
    cards: JSON.stringify([
      { icon: '🏠', title: 'Property Sales', body: 'Fast, transparent property sales through our nationwide auction network.' },
      { icon: '💼', title: 'Investment', body: 'Access exclusive off-market investment opportunities before they go to auction.' },
      { icon: '⚖️', title: 'Legal Support', body: 'Full legal pack management from instruction to completion.' },
    ]),
  },
  'steps': {
    heading: 'How It Works',
    subheading: 'A simple, transparent process from start to finish.',
    steps: JSON.stringify([
      { title: 'Register', body: 'Create your free account and join our investor database.' },
      { title: 'Browse Lots', body: 'View current and upcoming lots with full legal packs available.' },
      { title: 'Bid & Win', body: 'Bid online or in the room on auction day.' },
      { title: 'Complete', body: 'Exchange contracts and complete within 28 days.' },
    ]),
  },
  'cta-banner': {
    text: 'WE CAN ASSIST YOU WITH ALL YOUR PROPERTY INVESTMENT NEEDS',
    subtext: 'LET US KNOW HOW WE CAN HELP',
    ctaText: 'Get in Touch',
    ctaUrl: '/contact',
  },
  'newsletter': {
    heading: 'JOIN OUR MAILING LIST',
    subtitle: 'Be the first to hear about new lots, auction dates and exclusive investment opportunities.',
  },
  'contact-block': {
    heading: 'Get in Touch',
    address: 'Stanmore Business and Innovation Centre, Stanmore Place, Honeypot Lane, London HA7 1BT',
    phone: '+44 (0) 2072062691',
    mobile: '+44 (0) 7413041372',
    email: 'info@midaspropertyauctions.co.uk',
    hours: 'Mon to Fri: 9.00am to 6.00pm',
  },
  'image-full': {
    imageUrl: '',
    alt: 'Featured image',
    caption: '',
    height: '400',
  },
  'faq': {
    heading: 'Frequently Asked Questions',
    items: JSON.stringify([
      { question: 'How does property auction work?', answer: 'When the auctioneer\'s gavel falls, the highest bidder is legally bound to purchase the property and pays a 10% deposit on the day.' },
      { question: 'Are there buyers fees?', answer: 'Yes, buyers fees apply. Please refer to the legal pack for the specific property for full details.' },
      { question: 'Can I view the property before bidding?', answer: 'Yes, viewings are arranged prior to auction. Contact us to book a viewing on any lot.' },
    ]),
  },
  'testimonials': {
    heading: 'What Our Clients Say',
    items: JSON.stringify([
      { quote: 'Midas made the whole process incredibly smooth. We sold within 28 days at a great price.', author: 'Sarah T.', role: 'Property Seller, London' },
      { quote: 'As an investor I\'ve worked with many agents. Midas stands out for their transparency and network.', author: 'James R.', role: 'Property Investor' },
    ]),
  },
  'properties-grid': {
    heading: 'Current Lots',
    subheading: 'Live properties available now.',
    maxItems: '6',
    showFeatured: 'true',
    ctaText: 'View All Properties',
    ctaUrl: '/current-auction',
  },
  'spacer': {
    height: '64',
  },
  'divider': {
    style: 'line',
    color: 'muted',
  },
  'rich-text': {
    heading: '',
    content: '<p>Enter your content here. You can write multiple paragraphs and include <strong>bold</strong> or <em>italic</em> text.</p>',
    columns: '1',
    alignment: 'left',
  },
}

// ── Properties Panel field schema for each section type ───────────────────────

export const SECTION_SCHEMAS: Record<SectionType, SectionSchema> = {
  'hero': [
    { group: 'Content', fields: [
      { key: 'eyebrow',  label: 'Eyebrow text',  type: 'text',     placeholder: 'Short tagline above the title' },
      { key: 'title',    label: 'Main title',     type: 'textarea', placeholder: 'Big bold heading' },
      { key: 'subtitle', label: 'Subtitle',       type: 'textarea', placeholder: 'Supporting description' },
    ]},
    { group: 'Primary Button', fields: [
      { key: 'ctaText', label: 'Button text', type: 'text', placeholder: 'View Current Lots' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',  placeholder: '/current-auction' },
    ]},
    { group: 'Secondary Button', fields: [
      { key: 'ctaText2', label: 'Button text', type: 'text', placeholder: 'Register Interest' },
      { key: 'ctaUrl2',  label: 'Button URL',  type: 'url',  placeholder: '/register' },
    ]},
  ],
  'hero-light': [
    { group: 'Content', fields: [
      { key: 'eyebrow',  label: 'Eyebrow text', type: 'text',     placeholder: 'Short label' },
      { key: 'title',    label: 'Main title',   type: 'textarea', placeholder: 'Page heading' },
      { key: 'subtitle', label: 'Subtitle',     type: 'textarea', placeholder: 'Description' },
    ]},
    { group: 'Button', fields: [
      { key: 'ctaText', label: 'Button text', type: 'text', placeholder: 'Get Started' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',  placeholder: '/contact' },
    ]},
  ],
  'page-header': [
    { group: 'Content', fields: [
      { key: 'eyebrow',  label: 'Eyebrow', type: 'text',     placeholder: 'Section label' },
      { key: 'title',    label: 'Title',   type: 'textarea', placeholder: 'Page title' },
      { key: 'subtitle', label: 'Subtitle',type: 'textarea', placeholder: 'Short supporting text' },
    ]},
  ],
  'stats-bar': [
    { group: 'Stat 1', fields: [
      { key: 'stat1Value', label: 'Value', type: 'text', placeholder: '340+' },
      { key: 'stat1Label', label: 'Label', type: 'text', placeholder: 'Properties Sold' },
    ]},
    { group: 'Stat 2', fields: [
      { key: 'stat2Value', label: 'Value', type: 'text', placeholder: '2,847' },
      { key: 'stat2Label', label: 'Label', type: 'text', placeholder: 'Active Investors' },
    ]},
    { group: 'Stat 3', fields: [
      { key: 'stat3Value', label: 'Value', type: 'text', placeholder: '15+' },
      { key: 'stat3Label', label: 'Label', type: 'text', placeholder: 'Years Experience' },
    ]},
    { group: 'Stat 4 (optional)', fields: [
      { key: 'stat4Value', label: 'Value', type: 'text', placeholder: 'Leave empty to hide' },
      { key: 'stat4Label', label: 'Label', type: 'text', placeholder: 'Custom stat' },
    ]},
  ],
  'text-block': [
    { group: 'Content', fields: [
      { key: 'eyebrow',   label: 'Eyebrow',   type: 'text',     placeholder: 'Optional label' },
      { key: 'heading',   label: 'Heading',   type: 'textarea', placeholder: 'Section heading' },
      { key: 'body',      label: 'Body text', type: 'textarea', placeholder: 'Main paragraph content' },
    ]},
    { group: 'Button (optional)', fields: [
      { key: 'ctaText', label: 'Button text', type: 'text', placeholder: 'Leave empty to hide' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',  placeholder: '/contact' },
    ]},
    { group: 'Layout', fields: [
      { key: 'alignment', label: 'Text alignment', type: 'select', options: ['left', 'center', 'right'] },
    ]},
  ],
  'text-image': [
    { group: 'Text', fields: [
      { key: 'eyebrow', label: 'Eyebrow',   type: 'text',     placeholder: 'Optional label' },
      { key: 'heading', label: 'Heading',   type: 'textarea', placeholder: 'Section heading' },
      { key: 'body',    label: 'Body text', type: 'textarea', placeholder: 'Main content' },
      { key: 'ctaText', label: 'Button text', type: 'text',   placeholder: 'Learn More' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',    placeholder: '/about' },
    ]},
    { group: 'Image', fields: [
      { key: 'imageUrl', label: 'Image URL', type: 'url',  placeholder: 'https://...' },
      { key: 'imageAlt', label: 'Alt text',  type: 'text', placeholder: 'Description of image' },
    ]},
    { group: 'Layout', fields: [
      { key: 'imagePosition', label: 'Image position', type: 'select', options: ['left', 'right'] },
    ]},
  ],
  'two-column': [
    { group: 'Heading', fields: [
      { key: 'heading', label: 'Section heading', type: 'text', placeholder: 'Optional heading above columns' },
    ]},
    { group: 'Column 1', fields: [
      { key: 'col1Title', label: 'Title',   type: 'text',     placeholder: 'Column heading' },
      { key: 'col1Body',  label: 'Content', type: 'textarea', placeholder: 'Column content' },
    ]},
    { group: 'Column 2', fields: [
      { key: 'col2Title', label: 'Title',   type: 'text',     placeholder: 'Column heading' },
      { key: 'col2Body',  label: 'Content', type: 'textarea', placeholder: 'Column content' },
    ]},
  ],
  'card-grid': [
    { group: 'Header', fields: [
      { key: 'heading',    label: 'Heading',    type: 'text',     placeholder: 'Our Services' },
      { key: 'subheading', label: 'Subheading', type: 'textarea', placeholder: 'Short description' },
      { key: 'columns',    label: 'Columns',    type: 'select', options: ['2', '3', '4'] },
    ]},
    { group: 'Cards', fields: [
      { key: 'cards', label: 'Cards', type: 'card-list', hint: 'Add icon, title, and body for each card' },
    ]},
  ],
  'steps': [
    { group: 'Header', fields: [
      { key: 'heading',    label: 'Heading',    type: 'text',     placeholder: 'How It Works' },
      { key: 'subheading', label: 'Subheading', type: 'textarea', placeholder: 'Short description' },
    ]},
    { group: 'Steps', fields: [
      { key: 'steps', label: 'Steps', type: 'step-list', hint: 'Add title and body for each step' },
    ]},
  ],
  'cta-banner': [
    { group: 'Content', fields: [
      { key: 'text',    label: 'Main text',  type: 'textarea', placeholder: 'Your CTA message' },
      { key: 'subtext', label: 'Sub text',   type: 'text',     placeholder: 'Supporting line' },
    ]},
    { group: 'Button', fields: [
      { key: 'ctaText', label: 'Button text', type: 'text', placeholder: 'Get in Touch' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',  placeholder: '/contact' },
    ]},
  ],
  'newsletter': [
    { group: 'Content', fields: [
      { key: 'heading',  label: 'Heading',  type: 'text',     placeholder: 'JOIN OUR MAILING LIST' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', placeholder: 'Brief description of what subscribers receive' },
    ]},
  ],
  'contact-block': [
    { group: 'Header', fields: [
      { key: 'heading', label: 'Section heading', type: 'text', placeholder: 'Get in Touch' },
    ]},
    { group: 'Details', fields: [
      { key: 'address', label: 'Address',       type: 'textarea', placeholder: 'Full address' },
      { key: 'phone',   label: 'Phone',         type: 'text',     placeholder: '+44 20 ...' },
      { key: 'mobile',  label: 'Mobile',        type: 'text',     placeholder: '+44 74 ...' },
      { key: 'email',   label: 'Email',         type: 'text',     placeholder: 'info@...' },
      { key: 'hours',   label: 'Opening hours', type: 'text',     placeholder: 'Mon–Fri 9am–6pm' },
    ]},
  ],
  'image-full': [
    { group: 'Image', fields: [
      { key: 'imageUrl', label: 'Image URL', type: 'url',    placeholder: 'https://...' },
      { key: 'alt',      label: 'Alt text',  type: 'text',   placeholder: 'Image description' },
      { key: 'caption',  label: 'Caption',   type: 'text',   placeholder: 'Optional caption below image' },
      { key: 'height',   label: 'Height (px)', type: 'number', placeholder: '400' },
    ]},
  ],
  'faq': [
    { group: 'Header', fields: [
      { key: 'heading', label: 'Section heading', type: 'text', placeholder: 'Frequently Asked Questions' },
    ]},
    { group: 'Questions', fields: [
      { key: 'items', label: 'Q&A Items', type: 'faq-list' },
    ]},
  ],
  'testimonials': [
    { group: 'Header', fields: [
      { key: 'heading', label: 'Section heading', type: 'text', placeholder: 'What Our Clients Say' },
    ]},
    { group: 'Testimonials', fields: [
      { key: 'items', label: 'Testimonial items', type: 'testimonial-list' },
    ]},
  ],
  'properties-grid': [
    { group: 'Header', fields: [
      { key: 'heading',    label: 'Heading',    type: 'text',     placeholder: 'Current Lots' },
      { key: 'subheading', label: 'Subheading', type: 'textarea', placeholder: 'Short description' },
    ]},
    { group: 'Settings', fields: [
      { key: 'maxItems',     label: 'Max properties to show', type: 'number', placeholder: '6' },
      { key: 'showFeatured', label: 'Featured only',          type: 'select', options: ['true', 'false'] },
    ]},
    { group: 'Button', fields: [
      { key: 'ctaText', label: 'Button text', type: 'text', placeholder: 'View All Properties' },
      { key: 'ctaUrl',  label: 'Button URL',  type: 'url',  placeholder: '/current-auction' },
    ]},
  ],
  'spacer': [
    { group: 'Size', fields: [
      { key: 'height', label: 'Height (px)', type: 'number', placeholder: '64' },
    ]},
  ],
  'divider': [
    { group: 'Style', fields: [
      { key: 'style', label: 'Line style', type: 'select', options: ['line', 'dots', 'gradient'] },
      { key: 'color', label: 'Color',      type: 'select', options: ['muted', 'gold', 'white'] },
    ]},
  ],
  'rich-text': [
    { group: 'Content', fields: [
      { key: 'heading', label: 'Section heading (optional)', type: 'text',     placeholder: '' },
      { key: 'content', label: 'Content (HTML)',             type: 'textarea', placeholder: '<p>Your content...</p>' },
    ]},
    { group: 'Layout', fields: [
      { key: 'columns',   label: 'Columns',         type: 'select', options: ['1', '2'] },
      { key: 'alignment', label: 'Text alignment',  type: 'select', options: ['left', 'center', 'right'] },
    ]},
  ],
}
