# Muul — Claude Code Reference

This file is auto-detected by Claude Code. Read it before making any changes.

---

## What this project is

**Muul** (मूळ, Sanskrit: *foundation*) is a minimal personal blog template built on Astro 5.
Philosophy: semantic HTML first, no framework dependencies, composable by design.
Version: 0.5.0

---

## Project structure

```
muul/
├── public/
│   ├── favicon.svg
│   ├── og-default.png          # Social share OG image
│   └── rss/styles.xsl          # RSS browser stylesheet
├── src/
│   ├── components/
│   │   ├── Head.astro          # All <head> content — fonts, meta, SEO slot, ThemeInit
│   │   ├── Header.astro        # Sticky nav + theme toggle (do not break toggle script)
│   │   ├── Footer.astro        # Social links from siteConfig
│   │   ├── PageHeader.astro    # Shared page header — title + optional meta slot
│   │   ├── SeriesNav.astro     # Series ToC + prev/next
│   │   ├── SEO.astro           # OG, Twitter, canonical meta
│   │   ├── Search.astro        # Pagefind search UI + URL query sync
│   │   └── ThemeInit.astro     # Inline script — prevents FOUC (used inside Head.astro)
│   ├── content/
│   │   ├── posts/              # Blog posts (.md / .mdx)
│   │   └── pages/             # Static pages (.md / .mdx)
│   ├── layouts/
│   │   ├── BaseLayout.astro    # HTML shell — uses Head, owns main with four named slots
│   │   ├── BlogLayout.astro    # Post wrapper — fills BaseLayout slots directly
│   │   └── PageLayout.astro    # Static page wrapper — fills BaseLayout slots directly
│   ├── pages/
│   │   ├── index.astro         # Home — recent posts from siteConfig.recentPosts
│   │   ├── 404.astro
│   │   ├── [page].astro        # Dynamic route for pages/ collection
│   │   ├── search.astro        # Pagefind search UI
│   │   ├── rss.xml.ts
│   │   ├── posts/
│   │   │   ├── [...page].astro # Paginated post index — page 1 at /posts
│   │   │   └── [...slug].astro # Individual post pages
│   │   └── tags/
│   │       ├── index.astro     # All tags with counts
│   │       └── [tag].astro     # Posts by tag
│   ├── styles/
│   │   ├── global.css          # Entry point — @layer declaration + imports only
│   │   ├── reset.css           # Minimal browser normalisation
│   │   ├── tokens.css          # CSS custom property names + static scale values
│   │   ├── theme.css           # light-dark() colour values — user-editable
│   │   ├── base.css            # Semantic element styles (a, h1–h6, code, table…)
│   │   ├── typography.css      # Prose rhythm scoped to .post-content
│   │   └── components.css      # Layout classes (.container, .article, .nav-link…)
│   ├── schemas/
│   │   ├── base.schema.ts      # Universal base — title, description, draft (no date)
│   │   ├── post.schema.ts      # Extends base — published (required), cover, tags, series, order
│   │   ├── page.schema.ts      # Extends base — updated (optional)
│   │   └── index.ts            # Barrel export — baseSchema, postSchema, pageSchema + types
│   ├── utils/
│   │   ├── content.utils.ts    # groupByYear, getRelatedPosts, calculateReadingTime
│   │   └── string.utils.ts     # slugify, humanize, titleify, truncate
│   ├── content.config.ts       # Collection schemas (posts, pages)
│   └── site.config.ts          # All site-wide settings — edit this first
├── astro.config.mjs
├── package.json
├── CHANGELOG.md
├── LICENSE
└── CLAUDE.md                   # This file
```

---

## Common tasks

### Add a post
Create `src/content/posts/my-post.md` with required frontmatter:

```markdown
---
title: "My Post"
description: "Optional — used for SEO"
published: 2026-01-01
tags:
  - writing
---
```

### Add a static page
Create `src/content/pages/my-page.md`. It gets a route at `/my-page` automatically.
To reserve a page from routing, add its `id` to the `RESERVED` array in `src/pages/[page].astro`.

### Change site metadata
Edit `src/site.config.ts`. This is the single source of truth for title, author, nav, social links, and pagination.

### Change colours
Edit `src/styles/theme.css`. Only edit this file for visual changes — token names are in `tokens.css`.

### Add Tailwind v4
Append to `src/styles/global.css` after the existing imports:
```css
@import "tailwindcss";
```
No conflicts — Tailwind slots after the named layers declared in global.css.

