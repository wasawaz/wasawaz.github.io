import { getCategoryById } from '../../data/categories'

export default function CategoryTag({ categoryId, size = 'sm' }) {
  const category = getCategoryById(categoryId)
  if (!category) return null

  const Icon = category.icon
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-1 text-[11px] gap-1'
    : 'px-3 py-1.5 text-xs gap-1.5'

  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full tracking-wide uppercase ${sizeClasses}`}
      style={{
        background: `${category.color}15`,
        color: category.color,
      }}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {category.name}
    </span>
  )
}
