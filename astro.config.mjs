// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: 'https://muul.amitkul.in',
  
  image: {
    responsiveStyles: true,
    layout: "constrained"
  },

  experimental: {
    contentIntellisense: true,
    fonts: [
      {
        name: "Rubik",
        cssVariable: "--font-headings",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Inter",
        cssVariable: "--font-primary",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
      },
      {
        name: "Newsreader",
        cssVariable: "--font-secondary",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["serif"],
      },
      {
        name: "Fira Code",
        cssVariable: "--font-code",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["monospace"],
      },
      {
        name: "Kalam",
        cssVariable: "--font-brand",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["serif"],
      },
    ]
  },

  integrations: [
    // Expressive Code must come before MDX
    expressiveCode({
      // Matches your data-theme attribute toggle
      themes: ['everforest-dark', 'everforest-light'],
      themeCssSelector: (theme) => 
        theme.name === 'everforest-dark' ? '[data-theme="dark"]' : '[data-theme="light"]',
      styleOverrides: {
        // Tie into Muul's token system
        borderRadius: 'var(--radius)',
        borderColor: 'var(--border)',
        codeFontFamily: 'var(--font-code)',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.6',
        frames: {
          frameBoxShadowCssValue: 'none',
        },
      },
    }),
    mdx(), 
    sitemap(),
    pagefind()
  ],
});