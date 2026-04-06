import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Blog from './pages/Blog'
import PostPage from './pages/PostPage'
import Category from './pages/Category'
import Search from './pages/Search'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('technoob-theme')
    return saved ? saved === 'dark' : true
  })
  const location = useLocation()

  useEffect(() => {
    document.body.classList.toggle('light', !darkMode)
    localStorage.setItem('technoob-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={
            <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
              <p className="text-6xl mb-4">🤖</p>
              <h1 className="text-3xl font-black mb-2" style={{ color: 'var(--color-text-primary)' }}>404</h1>
              <p style={{ color: 'var(--color-text-muted)' }}>Page not found</p>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