### Add a font
1. Add the font config to `experimental.fonts` in `astro.config.mjs`
2. Add the matching `<Font cssVariable="..." />` in `src/layouts/BaseLayout.astro`
3. Reference the CSS variable in `theme.css` comments or `base.css`

### Run dev server
```bash
npm run dev
```

### Build
```bash
npm run build       # builds to ./dist then runs pagefind --site dist
npm run preview     # preview the build locally (search works here, not in dev)
```

### Search
Search is powered by Pagefind — a static search index generated at build time.
- Works only after `npm run build` — the `/pagefind/` directory is generated into `dist/`
- In dev mode, the search page loads but returns no results
- To test search: `npm run build && npm run preview`
- Search is scoped to `<article>` elements — only post prose is indexed, not series nav or related posts
- The search page is `noindex` — it won't appear in search engines

---

## CSS architecture

Layers (lowest → highest specificity):

| Layer        | File              | Contents                              |
|--------------|-------------------|---------------------------------------|
| `reset`      | reset.css         | box-sizing, margin, tap-highlight     |
| `tokens`     | tokens.css        | spacing, type scale, radius, weights  |
| `theme`      | theme.css         | light-dark() colour values            |
| `base`       | base.css          | element selectors (a, h1, code…)      |
| `typography` | typography.css    | prose rhythm inside .post-content     |
| `components` | components.css    | class selectors (.container, .nav…)   |

**Rules:**
- `base.css` — element selectors only, no classes
- `components.css` — class selectors only, no element selectors
- `theme.css` — colour assignments only, no layout
- Scale values (spacing, type, radius) live in `tokens.css`
- Colour token names and values both live in `theme.css`

### Colour token system

Three roles × three tones. Edit values in `theme.css` only.

| Token                  | Role                                        |
|------------------------|---------------------------------------------|
| `--background`         | Page canvas                                 |
| `--background-subtle`  | Raised surfaces — cards, code blocks        |
| `--background-minimal` | Hover states, disabled surfaces             |
| `--foreground`         | Body text, headings                         |
| `--foreground-subtle`  | Meta text — dates, read time, tag labels    |
| `--foreground-minimal` | Disabled text, placeholders                 |
| `--border`             | Default dividers and outlines               |
| `--border-subtle`      | Softer dividers — internal card borders     |
| `--border-minimal`     | Barely-there separators                     |
| `--accent`             | Active/interactive — links, focus rings     |
| `--accent-subtle`      | Hover backgrounds on interactive elements   |
| `--accent-minimal`     | Light tint, selection highlight             |

To extend with base colours (neutral, red, blue…), add them in `theme.css` below the existing palette, then map semantic tokens on top. The layer system supports this without restructuring.

**Intentionally absent from components:**
- No `.badge` styles — tag links are plain `<a>` elements styled by the component
- No `.button` styles — buttons are unstyled by default; framework adds visual treatment

---

## Naming conventions

- **CSS custom properties:** `--kebab-case` (e.g. `--foreground-subtle`)
- **CSS class names:** `.kebab-case` for utilities, BEM-lite for modifiers (`--` separator, e.g. `.series-link--next`)
- **Astro components:** `PascalCase.astro`
- **Utility files:** `name.utils.ts`
- **Content IDs:** file name without extension (Astro glob loader default)

---

## Critical: do not break these

1. **`ThemeInit.astro` inline script** — runs inside `Head.astro` before body renders, prevents FOUC. Do not move, defer, or async it. Do not move `Head.astro` below `<body>`.
2. **Theme toggle script in `Header.astro`** — reads/writes `localStorage` and `colorScheme`. The icon show/hide logic is CSS-only via `[data-theme]` attribute.
3. **`RESERVED` array in `src/pages/[page].astro`** — must remain inside `getStaticPaths`. Moving it outside causes a runtime error in Astro 5.
4. **`src/pages/posts/[...page].astro` rest param** — do not rename back to `[page].astro`. The rest param is what makes page 1 serve at `/posts` directly without a redirect.
5. **`@layer` declaration in `global.css`** — layer order must be declared before any imports. Do not add styles to `global.css` directly.
6. **`astro.config.mjs` `site` field** — must match the canonical URL used in `siteConfig.url`. Both needed for sitemap and RSS.

---

## What's intentionally absent

- No icon library (SVG icons are inlined where needed)
- No animation library
- No grid framework
- No component UI library
- No Tailwind (but trivially addable — see above)
- No Oat.ink or any third-party CSS dependency
- No JS framework (Astro components only, zero client JS except theme toggle + mobile nav)
- No image optimisation beyond Astro's built-in `responsiveStyles`

---

## Syntax highlighting

