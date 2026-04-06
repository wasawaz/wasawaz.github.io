export default function ContentCard({ title, subtitle, children, style }) {
  return (
    <div className="content-card" style={style}>
      {(title || subtitle) && (
        <div className="content-card-header">
          {title && <h3>{title}</h3>}
          {subtitle && <p>{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  )
}
