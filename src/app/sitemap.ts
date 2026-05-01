import { type MetadataRoute } from 'next'

const BASE = 'https://www.midaspropertyauctions.co.uk'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/current-auction`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/timed-auction`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/auction-dates`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/lots-still-available`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/past-auctions`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/buy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/sell`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/valuation`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/instant-offer`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/finance`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/off-market`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/probate`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/private-treaty`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/alternative-investments`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/events`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/testimonials`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/faqs`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/guide/buying`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/guide/selling`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/guide/buying-timed`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/guide/selling-timed`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/aml`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/conditions`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/complaints`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/wishlist`, lastModified: now, changeFrequency: 'never', priority: 0.3 },
    { url: `${BASE}/yielding-investments`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/compare`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const blogSlugs = [
    'buying-first-property-at-auction',
    'london-hmo-market-report-2026',
    'bridging-finance-guide-auction-buyers',
    'good-hmo-investment-2026',
  ]

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages]
}
