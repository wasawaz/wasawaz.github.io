import { Link } from 'react-router-dom'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import CategoryTag from './CategoryTag'
import { getCategoryById } from '../../data/categories'

export default function PostCard({ post, index = 0 }) {
  const category = getCategoryById(post.category)

  return (
    <Link to={`/post/${post.id}`}
      className="glass-card block group animate-fade-in-up"
      style={{ padding: '1.5rem', animationDelay: `${index * 0.1}s`, opacity: 0 }}>

      {/* Cover Emoji */}
      <div className="w-full flex items-center justify-center relative overflow-hidden"
        style={{
          height: '200px',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          background: `linear-gradient(135deg, ${category?.color}20, ${category?.color}08)`,
        }}>
        <span className="select-none group-hover:scale-110 transition-transform duration-500"
          style={{ fontSize: '4.5rem' }}>
          {post.coverEmoji || '📄'}
        </span>
        {/* Decorative circles */}
        <div className="absolute rounded-full"
          style={{ top: '-24px', right: '-24px', width: '96px', height: '96px', opacity: 0.1, background: category?.color }} />
        <div className="absolute rounded-full"
          style={{ bottom: '-16px', left: '-16px', width: '64px', height: '64px', opacity: 0.1, background: category?.color }} />
      </div>

      {/* Category & Featured */}
      <div className="flex items-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
        <CategoryTag categoryId={post.category} />
        {post.featured && (
          <span className="font-bold uppercase"
            style={{
              padding: '3px 10px', borderRadius: '9999px',
              fontSize: '10px', letterSpacing: '0.05em',
              background: 'rgba(245,158,11,0.12)', color: 'var(--color-accent-orange)',
            }}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-bold group-hover:text-blue-400 transition-colors"
        style={{ fontSize: '1.125rem', lineHeight: 1.4, marginBottom: '0.375rem', color: 'var(--color-text-primary)' }}>
        {post.title}
      </h3>
      {post.titleTh && (
        <p style={{ fontSize: '0.875rem', marginBottom: '0.75rem', color: 'var(--color-text-muted)' }}>
          {post.titleTh}
        </p>
      )}

      {/* Excerpt */}
      <p className="leading-relaxed" style={{
        fontSize: '0.875rem',
        marginBottom: '1.25rem',
        color: 'var(--color-text-secondary)',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.excerpt}
      </p>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: '1rem', opacity: 0.5 }} />

      {/* Meta */}
      <div className="flex items-center" style={{ gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
        <div className="flex items-center" style={{ gap: '4px' }}>
          <CalendarIcon style={{ width: '14px', height: '14px' }} />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        {post.readTime && (
          <div className="flex items-center" style={{ gap: '4px' }}>
            <ClockIcon style={{ width: '14px', height: '14px' }} />
            <span>{post.readTime}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap" style={{ gap: '6px', marginTop: '0.875rem' }}>
          {post.tags.slice(0, 4).map(tag => (
            <span key={tag} className="font-medium"
              style={{
                padding: '3px 10px', borderRadius: '6px', fontSize: '10px',
                background: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)',
              }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
