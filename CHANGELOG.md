# Changelog

All notable changes to Muul will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.5.1] — 2026-03-07

### Fixed
- Expressive Code theme switching now correctly responds to Muul's `data-theme` attribute via `themeCssSelector` in `astro.config.mjs`
- Switched from `github-light`/`github-dark` to `everforest-light`/`everforest-dark` — warmer palette, closer to Flexoki

---

## [0.5.0] — 2026-03-05

### Added
- `src/components/Head.astro` — portable `<head>` component; owns charset, viewport, favicon, fonts, ThemeInit, SEO slot, and head escape hatch slot
- `src/schemas/base.schema.ts` — universal base schema (`title`, `description`, `draft`); no date field
- `src/schemas/post.schema.ts` — extends base with `published` (required), `cover`, `tags`, `series`, `order`
- `src/schemas/page.schema.ts` — extends base with `updated` (optional)
- `src/schemas/index.ts` — barrel export for all schemas and types
- `SiteConfig`, `NavItem`, `SocialItem` interfaces exported from `site.config.ts`
- `PageLayout` now renders `updated` date in `PageHeader` meta slot when present

### Changed
- `BaseLayout` delegates `<head>` entirely to `Head.astro`; now owns HTML shell and `<main>` with six named slots: `seo`, `head`, `header`, `content`, `navigation`, `after`, `scripts`
- `BlogLayout` fills `BaseLayout` slots directly via `<Fragment>` — no intermediate layout wrapper
- `PageLayout` fills `BaseLayout` slots directly via `<Fragment>` — no intermediate layout wrapper
- `ContentLayout.astro` removed — its slots absorbed into `BaseLayout`
- `content.config.ts` imports `postSchema` and `pageSchema` from `@/schemas`
- `calculateReadingTime` accepts optional `wordsPerMinute` parameter (default 200)
- Home intro section in `index.astro` marked with `data-pagefind-ignore`

---

## [0.4.2] — 2026-03-03

### Added
- `README.md` rewritten — reflects current architecture, removes Oat references, accurate project structure, correct stack

### Changed
- `/posts` no longer redirects to `/posts/1` — `[page].astro` renamed to `[...page].astro`, `index.astro` removed
- `highlight` example removed from `markdown-guide.md` — syntax not supported without a remark plugin

---

## [0.4.1] — 2026-03-03

### Changed

- Updated `og-default.png`
- Updated `home.md` with template description

---

## [0.4.0] — 2026-03-03

### Added

- Pagefind static search — indexed at build time via `@pagefind/default-ui`
- `Search.astro` component — Pagefind UI with URL query param sync (`?q=`), styled via Muul CSS tokens
- `/search` page using `Search.astro`
- Pagefind index metadata in `BlogLayout` — title, date sort, collection filter, per-tag filters via `data-pagefind-*` attributes
- `data-pagefind-body` on `<article>` — scopes index to post prose only, excludes header/footer/nav
- `astro-expressive-code` integration — copy button, line numbers, line marking, light/dark theme sync
- `LICENSE` file (MIT)

### Changed

- `npm run build` now runs `pagefind --site dist` automatically after Astro build
- Search added to default navigation in `site.config.ts`
- Expressive Code uses `github-light` / `github-dark` themes, overridden with Muul tokens
- Content fixes: Oat reference removed from `markdown-guide.md`, series field descriptions updated in `getting-started.md`

---

## [0.3.2] — 2026-03-03

### Added
- `SeriesNav` is now collapsible using native `<details>`/`<summary>` — no JavaScript

### Changed
- `<article>` in `BlogLayout` now contains only `PageHeader` + `post-content` — semantic boundary for search indexing
- `SeriesNav` and related posts moved outside `<article>` — discovery elements, not content
- `getRelatedPosts` now sorts by date descending — tags used only to find candidates, not to rank

---

## [0.3.1] — 2026-02-28

### Changed
- Colour token system redesigned — three roles × three tones
- `--muted-foreground` → `--foreground-subtle`
- `--faint` → `--background-subtle`
- `--warning` (mark element tint) → `--accent-minimal`
- Removed `--primary`, `--secondary`, `--card`, `--ring`, `--input`, `--danger`, `--success`, `--warning` — not needed for content sites
- `theme.css` updated with full new palette (Flexoki tones)
- `tokens.css` updated — colour tokens removed, now solely in `theme.css`
- `CLAUDE.md` updated with colour token reference table

---

## [0.3.0] — 2026-02-28

### Added
- Custom CSS architecture replacing Oat.ink — six purpose-scoped files under `src/styles/`
- `reset.css` — minimal browser normalisation
- `tokens.css` — CSS custom property names and static design scale values
- `theme.css` — full Flexoki-inspired light/dark palette using `light-dark()`
- `base.css` — semantic element styles (no class selectors)
- `typography.css` — prose rhythm scoped to `.post-content` only
- `components.css` — layout utilities (`.container`, `.article`, `.nav-link`)
- `global.css` rewritten as a pure `@layer` entry point with Tailwind hook comment
- `CLAUDE.md` — Claude Code project reference (auto-detected)

### Changed
- Removed `@knadh/oat` dependency entirely
- Tag links in `PostHeader` are now plain `<a>` elements with `#` prefix — no badge styling
- Theme toggle button is unstyled — `class="theme-toggle"` scoped to `Header.astro` only
- Mobile nav hamburger is unstyled — visual behaviour via component-scoped CSS
- 404 "back home" is now a plain `<a>` link — no button classes
- `about.md` and `muul-philosophy.md` updated to remove Oat references

### Removed
- `@knadh/oat` from `package.json`
- All Oat class API usage: `.outline`, `.ghost`, `.badge`, `.button`, `--_hov` pattern
- Oat's `button[data-variant]` attribute pattern

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