import PostCard from './PostCard'

export default function PostList({ posts, title, subtitle }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-6xl mb-4">📭</p>
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
          No posts yet
        </h3>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Stay tuned — new research is coming soon!
        </p>
      </div>
    )
  }

  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  )
}
