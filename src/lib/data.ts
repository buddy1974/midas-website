export type LotStatus = 'legal_pack' | 'live' | 'sourcing' | 'unsold'

export interface LotImage {
  url: string
  caption?: string
}

export interface LotEmbed {
  url: string
  title?: string
}

export interface Lot {
  id: string
  address: string
  area: string
  type: string
  bedrooms: number
  guidePrice: number
  arv: number
  status: LotStatus
  description: string
  features: string[]
  auctionDate: string
  auctionTime: string
  isOffMarket: boolean
  showOnWebsite: boolean
  postcode: string
  imageUrl?: string
  images?: LotImage[]
  embeds?: LotEmbed[]
  videoUrl?: string
}

// ── LOTS ──────────────────────────────────────────────────────────────────────

export const lots: Lot[] = [
  {
    id: '1',
    address: '202A Bennetts Castle Lane',
    area: 'Dagenham, RM8 3XP',
    type: 'Residential Flat',
    bedrooms: 2,
    guidePrice: 160000,
    arv: 215000,
    status: 'legal_pack',
    description:
      'A vacant two-bedroom first-floor flat with planning permission to add a third bedroom via loft conversion. The property offers immediate vacant possession and the vendor has indicated openness to creative finance structures including delayed completion and vendor finance. Legal pack available now. Viewing by appointment.',
    features: [
      'Planning Permission for Loft Conversion',
      'Creative Finance Available',
      'Vacant Possession',
      'Legal Pack Ready',
      'First Floor Flat',
      'Dagenham Town Centre Location',
    ],
    auctionDate: '14 May 2026',
    auctionTime: '12:00pm',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'RM8',
  },
  {
    id: '2',
    address: '5 Weald Lane',
    area: 'Harrow, HA3 5EU',
    type: 'HMO',
    bedrooms: 9,
    guidePrice: 895000,
    arv: 950000,
    status: 'legal_pack',
    description:
      'A fully licensed nine-room House in Multiple Occupation producing a verified gross income of £123,600 per annum across all rooms. The property benefits from off-street parking for three vehicles and a 100ft rear garden. All rooms are currently occupied on individual Assured Shorthold Tenancies. Full HMO licence in place. Legal pack available for immediate inspection.',
    features: [
      'Fully Licensed HMO',
      '£123,600/yr Verified Income',
      '9 Rooms, All Occupied',
      'Off-Street Parking (3 cars)',
      '100ft Rear Garden',
      'AST Tenancies in Place',
    ],
    auctionDate: '14 May 2026',
    auctionTime: '12:00pm',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'HA3',
  },
  {
    id: '3',
    address: '88 Ripple Road',
    area: 'Barking, IG11 7NS',
    type: 'HMO',
    bedrooms: 6,
    guidePrice: 310000,
    arv: 365000,
    status: 'live',
    description:
      'A six-bedroom licensed HMO in a prime Barking location with excellent transport links to central London. Strong rental demand in the area with HMO rooms consistently achieving £650 to £750 per month. The property is well-maintained and fully compliant. Ideal for experienced HMO investors looking to expand their portfolio.',
    features: [
      'Live Auction. Bid Now.',
      'Licensed 6-Room HMO',
      'Strong Rental Demand',
      'Excellent Transport Links',
      'Barking Town Centre',
      'Compliant and Well-Maintained',
    ],
    auctionDate: '14 May 2026',
    auctionTime: '12:00pm',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'IG11',
  },
  {
    id: '4',
    address: '45 Church Elm Lane',
    area: 'Dagenham, RM10 9RN',
    type: 'Terraced House',
    bedrooms: 3,
    guidePrice: 175000,
    arv: 220000,
    status: 'live',
    description:
      'A three-bedroom mid-terraced house in a well-established residential street in Dagenham. The property requires modernisation throughout and represents an excellent opportunity for buy-to-let investors or developers looking for a straightforward refurbishment project. Strong local rental demand with comparable lets achieving £1,400 to £1,600 per month.',
    features: [
      'Live Auction. Bid Now.',
      '3 Bedrooms',
      'Refurbishment Opportunity',
      'BTL Potential, £1,400+/mo',
      'Established Residential Street',
      'Good Transport Links',
    ],
    auctionDate: '14 May 2026',
    auctionTime: '12:00pm',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'RM10',
  },
  {
    id: '5',
    address: 'Unit 4, Martell Road',
    area: 'Tulse Hill, SE21 8EN',
    type: 'Commercial',
    bedrooms: 0,
    guidePrice: 420000,
    arv: 530000,
    status: 'legal_pack',
    description:
      'A ground-floor commercial unit with first-floor storage and ancillary accommodation, totalling approximately 2,200 sq ft. The property has potential for residential conversion subject to the necessary planning consents. Located in a mixed-use area with strong demand from both occupiers and investors. Previously used as light industrial. Legal pack available.',
    features: [
      'Commercial Unit',
      'Conversion Potential',
      'Ground and First Floor, c.2,200 sq ft',
      'Mixed-Use Area',
      'Strong Investor Demand',
      'Legal Pack Available',
    ],
    auctionDate: '14 May 2026',
    auctionTime: '12:00pm',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'SE21',
  },
  {
    id: '6',
    address: '14A Green Lane',
    area: 'Newham, E13 7PH',
    type: 'HMO',
    bedrooms: 5,
    guidePrice: 285000,
    arv: 340000,
    status: 'sourcing',
    description:
      'A five-bedroom property in Newham with strong HMO potential. The area benefits from significant regeneration investment and excellent transport connectivity including Elizabeth Line access nearby. The property would suit an investor looking to convert and operate as a licensed HMO. Comparable HMO rooms in the area achieve £650 to £750 per month.',
    features: [
      'HMO Conversion Potential',
      '5 Bedrooms',
      'Elizabeth Line Nearby',
      'Newham Regeneration Area',
      'Strong Rental Demand',
      'Good Yield Potential',
    ],
    auctionDate: 'Coming Soon',
    auctionTime: '',
    isOffMarket: false,
    showOnWebsite: true,
    postcode: 'E13',
  },
  // Off-market lots
  {
    id: '7',
    address: '38 Headstone Drive',
    area: 'Harrow, HA3 5QH',
    type: 'Detached House',
    bedrooms: 5,
    guidePrice: 620000,
    arv: 760000,
    status: 'sourcing',
    description:
      'A substantial five-bedroom detached property in a premier Harrow location. Motivated vendor seeking a discreet, swift transaction. Significant below-market-value opportunity for a well-funded investor. Full legal pack and structural survey available on request. Viewings strictly by appointment to pre-qualified investors only.',
    features: [
      'Off-Market Opportunity',
      'Below Market Value',
      'Motivated Vendor',
      'Detached, 5 Bedrooms',
      'Premier Harrow Location',
      'Pre-Qualified Investors Only',
    ],
    auctionDate: 'Private Sale',
    auctionTime: '',
    isOffMarket: true,
    showOnWebsite: false,
    postcode: 'HA3',
  },
  {
    id: '8',
    address: 'Portfolio: 3 x BTL',
    area: 'Barking & Dagenham',
    type: 'Portfolio',
    bedrooms: 9,
    guidePrice: 510000,
    arv: 640000,
    status: 'sourcing',
    description:
      'A portfolio of three tenanted buy-to-let properties in the London Borough of Barking and Dagenham. Combined annual rental income of £43,200. All properties on ASTs with existing tenants in situ. Available as a portfolio only. Ideal for an investor seeking immediate income. Full details available to registered off-market investors.',
    features: [
      'Portfolio of 3 Properties',
      'Tenants in Situ',
      '£43,200/yr Combined Income',
      'Available as Portfolio Only',
      'Immediate Rental Income',
      'Off-Market',
    ],
    auctionDate: 'Private Sale',
    auctionTime: '',
    isOffMarket: true,
    showOnWebsite: false,
    postcode: 'RM9',
  },
]

