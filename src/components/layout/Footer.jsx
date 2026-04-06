import { HeartIcon } from '@heroicons/react/24/solid'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', marginTop: '5rem' }}>
      <div className="section-container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '1.5rem' }}>
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div className="flex items-center justify-center font-bold text-white"
                style={{ width: '28px', height: '28px', borderRadius: '8px', fontSize: '0.875rem', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
                T
              </div>
              <span className="font-semibold" style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                Technoob Hub
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              Personal Research Knowledge Base
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center" style={{ gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span>Made with</span>
            <HeartIcon style={{ width: '14px', height: '14px', color: 'var(--color-accent-red)' }} />
            <span>by Wasawaz</span>
            <span>•</span>
            <span>© {year}</span>
          </div>

          {/* Tech Stack */}
          <div className="flex items-center" style={{ gap: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <span>Built with</span>
            <div className="flex items-center" style={{ gap: '0.5rem' }}>
              {['React', 'Vite', 'Tailwind', 'D3'].map(tech => (
                <span key={tech} className="font-medium"
                  style={{
                    padding: '2px 8px', borderRadius: '6px', fontSize: '10px',
                    background: 'var(--color-bg-card)', color: 'var(--color-text-secondary)',
                  }}>
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
