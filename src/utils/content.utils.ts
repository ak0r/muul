import type { CollectionEntry } from "astro:content";

const WORDS_PER_MINUTE = 200;

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

/**
 * Calculate reading time from content
 */
export function calculateReadingTime(content: string): ReadingTime {
  if (!content || typeof content !== 'string') {
    return { text: '1 min read', minutes: 1, time: 60000, words: 0 };
  }

  // Remove frontmatter and markdown syntax
  const plainText = content
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '$1')
    .replace(/`{1,3}.*?`{1,3}/gs, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  const words = plainText.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  return {
    text: `${minutes} min read`,
    minutes,
    time: minutes * 60 * 1000,
    words: wordCount,
  };
}

export function groupByYear(
  posts: CollectionEntry<"posts">[]
): Map<number, CollectionEntry<"posts">[]> {
  const groups = new Map<number, CollectionEntry<"posts">[]>();

  for (const post of posts) {
    const year = new Date(post.data.published).getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(post);
  }

  // Sort years descending
  return new Map([...groups.entries()].sort((a, b) => b[0] - a[0]));
}

export function getRelatedPosts(
  current: CollectionEntry<"posts">,
  allPosts: CollectionEntry<"posts">[],
  count: number
): CollectionEntry<"posts">[] {
  const currentTags = current.data.tags ?? [];

  return allPosts
    .filter((post) => post.id !== current.id && !post.data.draft)
    .map((post) => {
      const sharedTags = (post.data.tags ?? []).filter((tag) =>
        currentTags.includes(tag)
      ).length;
      return { post, sharedTags };
    })
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, count)
    .map(({ post }) => post);
}