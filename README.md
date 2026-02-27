# Muul — मूळ

A minimal Astro blog template built for writers. Zero framework dependencies. Semantic HTML. Readable typography.

![Muul preview](./preview.png)

**[Live Demo](https://muul.amitkul.in)** · **[Getting Started Guide](https://muul.amitkul.in/posts/getting-started)**

---

## What it is

Muul (मूळ, Sanskrit for *foundation*) is a personal blog template that gets out of the way. It uses [Oat.ink](https://oat.ink) as a base styling layer (~8KB CSS/JS) and plain CSS variables for everything else.

- Posts organised by year
- Tag pages with post counts
- Light/dark theme (system preference + toggle)
- Readable typography — serif body, sans headings, mono code
- Flexoki-inspired colour palette
- Related posts by shared tags
- SEO: canonical, Open Graph, Twitter card, article metadata
- Accessible — semantic HTML, `aria-current`, screen reader utilities

No Tailwind. No React. No icon libraries. No build complexity.

---

## Quick start

```bash
git clone https://github.com/ak0r/muul.git muul
cd muul
npm install
npm run dev
```

---

## Project structure

```
src/
├── components/
│   ├── Header.astro        # sticky nav, theme toggle, mobile menu
│   ├── Footer.astro        # copyright + social links
│   ├── PostHeader.astro    # title, date, read time, tag badges
│   ├── ThemeInit.astro     # FOUC-prevention script
│   └── SEO.astro           # title, canonical, OG, Twitter
├── content/
│   ├── posts/              # blog posts (.md / .mdx)
│   └── pages/              # static pages: home, about
├── layouts/
│   ├── BaseLayout.astro    # html shell, header, footer
│   ├── BlogLayout.astro    # post wrapper with related posts
│   └── PageLayout.astro    # static page wrapper
├── pages/
│   ├── index.astro         # home — recent posts grouped by year
│   ├── about.astro
│   ├── 404.astro
│   └── posts/
│       ├── index.astro     # all posts grouped by year
│       └── [...slug].astro # individual post
│   └── tags/
│       ├── index.astro     # all tags with counts
│       └── [tag].astro     # filtered posts by tag
├── styles/
│   ├── global.css          # Oat import + layout overrides
│   └── theme.css           # CSS variable palette (edit this)
├── utils/
│   └── content.utils.ts    # readingTime, groupByYear, relatedPosts
└── site.config.ts          # title, description, nav, social links
```

---

## Configuration

Edit `src/site.config.ts`:

```typescript
export const siteConfig = {
  url: "https://yourdomain.com",
  title: "Site Title",
  description: "Short description.",
  author: "Your Name",
  social: [
    { title: "GitHub", url: "https://github.com/you", icon: "github" },
  ],
  navigation: [
    { title: "Articles", url: "/posts" },
    { title: "Tags", url: "/tags" },
    { title: "About", url: "/about" },
  ],
  recentPosts: 8,
  relatedPosts: 4,
};
```

## Theming

All colours live in `src/styles/theme.css` as `light-dark()` CSS variables. Change values there; nothing else needs to be touched.

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
draft: false               # true hides from all lists
---
```

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
- [Oat.ink](https://oat.ink) — base styles
- TypeScript
- Plain CSS (no Tailwind)

---

## License

MIT
