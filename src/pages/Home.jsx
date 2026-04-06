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
      <section className="relative overflow-hidden" style={{ paddingTop: '7rem', paddingBottom: '5rem' }}>
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full opacity-[0.06] blur-3xl"
            style={{ top: '10%', left: '20%', width: '500px', height: '500px', background: '#3b82f6' }} />
          <div className="absolute rounded-full opacity-[0.06] blur-3xl"
            style={{ bottom: '10%', right: '20%', width: '400px', height: '400px', background: '#8b5cf6' }} />
        </div>

        <div className="section-container relative">
          <div className="text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full animate-fade-in-up"
              style={{
                padding: '8px 18px',
                marginBottom: '1.5rem',
                background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.15)',
                color: 'var(--color-accent-blue)',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
              <SparklesIcon style={{ width: '16px', height: '16px' }} />
              Research Knowledge Base
            </div>

            {/* Title */}
            <h1 className="font-black leading-tight animate-fade-in-up stagger-1"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '1.5rem', opacity: 0 }}>
              Technoob
              <span className="gradient-text" style={{ marginLeft: '0.4em' }}>Hub</span>
            </h1>

            {/* Subtitle */}
            <p className="leading-relaxed animate-fade-in-up stagger-2"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', opacity: 0 }}>
              A personal blog for curating research & insights on
            </p>
            <p className="animate-fade-in-up stagger-3"
              style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem', opacity: 0 }}>
              Technology • Health • Investment
            </p>

            {/* CTA */}
            <div className="flex flex-wrap justify-center animate-fade-in-up stagger-4" style={{ gap: '1rem', opacity: 0 }}>
              <Link to="/blog"
                className="inline-flex items-center text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  gap: '0.5rem',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.875rem',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                }}>
                Explore Posts
                <ArrowRightIcon style={{ width: '16px', height: '16px' }} />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up stagger-5"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '420px', margin: '4rem auto 0', opacity: 0 }}>
            {[
              { value: posts.length, label: 'Articles' },
              { value: categories.length, label: 'Categories' },
              { value: '∞', label: 'Curiosity' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-black gradient-text" style={{ fontSize: '1.75rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--color-text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-container" style={{ marginBottom: '4rem' }}>
        <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--color-text-primary)' }}>
          📂 Categories
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {categories.map((cat, i) => (
            <Link key={cat.id} to={`/category/${cat.id}`}
              className="glass-card group animate-fade-in-up"
              style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: `${i * 0.1}s`, opacity: 0 }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, background: `${cat.color}15`,
              }}>
                <cat.icon style={{ width: '24px', height: '24px', color: cat.color }} />
              </div>
              <div>
                <span className="font-bold" style={{ display: 'block', fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                  {cat.name}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {cat.nameTh}
                </span>
              </div>
              <ArrowRightIcon className="group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                style={{ width: '16px', height: '16px', marginLeft: 'auto', opacity: 0, color: cat.color }} />
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Posts */}
      <section className="section-container" style={{ marginBottom: '5rem' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: '2rem' }}>
          <h2 className="font-bold" style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
            🔥 Latest Research
          </h2>
          <Link to="/blog" className="flex items-center font-medium transition-colors"
            style={{ gap: '0.25rem', fontSize: '0.875rem', color: 'var(--color-accent-blue)' }}>
            View all <ArrowRightIcon style={{ width: '14px', height: '14px' }} />
          </Link>
        </div>
        <PostList posts={recent} />
      </section>
    </div>
  )
}
