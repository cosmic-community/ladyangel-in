import EventCard from '@/components/EventCard'
import { getAll } from '@/lib/cosmic'
import { Event } from '@/types'

export const metadata = { title: 'Events – LadyAngel • IN' }

export default async function EventsPage() {
  const events = await getAll<Event>('events')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Events</h1>
        <p className="text-gray-600">Upcoming gatherings, meetups, and experiences.</p>
      </div>
      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}
    </div>
  )
}