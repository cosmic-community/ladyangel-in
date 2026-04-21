import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const coverUrl = category.metadata?.cover_image?.imgix_url
  const icon = getMetafieldValue(category.metadata?.icon) || '🏷️'
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link href={`/categories/${category.slug}`} className="group block card-hover">
      <div className="relative rounded-2xl overflow-hidden bg-white border border-rose-100 shadow-sm">
        {coverUrl ? (
          <div className="relative h-40 overflow-hidden">
            <img
              src={`${coverUrl}?w=800&h=400&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute top-3 right-3 text-3xl">{icon}</div>
          </div>
        ) : (
          <div className="h-40 gradient-bg flex items-center justify-center text-5xl">{icon}</div>
        )}
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition">{name}</h3>
          {description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>}
        </div>
      </div>
    </Link>
  )
}