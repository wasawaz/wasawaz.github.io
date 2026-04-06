import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline'
import { categories } from '../../data/categories'

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'rgba(10, 14, 26, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderColor: 'var(--color-border)',
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-lg"
              style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              T
            </div>
            <span className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}>
              Technoob
              <span className="gradient-text ml-1">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive('/') ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                background: isActive('/') ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
              Home
            </Link>
            <Link to="/blog"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                color: isActive('/blog') ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                background: isActive('/blog') ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
              All Posts
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                style={{
                  color: location.pathname === `/category/${cat.id}` ? cat.color : 'var(--color-text-secondary)',
                  background: location.pathname === `/category/${cat.id}` ? `${cat.color}15` : 'transparent',
                }}>
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg transition-colors duration-200 hover:cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Search">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-colors duration-200 hover:cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Toggle theme">
              {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            </button>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:cursor-pointer"
              style={{ color: 'var(--color-text-secondary)' }}
              aria-label="Menu">
              {mobileMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts... ค้นหาบทความ..."
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t animate-fade-in"
          style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-secondary)' }}>
          <div className="px-4 py-3 space-y-1">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}>
              Home
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-lg text-sm font-medium"
              style={{ color: 'var(--color-text-secondary)' }}>
              All Posts
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                style={{ color: cat.color }}>
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