// ── MARKET DATA ───────────────────────────────────────────────────────────────

export const marketData: Record<
  string,
  {
    avgPrice: string
    yoyChange: string
    positive: boolean
    avgDaysOnMarket: number
    rentalDemand: string
    avgRent: string
    hmoRooms?: string
  }
> = {
  RM8: {
    avgPrice: '£285,000',
    yoyChange: '+4.2%',
    positive: true,
    avgDaysOnMarket: 67,
    rentalDemand: 'High',
    avgRent: '£1,450/mo',
    hmoRooms: '£650 to £720/room',
  },
  RM9: {
    avgPrice: '£291,000',
    yoyChange: '+3.9%',
    positive: true,
    avgDaysOnMarket: 71,
    rentalDemand: 'High',
    avgRent: '£1,400/mo',
    hmoRooms: '£640 to £700/room',
  },
  RM10: {
    avgPrice: '£278,000',
    yoyChange: '+4.5%',
    positive: true,
    avgDaysOnMarket: 63,
    rentalDemand: 'High',
    avgRent: '£1,380/mo',
    hmoRooms: '£620 to £690/room',
  },
  HA1: {
    avgPrice: '£438,000',
    yoyChange: '+3.6%',
    positive: true,
    avgDaysOnMarket: 48,
    rentalDemand: 'Very High',
    avgRent: '£1,850/mo',
    hmoRooms: '£780 to £880/room',
  },
  HA2: {
    avgPrice: '£375,000',
    yoyChange: '+3.4%',
    positive: true,
    avgDaysOnMarket: 54,
    rentalDemand: 'High',
    avgRent: '£1,620/mo',
    hmoRooms: '£700 to £780/room',
  },
  HA3: {
    avgPrice: '£412,000',
    yoyChange: '+3.8%',
    positive: true,
    avgDaysOnMarket: 52,
    rentalDemand: 'Very High',
    avgRent: '£1,750/mo',
    hmoRooms: '£750 to £850/room',
  },
  HA7: {
    avgPrice: '£445,000',
    yoyChange: '+3.2%',
    positive: true,
    avgDaysOnMarket: 55,
    rentalDemand: 'High',
    avgRent: '£1,680/mo',
    hmoRooms: '£720 to £800/room',
  },
  IG11: {
    avgPrice: '£334,000',
    yoyChange: '+5.1%',
    positive: true,
    avgDaysOnMarket: 58,
    rentalDemand: 'Very High',
    avgRent: '£1,550/mo',
    hmoRooms: '£680 to £760/room',
  },
  E13: {
    avgPrice: '£378,000',
    yoyChange: '+6.2%',
    positive: true,
    avgDaysOnMarket: 44,
    rentalDemand: 'Exceptional',
    avgRent: '£1,900/mo',
    hmoRooms: '£750 to £850/room',
  },
  NW10: {
    avgPrice: '£510,000',
    yoyChange: '+2.9%',
    positive: true,
    avgDaysOnMarket: 44,
    rentalDemand: 'Very High',
    avgRent: '£2,050/mo',
    hmoRooms: '£820 to £920/room',
  },
  SE21: {
    avgPrice: '£524,000',
    yoyChange: '+2.9%',
    positive: true,
    avgDaysOnMarket: 55,
    rentalDemand: 'High',
    avgRent: '£2,100/mo',
    hmoRooms: '£820 to £950/room',
  },
  SE22: {
    avgPrice: '£685,000',
    yoyChange: '+2.7%',
    positive: true,
    avgDaysOnMarket: 38,
    rentalDemand: 'High',
    avgRent: '£2,400/mo',
    hmoRooms: '£900 to £1,050/room',
  },
}

