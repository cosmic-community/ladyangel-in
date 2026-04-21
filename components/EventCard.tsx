import Link from 'next/link'
import { Event } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function EventCard({ event }: { event: Event }) {
  const image = event.metadata?.event_image?.imgix_url
  const title = getMetafieldValue(event.metadata?.title) || event.title
  const date = getMetafieldValue(event.metadata?.event_date)
  const venue = getMetafieldValue(event.metadata?.venue)
  const city = getMetafieldValue(event.metadata?.city)
  const price = getMetafieldValue(event.metadata?.ticket_price)

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  }) : ''

  return (
    <Link href={`/events/${event.slug}`} className="block card-hover">
      <div className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm h-full">
        {image ? (
          <div className="relative h-44 overflow-hidden">
            <img
              src={`${image}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
            {formattedDate && (
              <div className="absolute top-3 left-3 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700">
                📅 {formattedDate}
              </div>
            )}
          </div>
        ) : (
          <div className="h-44 gradient-bg flex items-center justify-center text-5xl">📅</div>
        )}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{title}</h3>
          {(venue || city) && <p className="text-sm text-gray-600 mt-2">📍 {[venue, city].filter(Boolean).join(', ')}</p>}
          {price && <p className="text-sm text-rose-600 font-semibold mt-2">{price}</p>}
        </div>
      </div>
    </Link>
  )
}