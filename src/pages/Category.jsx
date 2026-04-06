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
      <div className="section-container text-center" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤷</p>
        <h1 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Category not found</h1>
        <p style={{ color: 'var(--color-text-muted)' }}>ไม่พบหมวดหมู่ที่ค้นหา</p>
      </div>
    )
  }

  const Icon = category.icon

  return (
    <div className="section-container animate-fade-in" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div className="flex items-center" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="flex items-center justify-center"
          style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${category.color}15` }}>
          <Icon style={{ width: '28px', height: '28px', color: category.color }} />
        </div>
        <div>
          <h1 className="font-black" style={{ fontSize: '1.875rem', color: 'var(--color-text-primary)' }}>
            {category.name}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
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
