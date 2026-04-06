export const posts = [
  {
    id: 'global-equity-funds-th',
    title: 'Global Equity Funds Thailand',
    titleTh: 'วิเคราะห์กองทุนหุ้นโลกในประเทศไทย',
    category: 'investment',
    date: '2026-04-02',
    author: 'Technoob Hub',
    excerpt: 'วิเคราะห์กองทุนหุ้นโลก 7 กองทุน เปรียบเทียบค่าธรรมเนียม ผลตอบแทน พร้อม Backtest DCA vs Lump Sum',
    excerptEn: 'Analysis of 7 global equity mutual funds in Thailand — fee comparison, performance review, and DCA vs Lump Sum backtest',
    tags: ['mutual-fund', 'global-equity', 'dca', 'backtest', 'thai-fund'],
    readTime: '12 min',
    featured: true,
    coverEmoji: '🌍',
  },
]

export function getPostById(id) {
  return posts.find(p => p.id === id)
}

export function getPostsByCategory(categoryId) {
  return posts.filter(p => p.category === categoryId)
}

export function getFeaturedPosts() {
  return posts.filter(p => p.featured)
}

export function getRecentPosts(limit = 5) {
  return [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit)
}

export function searchPosts(query) {
  const q = query.toLowerCase()
  return posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.titleTh.includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q))
  )
}
