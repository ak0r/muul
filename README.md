# Muul — मूळ

A minimal Astro 6 blog template built for writers. Zero framework dependencies. Semantic HTML. Readable typography.

**[Live Demo](https://muul.amitkul.in)** · **[Getting Started Guide](https://muul.amitkul.in/posts/getting-started)**

---

## What it is

Muul (मूळ, Sanskrit for *foundation*) is a personal blog template that gets out of the way. No Tailwind. No React. No icon libraries. Plain CSS with a deliberate six-layer architecture and a Flexoki-inspired palette.

- Posts organised by year with ordinal dates
- Tag pages with post counts
- Static search via Pagefind — full-text, tag filters, URL query sync
- Light/dark theme — follows system preference, persists toggle choice
- Readable typography — serif body, sans headings, mono code
- Flexoki-inspired colour palette via `light-dark()` CSS variables
- Series support — collapsible nav, prev/next within a series
- Related posts by shared tags with recency fallback
- SEO — canonical, Open Graph, Twitter card, article metadata
- RSS feed with XSL browser stylesheet
- Content Security Policy configured out of the box
- Accessible — semantic HTML, `aria-current`, screen reader utilities

---

## Requirements

- Node 22+

---

## Quick start

```bash
git clone https://github.com/ak0r/muul.git my-blog
cd my-blog
npm install
npm run dev
```

Search requires a built index. To test search:

```bash
npm run build   # builds site + runs pagefind --site dist
npm run preview
```

---

## Project structure

```
src/
├── components/
│   ├── Head.astro          # All <head> content — fonts, meta, SEO slot, ThemeInit
│   ├── Header.astro        # Sticky nav + theme toggle + mobile menu
│   ├── Footer.astro        # Social links from siteConfig
│   ├── PageHeader.astro    # Shared page title + optional meta slot
│   ├── PostMeta.astro      # Date · read time · tags — shared meta primitive
│   ├── PostItem.astro      # Single post row — title + date
│   ├── PostList.astro      # Year-grouped post list — accepts flat array
│   ├── Tag.astro           # Single tag link with optional count
│   ├── TagList.astro       # Tag cloud — used on tags/index
│   ├── Pagination.astro    # Prev/next controls for paginated routes
│   ├── SeriesNav.astro     # Series ToC + prev/next
│   ├── SEO.astro           # OG, Twitter card, canonical
│   ├── Search.astro        # Pagefind UI — loaded from /pagefind/ static assets
│   └── ThemeInit.astro     # Inline FOUC-prevention script
├── content/
│   ├── posts/              # Blog posts (.md / .mdx)
│   └── pages/              # Static pages (.md / .mdx)
├── layouts/
│   ├── BaseLayout.astro    # HTML shell — Head, Header, Footer, four named slots
│   ├── BlogLayout.astro    # Post wrapper — fills BaseLayout slots via Fragment
│   └── PageLayout.astro    # Static page wrapper — fills BaseLayout slots via Fragment
├── pages/
│   ├── index.astro         # Home — recent posts, home.md intro
│   ├── search.astro        # Pagefind search
│   ├── 404.astro
│   ├── [page].astro        # Dynamic route for pages/ collection
│   ├── rss.xml.ts
│   └── posts/
│   │   ├── [...page].astro # Paginated post index — page 1 at /posts
│   │   └── [...slug].astro # Individual post pages
│   └── tags/
│       ├── index.astro     # All tags with counts
│       └── [tag].astro     # Posts by tag
├── schemas/
│   ├── base.schema.ts      # Universal base — title, description, draft
│   ├── post.schema.ts      # Extends base — published, cover, tags, series, order
│   ├── page.schema.ts      # Extends base — updated (optional)
│   └── index.ts            # Barrel export
├── styles/
│   ├── global.css          # Entry point — @layer declaration + imports only
│   ├── reset.css           # Browser normalisation
│   ├── tokens.css          # Static scale values — spacing, type, radius
│   ├── theme.css           # light-dark() colour values — edit this
│   ├── base.css            # Semantic element styles
│   ├── typography.css      # Prose rhythm scoped to .post-content
│   └── components.css      # Layout classes — .container, .nav-link
└── utils/
    ├── content.utils.ts    # All collection queries + reading time
    └── string.utils.ts     # slugify, humanize, ordinalSuffix…
```

---

## Configuration

Edit `src/site.config.ts` — the single source of truth for all site-wide settings:

```typescript
export const siteConfig = {
  url: "https://yourdomain.com",
  title: "Site Title",
  description: "Short description.",
  author: "Your Name",
  social: [
    { title: "GitHub", url: "https://github.com/you" },
  ],
  navigation: [
    { title: "Articles", url: "/posts" },
    { title: "Tags", url: "/tags" },
    { title: "About", url: "/about" },
    { title: "Search", url: "/search" },
  ],
  recentPosts: 8,
  relatedPosts: 4,
  postsPerPage: 20,
};
```

---

## Theming

All colours live in `src/styles/theme.css` as `light-dark()` CSS variables. Edit values there — nothing else needs to change. The theme toggle sets `color-scheme` on `<html>` which triggers the CSS to switch automatically.

Token system: three roles (`background`, `foreground`, `border`, `accent`) × three tones (`default`, `subtle`, `minimal`).

---

## Post frontmatter

```markdown
---
title: "Post Title"
description: "Optional — used for SEO meta."
published: 2026-01-01
tags:
  - tag-name
cover: /images/cover.jpg   # optional
draft: false               # true hides from all lists in prod
series: "Series Name"      # optional — enables SeriesNav
order: 1                   # position within series
---
```

---

## Search

Search is powered by [Pagefind](https://pagefind.app) — a static index generated at build time.

```bash
npm run build   # astro build + pagefind --site dist
```

Copy the generated `dist/pagefind/` directory to `public/pagefind/` to make search available in dev and preview without rebuilding.

---

## Extending

**New layout:** Fill `BaseLayout`'s named slots directly — no wrapper component needed:

```astro
<BaseLayout>
  <SEO slot="seo" ... />
  <PageHeader slot="header" {title} />
  <Fragment slot="content"><slot /></Fragment>
</BaseLayout>
```

**Fork schema:** Extend `baseSchema` for new frontmatter fields:

```typescript
import { baseSchema } from '@/schemas';
export const mySchema = baseSchema.extend({
  type: z.enum(['post', 'note']).default('post'),
});
```

**Add Tailwind v4:** Append to `src/styles/global.css`:

```css
@import "tailwindcss";
```

No conflicts — Tailwind slots after the named layers already declared.

---

## Stack

- [Astro 6](https://astro.build)
- [Expressive Code](https://expressive-code.com) — syntax highlighting
- [Pagefind](https://pagefind.app) — static search
- TypeScript
- Plain CSS — no Tailwind, no utility framework

---

## License

MIT