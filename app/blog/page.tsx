import BlogCard from '@/components/BlogCard'
import { getAll } from '@/lib/cosmic'
import { BlogPost } from '@/types'

export const metadata = { title: 'Blog – LadyAngel • IN' }

export default async function BlogPage() {
  const posts = await getAll<BlogPost>('blog-posts')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Blog</h1>
        <p className="text-gray-600">Stories, insights, and inspiration from the community.</p>
      </div>
      {posts.length === 0 ? (
        <p className="text-gray-500">No blog posts yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map(p => <BlogCard key={p.id} post={p} />)}
        </div>
      )}
    </div>
  )
}