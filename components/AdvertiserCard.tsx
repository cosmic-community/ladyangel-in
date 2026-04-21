import Link from 'next/link'
import { Advertiser } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AdvertiserCard({ advertiser }: { advertiser: Advertiser }) {
  const avatar = advertiser.metadata?.avatar?.imgix_url
  const name = getMetafieldValue(advertiser.metadata?.full_name) || advertiser.title
  const handle = getMetafieldValue(advertiser.metadata?.handle)
  const bio = getMetafieldValue(advertiser.metadata?.bio)
  const city = getMetafieldValue(advertiser.metadata?.city)
  const verified = advertiser.metadata?.verified

  return (
    <Link href={`/advertisers/${advertiser.slug}`} className="block card-hover">
      <div className="bg-white rounded-2xl p-6 border border-rose-100 shadow-sm h-full">
        <div className="flex items-start gap-4">
          {avatar ? (
            <img
              src={`${avatar}?w=160&h=160&fit=crop&auto=format,compress`}
              alt={name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-rose-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-2xl">👤</div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-gray-900 truncate">{name}</h3>
              {verified && <span className="text-rose-500 text-sm">✓</span>}
            </div>
            {handle && <p className="text-sm text-rose-600">@{handle}</p>}
            {city && <p className="text-xs text-gray-500 mt-1">📍 {city}</p>}
          </div>
        </div>
        {bio && <p className="text-sm text-gray-600 mt-3 line-clamp-2">{bio}</p>}
      </div>
    </Link>
  )
}