// ── TEAM ──────────────────────────────────────────────────────────────────────

export interface TeamMember {
  name: string
  role: string
  initials: string
  bio: string
  linkedin?: string
  phone?: string
}

export const team: TeamMember[] = [
  {
    name: 'Sam Fongho',
    role: 'CEO & Auction Director',
    initials: 'SF',
    bio: 'Sam has over 15 years of experience in UK property investment and auctions. A former Senior IT Consultant to Goldman Sachs, JP Morgan and CitiBank, Sam founded Midas Property Group in 2015 to bring professional, data-driven property auction services to London and Essex investors. He works with a network of established UK auction companies to ensure every property reaches the widest possible pool of committed buyers. Sam holds an undergraduate degree from Keele University and a postgraduate MSc from Westminster University.',
    linkedin: 'https://www.linkedin.com/in/sam-fongho-a33963a/',
    phone: '07454 753318',
  },
  // Removed per Sam — 4 May 2026
  // Old staff — Sam to provide new team details
  // { name: 'Sara Williams', role: 'Head of Investor Relations', initials: 'SW', bio: '...', linkedin: '#' },
  // { name: 'Aarti Sawhney', role: 'Acquisitions & Finance Director', initials: 'AS', bio: '...', linkedin: '#' },
  // { name: 'Chris Ola', role: 'Operations Manager', initials: 'CO', bio: '...', linkedin: '#' },
  // { name: 'Queen Igwe', role: 'Real Estate Consultant', initials: 'QI', bio: '...', linkedin: '#' },
  // { name: 'Collins', role: 'Business Development', initials: 'CO', bio: '...', linkedin: '#' },
]

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────

export interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    name: 'James W.',
    location: 'London Property Investor',
    text: "Sam's knowledge of the auction market is second to none. I have purchased three HMOs through Midas in the last 18 months, all below market value, all producing strong yields from day one. The off-market access alone has been worth more than I can put a number on.",
    rating: 5,
  },
  {
    name: 'Patricia M.',
    location: 'Essex Landlord & Portfolio Investor',
    text: 'I instructed Midas to sell my portfolio of four buy-to-let properties and achieved above guide price on all of them. The process was smooth, professional and Sam kept me informed at every stage. I would not use anyone else for auction disposals in London.',
    rating: 5,
  },
  {
    name: 'Ibrahim H.',
    location: 'Developer, North West London',
    text: 'The private lending facility Midas introduced me to was game-changing. When I needed short-term bridging to complete an auction purchase, Sam had terms on the table within 48 hours. That kind of speed and access is why I keep coming back.',
    rating: 5,
  },
  {
    name: 'Angela C.',
    location: 'Commercial Investor',
    text: 'I have attended many property networking events in London but the Midas events are in a different league. The quality of the speakers, the calibre of the attendees and the practical knowledge shared make them genuinely worth attending. Highly recommend.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    location: 'HMO Investor, Harrow',
    text: "Sam sourced three HMO properties for me in Harrow over 18 months. Every deal was exactly what he said it would be: licensed, compliant and cash flowing from day one. The off-market access is something you simply cannot get anywhere else.",
    rating: 5,
  },
  {
    name: 'Diane O.',
    location: 'Probate Vendor, Essex',
    text: "I needed to sell my late mother's property quickly and without stress. Sam handled everything professionally and sensitively. The property sold at the first auction above the guide price. I cannot recommend Midas highly enough.",
    rating: 5,
  },
  {
    name: 'Kwame A.',
    location: 'First Time Investor, London',
    text: "As a first-time auction buyer I was nervous about the process. Sam and the team walked me through everything: the legal pack, the finance, the bidding. I bought my first BTL below market value and it has been tenanted ever since.",
    rating: 5,
  },
  {
    name: 'Rachel S.',
    location: 'Portfolio Landlord',
    text: "I use Midas for all my auction acquisitions now. The bridging finance connections saved me twice when I needed to complete quickly. The AI deal analysis on the website is genuinely useful for quick initial screening.",
    rating: 5,
  },
]

// ── AUCTIONS ──────────────────────────────────────────────────────────────────

export const upcomingAuctions = [
  {
    id: 'spring-2026',
    title: 'May Auction Event 2026',
    date: '14 May 2026',
    time: '12:00pm',
    format: 'Online Live Stream',
    lots: 12,
    status: 'Registrations Open',
    description:
      'Our Spring 2026 auction features twelve lots across London and Essex including HMOs, residential flats, commercial units and development sites. All legal packs available now. Register to bid and receive your bidder number before auction day.',
  },
  {
    id: 'summer-2026',
    title: 'June Auction Event 2026',
    date: '25 June 2026',
    time: '12:00pm',
    format: 'Online Live Stream',
    lots: 0,
    status: 'Accepting Instructions',
    description:
      'Our Summer 2026 auction is now accepting vendor instructions. Properties submitted by 28 May will be included in the catalogue. Contact us for a free valuation and auction strategy consultation.',
  },
]

