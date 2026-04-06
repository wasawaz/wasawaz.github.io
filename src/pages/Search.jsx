import { useSearchParams } from 'react-router-dom'
import PostList from '../components/blog/PostList'
import { searchPosts } from '../data/posts'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = searchPosts(query)

  return (
    <div className="section-container animate-fade-in" style={{ paddingTop: '7rem', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-black" style={{ fontSize: '1.875rem', marginBottom: '0.75rem', color: 'var(--color-text-primary)' }}>
          🔍 Search Results
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>
      <PostList posts={results} />
    </div>
  )
}
