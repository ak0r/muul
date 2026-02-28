export const siteConfig = {
  url: "https://muul.amitkul.in",
  title: "Muul",
  description: "A foundational personal blog.",
  author: "Amit K",
  social: [
    {
      title: "GitHub",
      url: "https://github.com/",
      icon: "github",
    },
    {
      title: "X",
      url: "https://x.com/",
      icon: "twitter",
    },
    {
      title: "Instagram",
      url: "https://instagram.com/",
      icon: "instagram",
    },
  ],
  navigation: [
    { title: "Articles", url: "/posts" },
    { title: "Tags", url: "/tags" },
    { title: "About", url: "/about" },
  ],
  recentPosts: 8,
  relatedPosts: 4,
  postsPerPage: 12,
} as const;