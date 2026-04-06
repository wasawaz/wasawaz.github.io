import {
  ComputerDesktopIcon,
  HeartIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const categories = [
  {
    id: 'technology',
    name: 'Technology',
    nameTh: 'เทคโนโลยี',
    icon: ComputerDesktopIcon,
    color: '#3b82f6',
    gradient: 'from-blue-500 to-cyan-500',
    badgeClass: 'badge-technology',
    description: 'Research on technology, software, AI, and more',
  },
  {
    id: 'health',
    name: 'Health',
    nameTh: 'สุขภาพ',
    icon: HeartIcon,
    color: '#10b981',
    gradient: 'from-green-500 to-emerald-500',
    badgeClass: 'badge-health',
    description: 'Health research, fitness, nutrition, and wellness',
  },
  {
    id: 'investment',
    name: 'Investment',
    nameTh: 'การลงทุน',
    icon: ChartBarIcon,
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-violet-500',
    badgeClass: 'badge-investment',
    description: 'Investments, mutual funds, stocks, and financial analysis',
  },
]

export function getCategoryById(id) {
  return categories.find(c => c.id === id)
}
