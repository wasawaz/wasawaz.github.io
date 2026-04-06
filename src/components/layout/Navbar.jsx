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
    <nav className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: darkMode ? 'rgba(10, 14, 26, 0.85)' : 'rgba(248, 250, 252, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border)',
      }}>
      <div className="section-container">
        <div className="flex items-center justify-between" style={{ height: '64px' }}>
          {/* Logo */}
          <Link to="/" className="flex items-center group" style={{ gap: '0.75rem' }}>
            <div className="flex items-center justify-center font-black text-white"
              style={{
                width: '36px', height: '36px', borderRadius: '12px',
                fontSize: '1.125rem',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              }}>
              T
            </div>
            <span className="font-bold" style={{ fontSize: '1.125rem', letterSpacing: '-0.01em', color: 'var(--color-text-primary)' }}>
              Technoob<span className="gradient-text" style={{ marginLeft: '4px' }}>Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center" style={{ gap: '4px' }}>
            <Link to="/"
              className="font-medium transition-all duration-200"
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem',
                color: isActive('/') ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                background: isActive('/') ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
              Home
            </Link>
            <Link to="/blog"
              className="font-medium transition-all duration-200"
              style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem',
                color: isActive('/blog') ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)',
                background: isActive('/blog') ? 'rgba(59,130,246,0.1)' : 'transparent',
              }}>
              All Posts
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`}
                className="font-medium transition-all duration-200 flex items-center"
                style={{
                  padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', gap: '6px',
                  color: location.pathname === `/category/${cat.id}` ? cat.color : 'var(--color-text-secondary)',
                  background: location.pathname === `/category/${cat.id}` ? `${cat.color}15` : 'transparent',
                }}>
                <cat.icon style={{ width: '16px', height: '16px' }} />
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center" style={{ gap: '4px' }}>
            {/* Search */}
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="transition-colors duration-200 hover:cursor-pointer"
              style={{ padding: '8px', borderRadius: '8px', color: 'var(--color-text-secondary)', background: 'transparent', border: 'none' }}
              aria-label="Search">
              <MagnifyingGlassIcon style={{ width: '20px', height: '20px' }} />
            </button>

            {/* Theme Toggle */}
            <button onClick={toggleDarkMode}
              className="transition-colors duration-200 hover:cursor-pointer"
              style={{ padding: '8px', borderRadius: '8px', color: 'var(--color-text-secondary)', background: 'transparent', border: 'none' }}
              aria-label="Toggle theme">
              {darkMode ? <SunIcon style={{ width: '20px', height: '20px' }} /> : <MoonIcon style={{ width: '20px', height: '20px' }} />}
            </button>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden transition-colors duration-200 hover:cursor-pointer"
              style={{ padding: '8px', borderRadius: '8px', color: 'var(--color-text-secondary)', background: 'transparent', border: 'none' }}
              aria-label="Menu">
              {mobileMenuOpen ? <XMarkIcon style={{ width: '20px', height: '20px' }} /> : <Bars3Icon style={{ width: '20px', height: '20px' }} />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="animate-fade-in" style={{ paddingBottom: '1rem' }}>
            <form onSubmit={handleSearch} className="relative">
              <MagnifyingGlassIcon className="absolute"
                style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts... ค้นหาบทความ..."
                autoFocus
                className="w-full outline-none transition-all"
                style={{
                  paddingLeft: '40px', paddingRight: '16px', paddingTop: '12px', paddingBottom: '12px',
                  borderRadius: '12px', fontSize: '0.875rem',
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
        <div className="md:hidden animate-fade-in"
          style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
          <div style={{ padding: '12px 16px' }}>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}
              className="block font-medium"
              style={{ padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Home
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}
              className="block font-medium"
              style={{ padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              All Posts
            </Link>
            {categories.map(cat => (
              <Link key={cat.id} to={`/category/${cat.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center font-medium"
                style={{ gap: '8px', padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem', color: cat.color }}>
                <cat.icon style={{ width: '16px', height: '16px' }} />
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
