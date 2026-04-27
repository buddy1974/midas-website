export interface MRIProperty {
  id: string
  address: string
  price: number
  type: string
  bedrooms: number
  status: string
  description: string
  images: string[]
}

export async function getMRIProperties(): Promise<MRIProperty[]> {
  try {
    const res = await fetch(
      'https://v4.salesandlettings.online/pls/midas/aspasia_search.html',
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return []
    const xml = await res.text()
    const properties: MRIProperty[] = []

    const propertyMatches = xml.matchAll(/<property[^>]*>([\s\S]*?)<\/property>/gi)

    for (const match of propertyMatches) {
      const block = match[1]
      const get = (tag: string) =>
        block.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`, 'i'))?.[1]?.trim() ?? ''

      const id = get('id') || get('ref')
      const address = get('address') || get('displayAddress')
      if (!address) continue

      properties.push({
        id,
        address,
        price: parseInt(get('price') || '0', 10),
        type: get('propertyType') || get('type'),
        bedrooms: parseInt(get('bedrooms') || '0', 10),
        status: get('status') || 'available',
        description: get('description') || get('summary'),
        images: [],
      })
    }

    return properties
  } catch {
    return []
  }
}
