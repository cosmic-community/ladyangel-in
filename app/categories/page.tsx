import CategoryCard from '@/components/CategoryCard'
import { getAll } from '@/lib/cosmic'
import { Category } from '@/types'

export const metadata = { title: 'Categories – LadyAngel • IN' }

export default async function CategoriesPage() {
  const categories = await getAll<Category>('categories')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Categories</h1>
        <p className="text-gray-600">Explore what interests you most.</p>
      </div>
      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(c => <CategoryCard key={c.id} category={c} />)}
        </div>
      )}
    </div>
  )
}