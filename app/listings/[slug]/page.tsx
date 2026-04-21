// app/listings/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOne, getMetafieldValue } from '@/lib/cosmic'
import { Listing } from '@/types'

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = await getOne<Listing>('listings', slug)
  if (!listing) notFound()

  const image = listing.metadata?.featured_image?.imgix_url
  const title = getMetafieldValue(listing.metadata?.title) || listing.title
  const description = getMetafieldValue(listing.metadata?.description)
  const price = getMetafieldValue(listing.metadata?.price)
  const location = getMetafieldValue(listing.metadata?.location)
  const gallery = listing.metadata?.gallery || []
  const advertiser = listing.metadata?.advertiser
  const category = listing.metadata?.category

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {image && (
        <img src={`${image}?w=1600&h=900&fit=crop&auto=format,compress`} alt={title} className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8" />
      )}
      <div className="flex flex-wrap gap-3 mb-4">
        {category && <Link href={`/categories/${category.slug}`} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium">{category.title}</Link>}
        {price && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">{price}</span>}
        {location && <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">📍 {location}</span>}
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      {description && <p className="text-lg text-gray-700 mb-8 whitespace-pre-line">{description}</p>}

      {gallery.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {gallery.map((img, i) => (
            <img key={i} src={`${img.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`} alt="" className="rounded-2xl aspect-square object-cover" />
          ))}
        </div>
      )}

      {advertiser && (
        <Link href={`/advertisers/${advertiser.slug}`} className="inline-flex items-center gap-3 bg-rose-50 rounded-2xl p-4 hover:bg-rose-100 transition">
          {advertiser.metadata?.avatar?.imgix_url && (
            <img src={`${advertiser.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`} alt="" className="w-12 h-12 rounded-full" />
          )}
          <div>
            <p className="text-sm text-gray-600">Listed by</p>
            <p className="font-semibold">{advertiser.title}</p>
          </div>
        </Link>
      )}
    </div>
  )
}