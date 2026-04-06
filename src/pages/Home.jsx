import { Link } from 'react-router-dom'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'
import PostList from '../components/blog/PostList'
import { categories } from '../data/categories'
import { posts, getFeaturedPosts, getRecentPosts } from '../data/posts'

export default function Home() {
  const featured = getFeaturedPosts()
  const recent = getRecentPosts(6)

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-[0.04] blur-3xl"
            style={{ background: '#3b82f6' }} />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 rounded-full opacity-[0.04] blur-3xl"
            style={{ background: '#8b5cf6' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-fade-in-up"
              style={{
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
                color: 'var(--color-accent-blue)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
              <SparklesIcon className="w-4 h-4" />
              Research Knowledge Base
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight animate-fade-in-up stagger-1"
              style={{ opacity: 0 }}>
              Technoob
              <span className="gradient-text"> Hub</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl mb-4 leading-relaxed animate-fade-in-up stagger-2"
              style={{ color: 'var(--color-text-secondary)', opacity: 0 }}>
              A personal blog for curating research & insights on
            </p>
            <p className="text-base mb-10 animate-fade-in-up stagger-3"
              style={{ color: 'var(--color-text-muted)', opacity: 0 }}>
              Technology • Health • Investment
            </p>

            {/* CTA */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up stagger-4" style={{ opacity: 0 }}>
              <Link to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                Explore Posts
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-16 animate-fade-in-up stagger-5" style={{ opacity: 0 }}>
            {[
              { value: posts.length, label: 'Articles' },
              { value: categories.length, label: 'Categories' },
              { value: '∞', label: 'Curiosity' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-2xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
          📂 Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/category/${cat.id}`}
              className="glass-card p-6 flex items-center gap-4 group animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${cat.color}15` }}>
                <cat.icon className="w-6 h-6" style={{ color: cat.color }} />
              </div>
              <div>
                <span className="text-sm font-bold block" style={{ color: 'var(--color-text-primary)' }}>
                  {cat.name}
                </span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  {cat.nameTh}
                </span>
              </div>
              <ArrowRightIcon className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: cat.color }} />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            🔥 Latest Research
          </h2>
          <Link to="/blog" className="text-sm font-medium flex items-center gap-1 transition-colors"
            style={{ color: 'var(--color-accent-blue)' }}>
            View all <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>
        <PostList posts={recent} />
      </section>
    </div>
  )
}