Handled by [Expressive Code](https://expressive-code.com) via `astro-expressive-code`.

- Configured in `astro.config.mjs` under `expressiveCode({})`
- Uses `everforest-light` / `everforest-dark` themes — warm, muted palette closest to Flexoki
- Theme switching tied to Muul's `data-theme` attribute via `themeCssSelector`:
  ```js
  themeCssSelector: (theme) =>
    theme.name === 'everforest-dark' ? '[data-theme="dark"]' : '[data-theme="light"]'
  ```
- Style overrides use Muul's CSS tokens (`--border`, `--radius`, `--font-code`)
- Supports: copy button, line numbers (`showLineNumbers`), line marking, file name frames, terminal frames
- To add line numbers to a block: ` ```js showLineNumbers `
- To highlight lines: ` ```js {2-4} `

---

## Extending

**New layout types:** Fill `BaseLayout`'s named slots directly — use only what you need:

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import PageHeader from "@/components/PageHeader.astro";
---
<BaseLayout>
  <SEO slot="seo" ... />
  <PageHeader slot="header" {title} />
  <Fragment slot="content">
    <slot />
  </Fragment>
  <Fragment slot="navigation">
    <!-- breadcrumbs, prev/next, etc — omit if unused -->
  </Fragment>
  <!-- after slot omitted — renders nothing -->
</BaseLayout>
```

**BaseLayout slots:**

| Slot | Location | Purpose | BlogLayout | PageLayout |
|------|----------|---------|------------|------------|
| `seo` | `<Head>` | SEO meta tags | ✓ | ✓ |
| `head` | `<Head>` | Extra per-page head tags | — | — |
| `header` | `<main>` | PageHeader | ✓ | ✓ |
| `content` | `<article data-pagefind-body>` | Post/page prose | ✓ | ✓ |
| `navigation` | `<main>` | SeriesNav, breadcrumbs | SeriesNav | — |
| `after` | `<main>` | Related posts, comments | Related posts | — |
| `scripts` | `<body>` end | Per-page scripts | — | — |
| *(default)* | `<main>` | For pages bypassing named slots | — | — |

**Fork schema extension:** Import `baseSchema` from `@/schemas` and extend with your own fields:

```typescript
import { baseSchema } from '@/schemas';
export const postSchema = baseSchema.extend({
  published: z.coerce.date(),
  type: z.enum(['post', 'note']).default('post'),
});
```

**UI framework:** Add Tailwind or UnoCSS — see above. Named layers in global.css prevent conflicts.

**Icons:** Install any icon library (e.g. `astro-icon`) or inline SVGs. No existing icon dependency to conflict with.

**CMS:** Replace content collections with a CMS (Contentful, Sanity, etc.) by updating `src/content.config.ts` and the relevant page loaders.

**Comments:** Add any comment system (Giscus recommended for static sites) as a component in `BlogLayout.astro`.

**Search:** Pagefind is already integrated. See the Search section above for usage notes.

---

## Series posts

Add to frontmatter:
```yaml
series: "Series Name"
order: 1
```

`SeriesNav` renders automatically in `BlogLayout` when two or more posts share the same `series` value.
---

## Current state

Version 0.5.0. Live at [muul.amitkul.in](https://muul.amitkul.in).

**What is complete**
- CSS architecture — six-file layer system, Flexoki token palette
- All core pages — home, posts, tags, search, 404, static pages
- Series support with collapsible `SeriesNav`
- Pagefind static search with tag filters and URL query sync
- Expressive Code syntax highlighting — light/dark theme sync
- Paginated post index at `/posts` (no redirect)
- RSS, sitemap, SEO, OG, Twitter card
- MIT license, README, CHANGELOG, CLAUDE.md
- Schema hierarchy — `baseSchema` → `postSchema` / `pageSchema` with barrel export
- `SiteConfig`, `NavItem`, `SocialItem` types exported from `site.config.ts`
- `Head.astro` — portable `<head>` component, owns fonts, ThemeInit, SEO slot
- `BaseLayout` owns all named slots directly (`header`, `content`, `navigation`, `after`)
- `BlogLayout` and `PageLayout` fill `BaseLayout` slots directly via `<Fragment>`

**Known gaps / next work**
- `<mark>` element styled in `base.css` but no demo content in posts
- Draft post dev indicator — not implemented
- Astro theme submission on hold pending Astro 6 (no timeline)

**Upcoming: Agrima fork**
A personal fork named Agrima will extend Muul with richer content types, gallery components, and personal site features. Built as a separate repo — Muul stays minimal. Agrima uses `ContentLayout` directly for new layout types and extends `baseSchema` for additional frontmatter fields.