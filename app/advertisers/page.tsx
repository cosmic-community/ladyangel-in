import AdvertiserCard from '@/components/AdvertiserCard'
import { getAll } from '@/lib/cosmic'
import { Advertiser } from '@/types'

export const metadata = { title: 'Advertisers – LadyAngel • IN' }

export default async function AdvertisersPage() {
  const advertisers = await getAll<Advertiser>('advertisers')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Advertisers</h1>
        <p className="text-gray-600">Meet the independent women behind the community.</p>
      </div>
      {advertisers.length === 0 ? (
        <p className="text-gray-500">No advertisers yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {advertisers.map(a => <AdvertiserCard key={a.id} advertiser={a} />)}
        </div>
      )}
    </div>
  )
}