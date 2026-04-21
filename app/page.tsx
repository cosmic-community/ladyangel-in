import Link from 'next/link'
import Hero from '@/components/Hero'
import CategoryCard from '@/components/CategoryCard'
import AdvertiserCard from '@/components/AdvertiserCard'
import ListingCard from '@/components/ListingCard'
import EventCard from '@/components/EventCard'
import BlogCard from '@/components/BlogCard'
import { getAll } from '@/lib/cosmic'
import { Category, Advertiser, Listing, Event, BlogPost } from '@/types'

export default async function HomePage() {
  const [categories, advertisers, listings, events, blogPosts] = await Promise.all([
    getAll<Category>('categories'),
    getAll<Advertiser>('advertisers'),
    getAll<Listing>('listings'),
    getAll<Event>('events'),
    getAll<BlogPost>('blog-posts')
  ])

  return (
    <div>
      <Hero />

      {categories.length > 0 && (
        <Section title="Explore Categories" href="/categories">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {categories.slice(0, 5).map(c => <CategoryCard key={c.id} category={c} />)}
          </div>
        </Section>
      )}

      {advertisers.length > 0 && (
        <Section title="Featured Advertisers" href="/advertisers">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advertisers.slice(0, 6).map(a => <AdvertiserCard key={a.id} advertiser={a} />)}
          </div>
        </Section>
      )}

      {listings.length > 0 && (
        <Section title="Latest Listings" href="/listings">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.slice(0, 6).map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </Section>
      )}

      {events.length > 0 && (
        <Section title="Upcoming Events" href="/events">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.slice(0, 3).map(e => <EventCard key={e.id} event={e} />)}
          </div>
        </Section>
      )}

      {blogPosts.length > 0 && (
        <Section title="From the Blog" href="/blog">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {blogPosts.slice(0, 3).map(p => <BlogCard key={p.id} post={p} />)}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-bold gradient-text">{title}</h2>
        <Link href={href} className="text-rose-600 font-medium hover:underline">View all →</Link>
      </div>
      {children}
    </section>
  )
}