export const pastAuctions = [
  {
    title: 'Midas Winter Auction 2025',
    date: '10 December 2025',
    lots: 14,
    sold: 14,
    totalRaised: '£4,820,000',
  },
  {
    title: 'Midas Autumn Auction 2025',
    date: '15 October 2025',
    lots: 11,
    sold: 10,
    totalRaised: '£3,240,000',
  },
  {
    title: 'Midas Summer Auction 2025',
    date: '18 June 2025',
    lots: 9,
    sold: 9,
    totalRaised: '£2,870,000',
  },
  {
    title: 'Midas Spring Auction 2025',
    date: '14 April 2025',
    lots: 13,
    sold: 12,
    totalRaised: '£3,950,000',
  },
]

// ── STATS ─────────────────────────────────────────────────────────────────────

export const stats = [
  { label: 'Properties Sold', value: '340+' },
  { label: 'Active Investors', value: '2,847' },
  { label: 'Years in Auctions', value: '15+' },
]

// ── SERVICES ──────────────────────────────────────────────────────────────────

export const services = [
  {
    icon: '🔨',
    title: 'Auction Acquisitions',
    description:
      'We source, list and sell residential, commercial and HMO properties at auction across London and Essex. Our database of 2,847 active investors ensures maximum exposure and competitive bidding on every lot.',
  },
  {
    icon: '📋',
    title: 'Property Sourcing',
    description:
      'We identify below-market-value and off-market opportunities for investors with specific criteria. From individual BTLs to large HMO portfolios, we source deals that are not available on the open market.',
  },
  {
    icon: '💼',
    title: 'Investment Consultancy',
    description:
      'Sam Fongho and the Midas team provide tailored investment consultancy covering deal analysis, portfolio strategy, creative finance structuring, JV partnerships and exit planning.',
  },
  {
    icon: '🏦',
    title: 'Bridging Finance',
    description:
      'Through our network of private lenders and finance partners, we help buyers arrange fast bridging finance for auction purchases. Terms can be issued within 24 hours for qualifying transactions.',
  },
  {
    icon: '🌍',
    title: 'International Investors',
    description:
      'We work with investors from across the world looking to acquire UK property. Our services include Tier 1 Investment Visa support, offshore mortgage advisory and international relocation assistance.',
  },
  {
    icon: '📊',
    title: 'Portfolio Management',
    description:
      'For investors with existing portfolios, we provide professional portfolio review, yield analysis, refinancing strategy and disposal services to maximise the performance of your property assets.',
  },
]

// ── BLOG POSTS ────────────────────────────────────────────────────────────────

export interface BlogPost {
  title: string
  category: string
  date: string
  excerpt: string
  slug: string
  content?: string
}

export const blogPosts: BlogPost[] = [
  {
    title: 'How to Buy Your First Property at Auction',
    category: 'Guide',
    date: '18 April 2026',
    excerpt:
      'Buying at auction for the first time can feel daunting. In this guide we break down everything you need to know, from reading legal packs to registering to bid.',
    slug: 'buying-first-property-at-auction',
  },
  {
    title: 'London HMO Market Report 2026',
    category: 'Market Report',
    date: '10 April 2026',
    excerpt:
      'HMO yields in London remain among the strongest in the UK. This report covers demand trends, licensing updates and the best boroughs for HMO investment.',
    slug: 'london-hmo-market-report-2026',
  },
  {
    title: 'Bridging Finance Explained: A Guide for Auction Buyers',
    category: 'Finance',
    date: '2 April 2026',
    excerpt:
      'Most auction purchases complete in 28 days. Too fast for a standard mortgage. Here is everything you need to know about bridging finance and how to arrange it quickly.',
    slug: 'bridging-finance-guide-auction-buyers',
  },
  {
    title: 'What Makes a Good HMO Investment in 2026?',
    category: 'Investment',
    date: '25 March 2026',
    excerpt:
      'Not every HMO is a good investment. In this guide we cover the key criteria: location, licensing, room size, yield calculation and common pitfalls to avoid.',
    slug: 'good-hmo-investment-2026',
  },
]

