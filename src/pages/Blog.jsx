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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
          📚 All Posts
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Browse all research articles • เรียกดูบทความทั้งหมด
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setActiveCategory('all')}
          className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:cursor-pointer"
          style={{
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
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-1.5 hover:cursor-pointer"
              style={{
                background: activeCategory === cat.id ? cat.color : 'var(--color-bg-card)',
                color: activeCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                border: `1px solid ${activeCategory === cat.id ? cat.color : 'var(--color-border)'}`,
              }}>
              <cat.icon className="w-4 h-4" />
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
