import Link from 'next/link'
import { GalleryPost } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function GalleryCard({ post }: { post: GalleryPost }) {
  const cover = post.metadata?.cover_image?.imgix_url
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const mediaType = getMetafieldValue(post.metadata?.media_type)

  return (
    <Link href={`/gallery/${post.slug}`} className="block card-hover group">
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
        {cover ? (
          <img
            src={`${cover}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full gradient-bg flex items-center justify-center text-5xl">🖼️</div>
        )}
        {mediaType && (
          <span className="absolute top-3 right-3 px-2 py-1 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
            {mediaType === 'video' ? '▶️' : '🖼️'} {mediaType}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className="text-white font-semibold line-clamp-1">{title}</h3>
        </div>
      </div>
    </Link>
  )
}