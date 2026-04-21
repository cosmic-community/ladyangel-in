// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getOne, getByRelation, getMetafieldValue } from '@/lib/cosmic'
import { Category, Listing, Event, BlogPost, GalleryPost, Advertiser } from '@/types'
import ListingCard from '@/components/ListingCard'
import EventCard from '@/components/EventCard'
import BlogCard from '@/components/BlogCard'
import GalleryCard from '@/components/GalleryCard'
import AdvertiserCard from '@/components/AdvertiserCard'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getOne<Category>('categories', slug)
  if (!category) notFound()

  const [listings, events, blogs, gallery, advertisers] = await Promise.all([
    getByRelation<Listing>('listings', 'category', category.id),
    getByRelation<Event>('events', 'category', category.id),
    getByRelation<BlogPost>('blog-posts', 'category', category.id),
    getByRelation<GalleryPost>('gallery-posts', 'category', category.id),
    getByRelation<Advertiser>('advertisers', 'primary_category', category.id)
  ])

  const cover = category.metadata?.cover_image?.imgix_url
  const icon = getMetafieldValue(category.metadata?.icon) || '🏷️'
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div>
      <div className="relative gradient-bg">
        {cover && (
          <img src={`${cover}?w=1600&h=400&fit=crop&auto=format,compress`} alt={name} className="absolute inset-0 w-full h-full object-cover opacity-20" />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-5xl mb-4">{icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">{name}</h1>
          {description && <p className="text-lg text-gray-700 max-w-2xl">{description}</p>}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {advertisers.length > 0 && <Section title="Advertisers"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{advertisers.map(a => <AdvertiserCard key={a.id} advertiser={a} />)}</div></Section>}
        {listings.length > 0 && <Section title="Listings"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{listings.map(l => <ListingCard key={l.id} listing={l} />)}</div></Section>}
        {events.length > 0 && <Section title="Events"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{events.map(e => <EventCard key={e.id} event={e} />)}</div></Section>}
        {blogs.length > 0 && <Section title="Blog Posts"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{blogs.map(b => <BlogCard key={b.id} post={b} />)}</div></Section>}
        {gallery.length > 0 && <Section title="Gallery"><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{gallery.map(g => <GalleryCard key={g.id} post={g} />)}</div></Section>}
        {advertisers.length === 0 && listings.length === 0 && events.length === 0 && blogs.length === 0 && gallery.length === 0 && (
          <p className="text-gray-500">No content in this category yet.</p>
        )}
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">{title}</h2>
      {children}
    </section>
  )
}