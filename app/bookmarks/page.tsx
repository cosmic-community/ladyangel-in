import BookmarkCard from '@/components/BookmarkCard'
import { getAll } from '@/lib/cosmic'
import { Bookmark } from '@/types'

export const metadata = { title: 'Bookmarks – LadyAngel • IN' }

export default async function BookmarksPage() {
  const bookmarks = await getAll<Bookmark>('bookmarks')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Bookmarks</h1>
        <p className="text-gray-600">Curated links from the community.</p>
      </div>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookmarks.map(b => <BookmarkCard key={b.id} bookmark={b} />)}
        </div>
      )}
    </div>
  )
}