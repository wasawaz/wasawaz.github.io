import { useParams } from 'react-router-dom'
import PostList from '../components/blog/PostList'
import { getPostsByCategory } from '../data/posts'
import { getCategoryById } from '../data/categories'

export default function Category() {
  const { id } = useParams()
  const category = getCategoryById(id)
  const categoryPosts = getPostsByCategory(id)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
        <p className="text-6xl mb-4">🤷</p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Category not found</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>ไม่พบหมวดหมู่ที่ค้นหา</p>
      </div>
    )
  }

  const Icon = category.icon

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: `${category.color}15` }}>
          <Icon className="w-7 h-7" style={{ color: category.color }} />
        </div>
        <div>
          <h1 className="text-3xl font-black" style={{ color: 'var(--color-text-primary)' }}>
            {category.name}
          </h1>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {category.nameTh} • {category.description}
          </p>
        </div>
      </div>

      <PostList
        posts={categoryPosts}
        subtitle={`${categoryPosts.length} article${categoryPosts.length !== 1 ? 's' : ''}`}
      />
    </div>
  )
}
