# Changelog

All notable changes to Muul will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.2.0] — 2026-02-27

### Added
- RSS feed at `/rss.xml` with XSL stylesheet for browser rendering
- Sitemap via `@astrojs/sitemap` integration
- OG default image (`public/og-default.svg`) for pages without a cover
- Series navigation component (`SeriesNav.astro`) — table of contents + prev/next within a series
- Paginated posts index at `/posts/[page]` — configurable via `postsPerPage` in `site.config.ts`
- `postsPerPage` option added to `site.config.ts`
- Dynamic `[page].astro` route for the pages collection — new pages added to `src/content/pages/` get routes automatically
- About page (`src/content/pages/about.md`)
- 404 page
- Getting started guide post
- Typography showcase post replacing the Obsidian markdown reference
- `CHANGELOG.md`

### Changed
- SEO component now includes canonical URL, `og:url`, `og:image`, `article:published_time`, `article:tag`, and `twitter:image`
- Twitter card type upgraded from `summary` to `summary_large_image`
- `BlogLayout` passes article-specific props (`type`, `publishedTime`, `tags`, `image`) to SEO
- Button outline/ghost hover now uses `--secondary` instead of Oat's default `--accent`
- Nav links now use `aria-current="page"` for active state — no JavaScript required
- Mobile nav uses native `hidden` attribute instead of a CSS class
- `main` spacing moved to `padding-block` on the element itself
- PostHeader tag badges use `.badge.outline` Oat variant
- Home intro updated to template placeholder copy

### Fixed
- `[page].astro` `RESERVED` array moved inside `getStaticPaths` — was causing a runtime error
- `ThemeInit` now sets `data-theme` on both `<html>` (FOUC prevention) and `<body>` (Oat requirement)
- External link arrow suppressed on nav links, brand, related posts, series nav, and badge links

---

## [0.1.0] — 2026-02-24

### Added
- Initial release
- Astro 5 with content collections (`posts`, `pages`)
- Oat.ink base styling layer
- Light/dark theme toggle with system preference detection and `localStorage` persistence
- Sticky header with desktop and mobile navigation
- Posts grouped by year on home, posts index, and tag pages
- Tag pages with post counts
- Related posts by shared tag overlap
- Reading time calculation
- `SeriesNav` schema fields (`series`, `order`) in post frontmatter
- `BaseLayout`, `BlogLayout`, `PageLayout`
- `SEO` component with Open Graph and Twitter card
- `PostHeader` with title, date, read time, and tag badges
- `ThemeInit` for flash-of-wrong-theme prevention
- `site.config.ts` for centralised configuration
- `global.css` + `theme.css` with Flexoki-inspired colour palette