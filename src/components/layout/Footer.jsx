import { HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t mt-20" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                T
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Technoob Hub
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Personal Research Knowledge Base
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>Made with</span>
            <HeartIcon className="w-3.5 h-3.5" style={{ color: 'var(--color-accent-red)' }} />
            <span>by Wasawaz</span>
            <span>•</span>
            <span>© {year}</span>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <span>Built with</span>
            <div className="flex items-center gap-2">
              {['React', 'Vite', 'Tailwind', 'D3'].map(tech => (
                <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-medium"
                  style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