// ── PRINCIPLES ────────────────────────────────────────────────────────────────

export const principles = [
  { title: 'Speed & Certainty', description: 'We deliver fast, legally binding sales. When the hammer falls, contracts exchange immediately. No chains, no fall-throughs, no delays.' },
  { title: 'Transparency', description: 'Every lot is fully disclosed. Legal packs, guide prices and viewing information available before you bid.' },
  { title: 'Maximum Exposure', description: 'Your property reaches 2,847 active investors through email, WhatsApp and social media campaigns on day one.' },
  { title: 'Professional Excellence', description: 'Sam Fongho brings over 15 years of hands-on auction experience, working across a network of established UK auction companies.' },
  { title: 'Client-First Approach', description: 'We stand in the middle, representing both buyers and sellers with equal professionalism.' },
]

// ── SERVICE NAMES ─────────────────────────────────────────────────────────────

export const serviceNames = [
  'Auction Sales & Acquisitions',
  'Off-Market Property',
  'Buy-to-Let Investments',
  'HMO Properties',
  'Commercial Property',
  'Probate Property Sales',
  'Bridging Finance',
  'Property Valuation',
  'Investment Consultancy',
  'Alternative Investments',
]

// ── ACCREDITATIONS ────────────────────────────────────────────────────────────

export const accreditations = [
  'The Property Ombudsman',
  'MPG, Midas Property Group',
  'Megamound Partner',
  'HomeLet Accredited',
  'TSI Approved Code',
]

// ── STATIC EVENTS ─────────────────────────────────────────────────────────────

export interface StaticEvent {
  day: string
  month: string
  year: string
  title: string
  excerpt: string
  href: string
}

export const staticEvents: StaticEvent[] = [
  { day: '14', month: 'MAY', year: '2026', title: 'Next Auction Event, May 2026', excerpt: 'Properties going to auction through our partner auction companies. Register to bid by 13th May.', href: '/current-auction' },
  { day: '25', month: 'JUN', year: '2026', title: 'June Auction Event 2026', excerpt: 'Now accepting vendor instructions. Submit your property by 28th May.', href: '/auction-dates' },
  { day: '10', month: 'MAY', year: '2026', title: 'Midas Investor Networking Evening', excerpt: 'Monthly networking event for property investors, developers and landlords in London.', href: '/events' },
  { day: '30', month: 'APR', year: '2026', title: 'HMO Investment Strategy Webinar', excerpt: 'Online webinar covering HMO licensing, yields and the London market in 2026.', href: '/events' },
]

// ── COMPANY ───────────────────────────────────────────────────────────────────

export const company = {
  name: 'Midas Property Auctions',
  fullName: 'Midas Property Group Ltd',
  tagline: 'Where committed buyers meet committed sellers.',
  companyNo: '09522321',
  vatNo: '228005634',
  address: {
    line1: 'Stanmore Business & Innovation Centre',
    line2: 'Stanmore Place, Honeypot Lane',
    city: 'London',
    postcode: 'HA7 1BT',
    full: 'Stanmore Business & Innovation Centre, Stanmore Place, Honeypot Lane, London HA7 1BT',
  },
  phone: '+44 207 206 2691',
  mobile: '07454 753318',
  email: 'info@midaspropertyauctions.co.uk',
  samEmail: 'Sam@MidasPropertyAuctions.co.uk',
  website: 'www.midaspropertyauctions.co.uk',
  hours: 'Monday to Friday: 9:00am to 6:00pm · Saturday: 10:00am to 2:00pm',
  sellerFee: 'Free. No charge to list with Midas.',
  auctionPartners: 'We work with multiple established UK auction companies',
  social: {
    facebook: 'https://www.facebook.com/MidasPropertyGroupUK/',
    instagram: 'https://www.instagram.com/midas_property_auctions/',
    linkedin: 'https://www.linkedin.com/in/sam-fongho-a33963a/',
  },
  accreditations: [
    'The Property Ombudsman',
    'Trading Standards Institute (TSI) Code',
    'Megamound Partner',
  ],
}
