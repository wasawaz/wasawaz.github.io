import { useSearchParams } from 'react-router-dom'
import PostList from '../components/blog/PostList'
import { searchPosts } from '../data/posts'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const results = searchPosts(query)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
      <div className="mb-10">
        <h1 className="text-3xl font-black mb-3" style={{ color: 'var(--color-text-primary)' }}>
          🔍 Search Results
        </h1>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
        </p>
      </div>
      <PostList posts={results} />
    </div>
  )
}
