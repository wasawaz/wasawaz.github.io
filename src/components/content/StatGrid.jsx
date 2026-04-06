export default function StatGrid({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map(s => (
        <div key={s.label} className="stat-card">
          <div className="stat-value" style={{ color: s.color || 'var(--color-accent-blue)' }}>
            {s.value}
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
