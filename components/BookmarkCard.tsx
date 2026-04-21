import { Bookmark } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const thumbnail = bookmark.metadata?.thumbnail?.imgix_url
  const title = getMetafieldValue(bookmark.metadata?.title) || bookmark.title
  const url = getMetafieldValue(bookmark.metadata?.url)
  const description = getMetafieldValue(bookmark.metadata?.description)

  return (
    <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="block card-hover">
      <div className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm h-full flex flex-col">
        {thumbnail ? (
          <img
            src={`${thumbnail}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-40 object-cover"
          />
        ) : (
          <div className="h-40 gradient-bg flex items-center justify-center text-5xl">🔖</div>
        )}
        <div className="p-5 flex-1">
          <h3 className="font-bold text-gray-900 line-clamp-2">{title}</h3>
          {description && <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>}
          {url && <p className="text-xs text-rose-600 mt-3 truncate">🔗 {url}</p>}
        </div>
      </div>
    </a>
  )
}