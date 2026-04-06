export default function ContentSection({ icon, iconBg, title, subtitle, children }) {
  return (
    <section className="content-section">
      <div className="content-section-header">
        <h2>
          <span className="section-icon" style={{ background: iconBg || 'rgba(59,130,246,0.12)' }}>
            {icon}
          </span>
          {title}
        </h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
