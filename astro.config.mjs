// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';

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
        name: "Newsreader",
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
        fallbacks: ["serif"],
      },
      {
        name: "Rubik",
        cssVariable: "--font-secondary",
        provider: fontProviders.fontsource(),
        weights: [400, 500, 600, 700],
        fallbacks: ["sans-serif"],
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

  integrations: [mdx()],

});