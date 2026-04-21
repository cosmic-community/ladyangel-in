import ListingCard from '@/components/ListingCard'
import { getAll } from '@/lib/cosmic'
import { Listing } from '@/types'

export const metadata = { title: 'Listings – LadyAngel • IN' }

export default async function ListingsPage() {
  const listings = await getAll<Listing>('listings')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Listings</h1>
        <p className="text-gray-600">Businesses and services from independent women.</p>
      </div>
      {listings.length === 0 ? (
        <p className="text-gray-500">No listings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map(l => <ListingCard key={l.id} listing={l} />)}
        </div>
      )}
    </div>
  )
}