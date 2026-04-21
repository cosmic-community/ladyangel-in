import Link from 'next/link'
import { BlogPost } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function BlogCard({ post }: { post: BlogPost }) {
  const image = post.metadata?.featured_image?.imgix_url
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)

  return (
    <Link href={`/blog/${post.slug}`} className="block card-hover">
      <article className="bg-white rounded-2xl overflow-hidden border border-rose-100 shadow-sm h-full">
        {image ? (
          <img
            src={`${image}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="h-48 gradient-bg flex items-center justify-center text-5xl">📝</div>
        )}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{title}</h3>
          {excerpt && <p className="text-sm text-gray-600 mt-2 line-clamp-3">{excerpt}</p>}
          <span className="inline-block mt-3 text-sm text-rose-600 font-medium">Read more →</span>
        </div>
      </article>
    </Link>
  )
}