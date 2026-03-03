# Muul — मूळ

A minimal Astro blog template built for writers. Zero framework dependencies. Semantic HTML. Readable typography.

![Muul preview](./preview.png)

**[Live Demo](https://muul.amitkul.in)** · **[Getting Started Guide](https://muul.amitkul.in/posts/getting-started)**

---

## What it is

Muul (मूळ, Sanskrit for *foundation*) is a personal blog template that gets out of the way. No Tailwind. No React. No icon libraries. No build complexity.

- Posts organised by year, with tag pages and post counts
- Series support — collapsible navigation, ordered posts
- Paginated post index
- Static search via Pagefind — indexed at build time, tag-filterable
- Syntax highlighting via Expressive Code — copy button, line marking, light/dark theme sync
- Light/dark theme — system preference aware, no flash on load
- Readable typography — serif body, sans headings, mono code
- Flexoki-inspired colour palette — one file to make it yours
- Related posts, reading time, RSS feed with XSL stylesheet
- SEO — canonical, Open Graph, Twitter card, article metadata
- Sitemap, accessible markup throughout

---

## Quick start

```bash
git clone https://github.com/ak0r/muul.git muul
cd muul
npm install
npm run dev
```

Build and preview (search requires a build):

```bash
npm run build
npm run preview
```

---

## Configuration

Edit `src/site.config.ts` — this is the single source of truth for title, author, navigation, social links, and pagination settings.

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
  postsPerPage: 12,
};
```

## Theming

All colours live in `src/styles/theme.css` as `light-dark()` CSS variables. Edit values there — nothing else needs to be touched.

---

## Post frontmatter

```markdown
---
title: "Post Title"
description: "Optional — used for SEO."
published: 2026-01-01
tags:
  - tag-name
cover: /images/cover.jpg     # optional
draft: false                 # true hides from all lists
series: "Series Name"        # optional — groups posts into a series
order: 1                     # position within the series
---
```

---

## Project structure

```
src/
├── components/
│   ├── Header.astro         # sticky nav, theme toggle, mobile menu
│   ├── Footer.astro         # copyright + social links
│   ├── PageHeader.astro     # title + optional meta slot
│   ├── Search.astro         # Pagefind UI with URL query sync
│   ├── SeriesNav.astro      # collapsible series ToC + prev/next
│   ├── SEO.astro            # canonical, OG, Twitter card
│   └── ThemeInit.astro      # FOUC-prevention inline script
├── content/
│   ├── posts/               # blog posts (.md / .mdx)
│   └── pages/               # static pages (home, about…)
├── layouts/
│   ├── BaseLayout.astro     # HTML shell, header, footer
│   ├── BlogLayout.astro     # post wrapper — series nav, related posts
│   └── PageLayout.astro     # static page wrapper
├── pages/
│   ├── index.astro          # home — recent posts grouped by year
│   ├── search.astro         # Pagefind search page
│   ├── 404.astro
│   ├── posts/
│   │   ├── [...page].astro  # paginated post index — page 1 at /posts
│   │   └── [...slug].astro  # individual post pages
│   └── tags/
│       ├── index.astro      # all tags with counts
│       └── [tag].astro      # posts filtered by tag
├── styles/
│   ├── global.css           # @layer entry point
│   ├── reset.css            # minimal browser normalisation
│   ├── tokens.css           # design scale (spacing, type, radius)
│   ├── theme.css            # light-dark() colour palette — edit this
│   ├── base.css             # semantic element styles
│   ├── typography.css       # prose rhythm inside .post-content
│   └── components.css       # layout utilities (.container, .nav-link…)
├── utils/
│   ├── content.utils.ts     # groupByYear, getRelatedPosts, calculateReadingTime
│   └── string.utils.ts      # slugify, humanize, titleify, truncate
├── content.config.ts        # collection schemas
└── site.config.ts           # all site-wide settings
```

---

## Extending

Muul is a starting point. The CSS layer system is designed to accept Tailwind or any other framework without conflicts — append `@import "tailwindcss";` to `global.css` and it slots in cleanly.

---

## Deployment

Works with any static host. Build output goes to `./dist`.

```bash
npm run build
```

Tested on Cloudflare Pages, Netlify, and Vercel.

---

## Stack

- [Astro 5](https://astro.build)
- [Expressive Code](https://expressive-code.com) — syntax highlighting
- [Pagefind](https://pagefind.app) — static search
- TypeScript
- Plain CSS

---

## License

MIT
