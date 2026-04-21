// app/advertisers/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getOne, getByRelation, getMetafieldValue } from '@/lib/cosmic'
import { Advertiser, Listing, Bookmark, GalleryPost, BlogPost, Event } from '@/types'
import ListingCard from '@/components/ListingCard'
import BookmarkCard from '@/components/BookmarkCard'
import GalleryCard from '@/components/GalleryCard'
import BlogCard from '@/components/BlogCard'
import EventCard from '@/components/EventCard'

export default async function AdvertiserPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const advertiser = await getOne<Advertiser>('advertisers', slug)
  if (!advertiser) notFound()

  const [listings, bookmarks, gallery, blogs, events] = await Promise.all([
    getByRelation<Listing>('listings', 'advertiser', advertiser.id),
    getByRelation<Bookmark>('bookmarks', 'advertiser', advertiser.id),
    getByRelation<GalleryPost>('gallery-posts', 'advertiser', advertiser.id),
    getByRelation<BlogPost>('blog-posts', 'advertiser', advertiser.id),
    getByRelation<Event>('events', 'organiser', advertiser.id)
  ])

  const avatar = advertiser.metadata?.avatar?.imgix_url
  const name = getMetafieldValue(advertiser.metadata?.full_name) || advertiser.title
  const handle = getMetafieldValue(advertiser.metadata?.handle)
  const bio = getMetafieldValue(advertiser.metadata?.bio)
  const city = getMetafieldValue(advertiser.metadata?.city)
  const email = getMetafieldValue(advertiser.metadata?.email)
  const phone = getMetafieldValue(advertiser.metadata?.phone)
  const website = getMetafieldValue(advertiser.metadata?.website)
  const verified = advertiser.metadata?.verified

  return (
    <div>
      <div className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {avatar ? (
              <img src={`${avatar}?w=320&h=320&fit=crop&auto=format,compress`} alt={name} className="w-32 h-32 md:w-40 md:h-40 rounded-full ring-4 ring-white shadow-xl object-cover" />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-rose-200 flex items-center justify-center text-6xl">👤</div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
                {verified && <span className="text-rose-600 text-2xl">✓</span>}
              </div>
              {handle && <p className="text-rose-600 mt-1">@{handle}</p>}
              {city && <p className="text-gray-600 mt-2">📍 {city}</p>}
              {bio && <p className="text-gray-700 mt-4 max-w-2xl">{bio}</p>}
              <div className="flex flex-wrap gap-3 mt-5">
                {email && <a href={`mailto:${email}`} className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm hover:shadow">✉️ {email}</a>}
                {phone && <a href={`tel:${phone}`} className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-sm hover:shadow">📞 {phone}</a>}
                {website && <a href={website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-rose-600 text-white rounded-full text-sm font-medium shadow hover:bg-rose-700">🌐 Website</a>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {listings.length > 0 && <ContentSection title="Listings"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{listings.map(l => <ListingCard key={l.id} listing={l} />)}</div></ContentSection>}
        {events.length > 0 && <ContentSection title="Events"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{events.map(e => <EventCard key={e.id} event={e} />)}</div></ContentSection>}
        {gallery.length > 0 && <ContentSection title="Gallery"><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{gallery.map(g => <GalleryCard key={g.id} post={g} />)}</div></ContentSection>}
        {blogs.length > 0 && <ContentSection title="Blog Posts"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{blogs.map(b => <BlogCard key={b.id} post={b} />)}</div></ContentSection>}
        {bookmarks.length > 0 && <ContentSection title="Bookmarks"><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{bookmarks.map(b => <BookmarkCard key={b.id} bookmark={b} />)}</div></ContentSection>}
      </div>
    </div>
  )
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-text">{title}</h2>
      {children}
    </section>
  )
}