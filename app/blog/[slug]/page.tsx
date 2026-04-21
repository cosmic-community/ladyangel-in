// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOne, getMetafieldValue } from '@/lib/cosmic'
import { BlogPost } from '@/types'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getOne<BlogPost>('blog-posts', slug)
  if (!post) notFound()

  const image = post.metadata?.featured_image?.imgix_url
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const content = getMetafieldValue(post.metadata?.content)
  const author = post.metadata?.advertiser
  const category = post.metadata?.category

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {category && (
        <Link href={`/categories/${category.slug}`} className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-medium mb-4">
          {category.title}
        </Link>
      )}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h1>
      {excerpt && <p className="text-xl text-gray-600 mb-8">{excerpt}</p>}
      {image && <img src={`${image}?w=1600&h=900&fit=crop&auto=format,compress`} alt={title} className="w-full rounded-3xl mb-8" />}
      {content && <div className="prose prose-lg prose-rose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />}
      {author && (
        <Link href={`/advertisers/${author.slug}`} className="mt-12 flex items-center gap-3 bg-rose-50 rounded-2xl p-4 hover:bg-rose-100 transition">
          {author.metadata?.avatar?.imgix_url && (
            <img src={`${author.metadata.avatar.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`} alt="" className="w-12 h-12 rounded-full" />
          )}
          <div>
            <p className="text-sm text-gray-600">Written by</p>
            <p className="font-semibold">{author.title}</p>
          </div>
        </Link>
      )}
    </article>
  )
}