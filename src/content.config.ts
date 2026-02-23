import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Define schema for blog posts
const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    series: z.string().optional(),
    order: z.number().optional(),
  }),
})

// Define schema for static pages
const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
})

// Export collections
export const collections = {
  posts, 
  pages
};