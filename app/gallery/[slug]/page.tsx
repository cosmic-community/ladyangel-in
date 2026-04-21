// app/gallery/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOne, getMetafieldValue } from '@/lib/cosmic'
import { GalleryPost } from '@/types'

export default async function GalleryPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getOne<GalleryPost>('gallery-posts', slug)
  if (!post) notFound()

  const cover = post.metadata?.cover_image?.imgix_url
  const title = getMetafieldValue(post.metadata?.title) || post.title
  const caption = getMetafieldValue(post.metadata?.caption)
  const mediaType = getMetafieldValue(post.metadata?.media_type)
  const videoUrl = getMetafieldValue(post.metadata?.video_url)
  const mediaFiles = post.metadata?.media_files || []
  const author = post.metadata?.advertiser

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      {caption && <p className="text-lg text-gray-600 mb-8">{caption}</p>}

      {mediaType === 'video' && videoUrl ? (
        <div className="aspect-video rounded-2xl overflow-hidden bg-black mb-8">
          <iframe src={videoUrl} className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
        </div>
      ) : cover ? (
        <img src={`${cover}?w=1600&h=1200&fit=crop&auto=format,compress`} alt={title} className="w-full rounded-2xl mb-8" />
      ) : null}

      {mediaFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {mediaFiles.map((f, i) => (
            <img key={i} src={`${f.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`} alt="" className="rounded-xl aspect-square object-cover" />
          ))}
        </div>
      )}

      {author && (
        <Link href={`/advertisers/${author.slug}`} className="inline-flex items-center gap-3 bg-rose-50 rounded-2xl p-4 hover:bg-rose-100 transition">
          <p className="font-semibold">Posted by {author.title}</p>
        </Link>
      )}
    </div>
  )
}