---
name: technoob-hub-content
description: |
  Create new blog post content for the Technoob Hub (wasawaz.github.io) personal research blog.
  Use when: (1) creating a new blog post or article (2) adding research content to the site
  (3) migrating existing reports into the blog (4) user says "new post", "add content",
  "สร้าง post ใหม่", "เพิ่มบทความ", "upload content", or mentions adding to Technoob Hub.
  Covers: JSX content creation, post registration, component registry, D3 chart integration,
  and Content Design System usage.
---

# Technoob Hub — Content Creation

Create blog posts for `wasawaz.github.io` using the established Content Design System.

## Project Location

```
/Users/80005558/workspaces/ai/wasawaz-git-page/
```

## Architecture

```
src/
├── content/posts/<post-id>/index.jsx  ← Content component (JSX)
├── data/posts.js                      ← Post metadata registry
├── data/categories.js                 ← Categories: technology, health, investment
├── pages/PostPage.jsx                 ← Wrapper: renders header + content
├── components/content/                ← Reusable content components
│   ├── ContentSection.jsx
│   ├── ContentCard.jsx
│   ├── DataTable.jsx
│   └── StatGrid.jsx
├── hooks/useD3.js                     ← D3.js chart hook
└── index.css                          ← Design system styles
```

## Step-by-Step: Add New Post

### 1. Create content file

Create `src/content/posts/<post-id>/index.jsx`:

```jsx
import { useState } from 'react'
import ContentSection from '../../../components/content/ContentSection'
import ContentCard from '../../../components/content/ContentCard'
import DataTable from '../../../components/content/DataTable'
import StatGrid from '../../../components/content/StatGrid'

export default function MyNewPost() {
  return (
    <div className="article-content">
      <StatGrid stats={[
        { value: '10', label: 'Items analyzed', color: '#3b82f6' },
        { value: 'Best', label: 'Top result', color: '#10b981' },
      ]} />

      <ContentSection icon="📊" iconBg="rgba(59,130,246,0.12)" title="Section Title">
        <ContentCard title="Card Title" subtitle="Description text">
          {/* Content, charts, etc. */}
        </ContentCard>
      </ContentSection>

      <ContentSection icon="📈" iconBg="rgba(16,185,129,0.12)" title="Another Section">
        <DataTable
          headers={['Col1', 'Col2', 'Col3']}
          rows={data.map(d => [d.col1, d.col2, d.col3])}
        />
      </ContentSection>

      <div className="disclaimer-card">
        <h4>⚠️ คำเตือน</h4>
        <p>Disclaimer text...</p>
      </div>
    </div>
  )
}
```

### 2. Register post metadata

Add entry to `src/data/posts.js`:

```js
{
  id: 'post-id',             // matches folder name
  title: 'English Title',
  titleTh: 'ชื่อภาษาไทย',
  category: 'investment',    // technology | health | investment
  date: '2026-04-06',
  author: 'Technoob Hub',
  excerpt: 'Short description for card preview',
  tags: ['tag1', 'tag2'],
  readTime: '10 min',
  featured: false,
  coverEmoji: '📊',
}
```

### 3. Register in PostPage component registry

Edit `src/pages/PostPage.jsx`:

```jsx
// Add import
import MyNewPost from '../content/posts/post-id'

// Add to registry
const postComponents = {
  'global-equity-funds-th': GlobalEquityFundsTh,
  'post-id': MyNewPost,  // ← add here
}
```

### 4. Build & deploy

```bash
cd /Users/80005558/workspaces/ai/wasawaz-git-page
npm run build
git add -A && git commit -m "feat: add new post <title>"
git push origin main
```

GitHub Actions auto-deploys to `wasawaz.github.io`.

## Component API Reference

### ContentSection
```jsx
<ContentSection
  icon="📊"                              // emoji
  iconBg="rgba(59,130,246,0.12)"         // icon background color
  title="Section Title"                   // required
  subtitle="Optional description"         // optional
>
  {children}
</ContentSection>
```

### ContentCard
```jsx
<ContentCard
  title="Card Title"        // optional
  subtitle="Description"    // optional
  style={{ marginBottom: '1.5rem' }}  // optional extra styles
>
  {children}
</ContentCard>
```

### DataTable
```jsx
<DataTable
  headers={['Col1', 'Col2']}
  rows={[
    ['plain text', 'plain text'],
    [{ value: 'styled', style: { color: '#10b981', fontWeight: 600 } }, 'text'],
  ]}
  keyExtractor={(row, index) => index}  // optional
/>
```

### StatGrid
```jsx
<StatGrid stats={[
  { value: '42', label: 'Description', color: '#3b82f6' },
]} />
```
Auto layout: 2 cols mobile → 4 cols desktop.

## D3 Chart Integration

For data visualizations, use the `useD3` hook:

```jsx
import * as d3 from 'd3'
import { useD3 } from '../../../hooks/useD3'

function MyChart() {
  const ref = useD3((sel, el) => {
    const w = el.clientWidth, h = 300
    const svg = sel.append('svg').attr('width', w).attr('height', h)
    // D3 code here...
  }, [/* dependencies */])
  return <div ref={ref} className="chart-container" />
}
```

Always wrap chart output in `className="chart-container"` for responsive scroll on mobile.

## CSS Classes Available

| Class | Purpose |
|-------|---------|
| `.article-content` | Wrapper: section spacing 4.5rem, typography |
| `.content-card` | Glass card with 2rem padding (1.25rem mobile) |
| `.stat-grid` / `.stat-card` | Summary stats grid |
| `.data-table-wrapper` | Table with zebra striping |
| `.chart-container` | Chart with min-width 500px + overflow scroll |
| `.chart-legend` / `.chart-legend-item` | Chart legend row |
| `.disclaimer-card` | Warning/disclaimer box |
| `.fund-card-grid` | 1→2→3 column responsive grid |

## Design Rules

1. **Always** wrap post content in `<div className="article-content">`
2. **Always** use `ContentSection` for major sections — never raw `<section>`
3. **Always** use `ContentCard` for chart/data blocks — never raw glass-card div
4. **Always** use `DataTable` for tabular data — never raw `<table>`
5. **Always** use `StatGrid` for summary stats at the top
6. Use **inline styles** for critical spacing — Tailwind utilities can be unreliable after build
7. Use `style={{ color: 'var(--color-text-primary)' }}` for theme-aware colors
8. D3 charts must use `className="chart-container"` wrapper
9. Category must be one of: `technology`, `health`, `investment`
10. Test at 1440px desktop and 375px mobile before pushing

## Theme Color Tokens

```
--color-text-primary, --color-text-secondary, --color-text-muted
--color-bg-card, --color-border
--color-accent-blue (#3b82f6), --color-accent-green (#10b981)
--color-accent-purple (#8b5cf6), --color-accent-orange (#f59e0b)
--color-accent-red (#ef4444), --color-accent-cyan (#06b6d4)
```
