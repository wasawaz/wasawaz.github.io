import { Link } from 'react-router-dom'
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import CategoryTag from './CategoryTag'
import { getCategoryById } from '../../data/categories'

export default function PostCard({ post, index = 0 }) {
  const category = getCategoryById(post.category)

  return (
    <Link to={`/post/${post.id}`}
      className="glass-card block p-6 group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
      {/* Cover Emoji */}
      <div className="w-full h-40 rounded-xl flex items-center justify-center mb-5 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category?.color}20, ${category?.color}08)`,
        }}>
        <span className="text-6xl select-none group-hover:scale-110 transition-transform duration-500">
          {post.coverEmoji || '📄'}
        </span>
        {/* Decorative circles */}
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10"
          style={{ background: category?.color }} />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full opacity-10"
          style={{ background: category?.color }} />
      </div>

      {/* Category & Featured */}
      <div className="flex items-center gap-2 mb-3">
        <CategoryTag categoryId={post.category} />
        {post.featured && (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider"
            style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--color-accent-orange)' }}>
            ⭐ Featured
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-1 group-hover:text-blue-400 transition-colors"
        style={{ color: 'var(--color-text-primary)' }}>
        {post.title}
      </h3>
      {post.titleTh && (
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
          {post.titleTh}
        </p>
      )}

      {/* Excerpt */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {post.excerpt}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        </div>
        {post.readTime && (
          <div className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
              style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-muted)' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
