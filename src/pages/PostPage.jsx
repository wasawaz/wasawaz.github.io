import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline'
import CategoryTag from '../components/blog/CategoryTag'
import { getPostById } from '../data/posts'
import GlobalEquityFundsTh from '../content/posts/global-equity-funds-th'

// Post component registry
const postComponents = {
  'global-equity-funds-th': GlobalEquityFundsTh,
}

export default function PostPage() {
  const { id } = useParams()
  const post = getPostById(id)

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
        <p className="text-6xl mb-4">📭</p>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Post not found</h1>
        <Link to="/blog" className="text-sm" style={{ color: 'var(--color-accent-blue)' }}>← Back to posts</Link>
      </div>
    )
  }

  const PostContent = postComponents[id]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      {/* Back Link */}
      <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:opacity-80"
        style={{ color: 'var(--color-accent-blue)' }}>
        <ArrowLeftIcon className="w-4 h-4" />
        Back to All Posts
      </Link>

      {/* Post Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <CategoryTag categoryId={post.category} size="md" />
          {post.featured && (
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider"
              style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--color-accent-orange)' }}>
              ⭐ Featured
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-black mb-2 leading-tight"
          style={{ color: 'var(--color-text-primary)' }}>
          {post.coverEmoji} {post.title}
        </h1>
        {post.titleTh && (
          <p className="text-lg mb-4" style={{ color: 'var(--color-text-muted)' }}>
            {post.titleTh}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1.5">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          )}
          {post.author && (
            <div className="flex items-center gap-1.5">
              <span>by {post.author}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <TagIcon className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
            {post.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <hr className="mb-10" style={{ borderColor: 'var(--color-border)' }} />

      {/* Post Content */}
      {PostContent ? (
        <PostContent />
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🚧</p>
          <p style={{ color: 'var(--color-text-muted)' }}>Content is being prepared...</p>
        </div>
      )}
    </div>
  )
}
