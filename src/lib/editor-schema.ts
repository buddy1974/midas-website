export interface FieldSchema {
  label: string
  type: 'text' | 'textarea' | 'image'
  fallback: string
  multiline?: boolean
}

export interface SectionSchema {
  label: string
  bgDark?: boolean
  fields: Record<string, FieldSchema>
}

export interface PageSchema {
  label: string
  sections: Record<string, SectionSchema>
}

export const EDITOR_SCHEMA: Record<string, PageSchema> = {
  home: {
    label: 'Homepage',
    sections: {
      hero: {
        label: 'Hero Section',
        bgDark: true,
        fields: {
          eyebrow: { label: 'Eyebrow text', type: 'text', fallback: 'PROPERTY BROKERAGE. LONDON, ESSEX & NATIONWIDE' },
          title_1: { label: 'Title — line 1', type: 'text', fallback: 'Midas' },
          title_2: { label: 'Title — line 2', type: 'text', fallback: 'Property Auctions' },
          subtitle: { label: 'Hero subtitle', type: 'textarea', fallback: 'Standing in the middle, connecting buyers, sellers and investors across the UK through our network of established auction companies and exclusive off-market services.', multiline: true },
        },
      },
      stats: {
        label: 'Stats Bar',
        bgDark: true,
        fields: {
          properties: { label: 'Properties sold', type: 'text', fallback: '340+' },
          investors: { label: 'Active investors', type: 'text', fallback: '2,847' },
          experience: { label: 'Years experience', type: 'text', fallback: '15+' },
        },
      },
      welcome: {
        label: 'Welcome Section',
        bgDark: true,
        fields: {
          heading: { label: 'Heading', type: 'text', fallback: 'Welcome to Midas Property Auctions' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'Midas Property Auctions connects buyers, sellers and investors across the UK, working with a network of established UK auction companies to deliver fast, transparent and professional results.', multiline: true },
        },
      },
      contact: {
        label: 'Contact Bar',
        bgDark: true,
        fields: {
          phone: { label: 'Phone number', type: 'text', fallback: '+44 (0) 2072062691' },
          mobile: { label: 'Mobile number', type: 'text', fallback: '+44 (0) 7413041372' },
          email: { label: 'Email address', type: 'text', fallback: 'info@midaspropertyauctions.co.uk' },
          hours: { label: 'Opening hours', type: 'text', fallback: 'Mon to Fri: 9.00 to 18.00' },
        },
      },
      newsletter: {
        label: 'Newsletter Section',
        fields: {
          heading: { label: 'Heading', type: 'text', fallback: 'JOIN OUR MAILING LIST' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'Be the first to hear about new lots, auction dates and exclusive investment opportunities.', multiline: true },
        },
      },
      cta: {
        label: 'CTA Banner',
        bgDark: true,
        fields: {
          text: { label: 'Banner text', type: 'text', fallback: 'WE CAN ASSIST YOU WITH ALL YOUR PROPERTY INVESTMENT NEEDS' },
          sub: { label: 'Sub text', type: 'text', fallback: 'LET US KNOW HOW WE CAN HELP' },
        },
      },
    },
  },
  about: {
    label: 'About Us',
    sections: {
      hero: {
        label: 'Page Hero',
        fields: {
          eyebrow: { label: 'Eyebrow', type: 'text', fallback: 'About Midas' },
          title: { label: 'Page title', type: 'text', fallback: '15+ Years at the Heart of UK Property Auctions' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'Built on expertise, trust, and an unrivalled investor network.', multiline: true },
        },
      },
      who_we_are: {
        label: 'Who We Are',
        fields: {
          eyebrow: { label: 'Eyebrow', type: 'text', fallback: 'Who We Are' },
          title: { label: 'Heading', type: 'text', fallback: 'A Team of Dedicated Experts' },
          tagline: { label: 'Tagline', type: 'text', fallback: "That's The Midas Touch" },
          para_1: { label: 'Paragraph 1', type: 'textarea', fallback: 'At Midas Property Group, we focus on ensuring we deliver a professional service for each of our clients.', multiline: true },
          para_2: { label: 'Paragraph 2', type: 'textarea', fallback: 'Our team has a drive and a vision to help Midas Property Group become one of the leaders in our industry.', multiline: true },
          para_3: { label: 'Paragraph 3', type: 'textarea', fallback: 'We strive to work with clients who want to invest in property.', multiline: true },
        },
      },
      how_we_do_it: {
        label: 'How We Do It',
        fields: {
          para_1: { label: 'Paragraph 1', type: 'textarea', fallback: 'We have a strong ethos and a desire to provide a turn-key solution.', multiline: true },
          para_2: { label: 'Paragraph 2', type: 'textarea', fallback: 'Due diligence and research are part of what we do.', multiline: true },
        },
      },
    },
  },
  contact: {
    label: 'Contact Page',
    sections: {
      hero: {
        label: 'Page Hero',
        fields: {
          title: { label: 'Page title', type: 'text', fallback: 'Get in Touch' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'We respond within 24 hours. Call Sam directly for urgent enquiries.', multiline: true },
        },
      },
      info: {
        label: 'Contact Details',
        fields: {
          address: { label: 'Address', type: 'textarea', fallback: 'Stanmore Business and Innovation Centre, Stanmore Place, Honeypot Lane, London HA7 1BT', multiline: true },
          phone: { label: 'Phone', type: 'text', fallback: '+44 (0) 2072062691' },
          mobile: { label: 'Mobile (Sam)', type: 'text', fallback: '+44 (0) 7413041372' },
          email: { label: 'Email', type: 'text', fallback: 'info@midaspropertyauctions.co.uk' },
          hours: { label: 'Hours', type: 'text', fallback: 'Mon to Fri: 9.00am to 6.00pm' },
        },
      },
    },
  },
  sell: {
    label: 'Sell Property',
    sections: {
      hero: {
        label: 'Page Hero',
        bgDark: true,
        fields: {
          eyebrow: { label: 'Eyebrow', type: 'text', fallback: 'SELL WITH MIDAS' },
          title: { label: 'Page title', type: 'text', fallback: 'Sell Your Property at Auction' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'Free to list. No upfront fees. Sell in as little as 28 days.', multiline: true },
        },
      },
      why: {
        label: 'Why Sell With Us',
        fields: {
          heading: { label: 'Heading', type: 'text', fallback: 'Why Sell With Midas?' },
          point_1: { label: 'Point 1', type: 'text', fallback: 'Free to list. No upfront fees or charges.' },
          point_2: { label: 'Point 2', type: 'text', fallback: '2,847 active investors ready to buy.' },
          point_3: { label: 'Point 3', type: 'text', fallback: 'Exchange on auction day. Complete in 28 days.' },
          point_4: { label: 'Point 4', type: 'text', fallback: 'Legal pack prepared and managed for you.' },
        },
      },
    },
  },
  buy: {
    label: 'Buy Property',
    sections: {
      hero: {
        label: 'Page Hero',
        bgDark: true,
        fields: {
          eyebrow: { label: 'Eyebrow', type: 'text', fallback: 'BUY WITH MIDAS' },
          title: { label: 'Page title', type: 'text', fallback: 'Buy Property at Auction' },
          subtitle: { label: 'Subtitle', type: 'textarea', fallback: 'Residential, HMO, commercial and development properties across London, Essex and nationwide.', multiline: true },
        },
      },
      intro: {
        label: 'Introduction',
        fields: {
          heading: { label: 'Heading', type: 'text', fallback: 'How It Works' },
          para: { label: 'Paragraph', type: 'textarea', fallback: 'Buying at auction with Midas is straightforward. Browse our current lots, register to bid, and compete on auction day.', multiline: true },
        },
      },
    },
  },
}
