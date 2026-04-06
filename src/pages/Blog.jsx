import { useState } from 'react'
import PostList from '../components/blog/PostList'
import CategoryTag from '../components/blog/CategoryTag'
import { posts } from '../data/posts'
import { categories } from '../data/categories'

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? posts
    : posts.filter(p => p.category === activeCategory)

  return (
    <div className="section-container animate-fade-in" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-black" style={{ fontSize: '1.875rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
          📚 All Posts
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Browse all research articles • เรียกดูบทความทั้งหมด
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap" style={{ gap: '0.5rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveCategory('all')}
          className="font-medium transition-all duration-200 hover:cursor-pointer"
          style={{
            padding: '8px 16px', borderRadius: '12px', fontSize: '0.875rem',
            background: activeCategory === 'all' ? 'var(--color-accent-blue)' : 'var(--color-bg-card)',
            color: activeCategory === 'all' ? 'white' : 'var(--color-text-secondary)',
            border: `1px solid ${activeCategory === 'all' ? 'var(--color-accent-blue)' : 'var(--color-border)'}`,
          }}>
          All ({posts.length})
        </button>
        {categories.map(cat => {
          const count = posts.filter(p => p.category === cat.id).length
          return (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className="font-medium transition-all duration-200 flex items-center hover:cursor-pointer"
              style={{
                padding: '8px 16px', borderRadius: '12px', fontSize: '0.875rem', gap: '6px',
                background: activeCategory === cat.id ? cat.color : 'var(--color-bg-card)',
                color: activeCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                border: `1px solid ${activeCategory === cat.id ? cat.color : 'var(--color-border)'}`,
              }}>
              <cat.icon style={{ width: '16px', height: '16px' }} />
              {cat.name} ({count})
            </button>
          )
        })}
      </div>

      {/* Posts Grid */}
      <PostList posts={filtered} />
    </div>
  )
}
