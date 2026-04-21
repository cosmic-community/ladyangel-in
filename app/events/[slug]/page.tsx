// app/events/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOne, getMetafieldValue } from '@/lib/cosmic'
import { Event } from '@/types'

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getOne<Event>('events', slug)
  if (!event) notFound()

  const image = event.metadata?.event_image?.imgix_url
  const title = getMetafieldValue(event.metadata?.title) || event.title
  const description = getMetafieldValue(event.metadata?.description)
  const date = getMetafieldValue(event.metadata?.event_date)
  const venue = getMetafieldValue(event.metadata?.venue)
  const city = getMetafieldValue(event.metadata?.city)
  const price = getMetafieldValue(event.metadata?.ticket_price)
  const regUrl = getMetafieldValue(event.metadata?.registration_url)
  const organiser = event.metadata?.organiser

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : ''

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {image && <img src={`${image}?w=1600&h=900&fit=crop&auto=format,compress`} alt={title} className="w-full h-64 md:h-96 object-cover rounded-3xl mb-8" />}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>

      <div className="grid md:grid-cols-2 gap-4 bg-rose-50 rounded-2xl p-6 mb-8">
        {formattedDate && <InfoRow icon="📅" label="Date" value={formattedDate} />}
        {venue && <InfoRow icon="🏛️" label="Venue" value={venue} />}
        {city && <InfoRow icon="📍" label="City" value={city} />}
        {price && <InfoRow icon="🎟️" label="Price" value={price} />}
      </div>

      {description && <p className="text-lg text-gray-700 whitespace-pre-line mb-8">{description}</p>}

      {regUrl && (
        <a href={regUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-rose-600 text-white rounded-full font-semibold hover:bg-rose-700 shadow-lg">
          Register Now →
        </a>
      )}

      {organiser && (
        <Link href={`/advertisers/${organiser.slug}`} className="mt-8 inline-flex items-center gap-3 bg-white border border-rose-100 rounded-2xl p-4 hover:shadow-md transition">
          <div>
            <p className="text-sm text-gray-600">Organised by</p>
            <p className="font-semibold text-rose-700">{organiser.title}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{icon} {label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  )
}