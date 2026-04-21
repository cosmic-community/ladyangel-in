import GalleryCard from '@/components/GalleryCard'
import { getAll } from '@/lib/cosmic'
import { GalleryPost } from '@/types'

export const metadata = { title: 'Gallery – LadyAngel • IN' }

export default async function GalleryPage() {
  const posts = await getAll<GalleryPost>('gallery-posts')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Gallery</h1>
        <p className="text-gray-600">Photos and videos from our community.</p>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500">No gallery posts yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(p => <GalleryCard key={p.id} post={p} />)}
        </div>
      )}
    </div>
  )
}