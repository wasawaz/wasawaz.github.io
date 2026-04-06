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
      <div className="section-container text-center" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</p>
        <h1 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>Post not found</h1>
        <Link to="/blog" style={{ fontSize: '0.875rem', color: 'var(--color-accent-blue)' }}>← Back to posts</Link>
      </div>
    )
  }

  const PostContent = postComponents[id]

  return (
    <div className="animate-fade-in" style={{ maxWidth: '72rem', margin: '0 auto', paddingTop: '7rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
      {/* Back Link */}
      <Link to="/blog" className="inline-flex items-center transition-colors hover:opacity-80"
        style={{ gap: '6px', fontSize: '0.875rem', marginBottom: '2rem', display: 'inline-flex', color: 'var(--color-accent-blue)' }}>
        <ArrowLeftIcon style={{ width: '16px', height: '16px' }} />
        Back to All Posts
      </Link>

      {/* Post Header */}
      <header style={{ marginBottom: '2.5rem' }}>
        <div className="flex items-center" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
          <CategoryTag categoryId={post.category} size="md" />
          {post.featured && (
            <span className="font-bold uppercase"
              style={{
                padding: '4px 10px', borderRadius: '9999px',
                fontSize: '11px', letterSpacing: '0.05em',
                background: 'rgba(245,158,11,0.12)', color: 'var(--color-accent-orange)',
              }}>
              ⭐ Featured
            </span>
          )}
        </div>

        <h1 className="font-black leading-tight"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          {post.coverEmoji} {post.title}
        </h1>
        {post.titleTh && (
          <p style={{ fontSize: '1.125rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>
            {post.titleTh}
          </p>
        )}

        <div className="flex flex-wrap items-center" style={{ gap: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          <div className="flex items-center" style={{ gap: '6px' }}>
            <CalendarIcon style={{ width: '16px', height: '16px' }} />
            <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center" style={{ gap: '6px' }}>
              <ClockIcon style={{ width: '16px', height: '16px' }} />
              <span>{post.readTime}</span>
            </div>
          )}
          {post.author && (
            <div className="flex items-center" style={{ gap: '6px' }}>
              <span>by {post.author}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap items-center" style={{ gap: '0.5rem', marginTop: '1rem' }}>
            <TagIcon style={{ width: '16px', height: '16px', color: 'var(--color-text-muted)' }} />
            {post.tags.map(tag => (
              <span key={tag} className="font-medium"
                style={{
                  padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem',
                  background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Divider */}
      <hr style={{ marginBottom: '2.5rem', borderColor: 'var(--color-border)' }} />

      {/* Post Content */}
      {PostContent ? (
        <div className="article-content">
          <PostContent />
        </div>
      ) : (
        <div className="text-center" style={{ padding: '5rem 0' }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🚧</p>
          <p style={{ color: 'var(--color-text-muted)' }}>Content is being prepared...</p>
        </div>
      )}
    </div>
  )
}
