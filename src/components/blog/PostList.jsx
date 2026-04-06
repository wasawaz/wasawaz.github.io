import PostCard from './PostCard'

export default function PostList({ posts, title, subtitle }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center" style={{ padding: '5rem 0' }}>
        <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>📭</p>
        <h3 className="font-bold" style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
          No posts yet
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          Stay tuned — new research is coming soon!
        </p>
      </div>
    )
  }

  return (
    <div>
      {(title || subtitle) && (
        <div style={{ marginBottom: '2rem' }}>
          {title && (
            <h2 className="font-bold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: posts.length === 1
          ? 'minmax(0, 480px)'
          : 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
      }}>
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  )
}
