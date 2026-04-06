# Technoob Hub — Agent Instructions

Personal research blog at [wasawaz.github.io](https://wasawaz.github.io).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vite + React 19 |
| Styling | Tailwind CSS v4 + custom CSS design tokens |
| Charts | D3.js v7 via `useD3` hook |
| Routing | React Router v7 (HashRouter) |
| Icons | Heroicons v2 (outline) |
| Deploy | GitHub Actions → GitHub Pages |

## Project Structure

```
src/
├── components/
│   ├── blog/          # PostCard, CategoryTag
│   ├── content/       # ContentSection, ContentCard, DataTable, StatGrid
│   └── layout/        # Navbar, Footer, ThemeToggle
├── content/posts/     # Each post: <post-id>/index.jsx
├── data/
│   ├── posts.js       # Post metadata registry
│   └── categories.js  # technology, health, investment
├── hooks/useD3.js     # D3 chart hook
├── pages/             # HomePage, BlogPage, PostPage, CategoryPage
├── index.css          # Design system: themes, article-content, components
└── App.jsx            # Router config
```

## Key Conventions

### Content Creation
- Use the `technoob-hub-content` skill in `.agents/skills/` for creating new posts
- All post content MUST use the Content Design System components:
  - `ContentSection` for sections (never raw `<section>`)
  - `ContentCard` for chart/data wrappers (never raw glass-card div)
  - `DataTable` for tables (never raw `<table>`)
  - `StatGrid` for summary stats
- Wrap content in `<div className="article-content">` for automatic spacing

### Styling
- Use CSS custom properties for theme-aware colors: `var(--color-text-primary)`, etc.
- Use **inline styles** for critical layout — Tailwind utilities can be unreliable after build
- Dark mode is default; light mode via `body.light` class
- Glassmorphism: `.glass-card` for general cards, `.content-card` for article content

### Routing
- Uses `HashRouter` — all routes prefixed with `/#/`
- Post URLs: `/#/post/<post-id>`
- Blog listing: `/#/blog`
- Category pages: `/#/category/<category-id>`

### Adding a New Post (3 files to touch)
1. Create `src/content/posts/<post-id>/index.jsx`
2. Register metadata in `src/data/posts.js`
3. Register component in `src/pages/PostPage.jsx` (import + `postComponents` map)

### Responsive Design
- Fixed navbar with `7rem` (pt-28) top padding on all pages
- `.section-container` for consistent horizontal padding
- Test at 1440px (desktop) and 375px (mobile)
- D3 charts: wrap in `.chart-container` (min-width 500px, overflow-x scroll)

## Do NOT

- Use `<a>` for internal links — use React Router `<Link>`
- Use raw HTML tables in articles — use `DataTable` component
- Install new CSS frameworks — use existing Tailwind v4 + custom CSS
- Hardcode colors — use `var(--color-*)` tokens
- Use relative font sizes without testing — check both themes

## Commands

```bash
npm run dev      # Local dev server
npm run build    # Production build (GitHub Actions runs this)
npm run preview  # Preview production build locally
```
