import Link from 'next/link'
import { Listing } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ListingCard({ listing }: { listing: Listing }) {
  const image = listing.metadata?.featured_image?.imgix_url
  const title = getMetafieldValue(listing.metadata?.title) || listing.title
  const price = getMetafieldValue(listing.metadata?.price)
  const location = getMetafieldValue(listing.metadata?.location)
  const featured = listing.metadata?.featured

  return (
    <Link href={`/listings/${listing.slug}`} className="block card-hover">
      <div className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm h-full">
        {image ? (
          <div className="relative h-48 overflow-hidden">
            <img
              src={`${image}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
            {featured && (
              <span className="absolute top-3 left-3 px-2 py-1 bg-rose-600 text-white text-xs font-semibold rounded-full">
                ⭐ Featured
              </span>
            )}
          </div>
        ) : (
          <div className="h-48 gradient-bg flex items-center justify-center text-5xl">🏢</div>
        )}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center justify-between mt-3">
            {price && <span className="text-rose-600 font-semibold">{price}</span>}
            {location && <span className="text-xs text-gray-500">📍 {location}</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}