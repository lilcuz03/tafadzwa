// lib/posts.ts

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  author: string;
  category: "Business Growth" | "Web Development" | "Case Study";
  tags: string[];
};

// ─────────────────────────────────────────────
// Sample blog posts (you can replace anytime)
// ─────────────────────────────────────────────

const posts: Post[] = [
  {
    slug: "building-a-fast-nextjs-blog",
    title: "Building a Fast, SEO-Optimised Next.js Blog",
    excerpt:
      "A breakdown of how to build a high-performance blog using Next.js App Router, MDX, and modern SEO practices.",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070",
    date: "2026-06-10",
    readTime: "6 min read",
    author: "Tafadzwa Chiripanyanga",
    category: "Web Development",
    tags: ["Next.js", "SEO", "MDX", "App Router"],
    content: `
## Why performance matters

In modern web development, speed is everything. A slow blog loses users before they even read the first paragraph.

## Using Next.js App Router

Next.js App Router allows server components and better performance out of the box.

### Key benefits:
- Faster initial load
- Better SEO
- Cleaner architecture

## MDX for flexibility

MDX allows you to write Markdown with React components inside it.

\`\`\`js
console.log("Hello Next.js blog");
\`\`\`

## Final thoughts

A well-optimised blog is not just about design — it's about structure, speed, and SEO.
    `,
  },

  {
    slug: "how-i-help-businesses-grow-online",
    title: "How I Help Businesses Grow Online Using Simple Web Systems",
    excerpt:
      "A look into my approach to building conversion-focused websites for small and medium businesses.",
    coverImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2070",
    date: "2026-06-05",
    readTime: "5 min read",
    author: "Tafadzwa Chiripanyanga",
    category: "Business Growth",
    tags: ["Business", "Web Design", "SEO", "Conversion"],
    content: `
## The problem most businesses face

Most websites look good but don’t generate leads.

## My approach

I focus on:
- Speed
- Clear messaging
- Strong call-to-actions

## Simple example

A basic change like improving your headline can increase conversions significantly.

## Conclusion

Websites should be tools, not just online brochures.
    `,
  },

  {
    slug: "case-study-local-business-growth",
    title: "Case Study: How a Local Business Improved Leads by 3x",
    excerpt:
      "A breakdown of how simple UX and SEO changes resulted in massive growth for a small business.",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    date: "2026-05-28",
    readTime: "7 min read",
    author: "Tafadzwa Chiripanyanga",
    category: "Case Study",
    tags: ["Case Study", "SEO", "UX", "Conversion"],
    content: `
## The starting point

The business had traffic but very few enquiries.

## What we changed

- Improved page speed
- Rewrote headings
- Added clear CTA buttons
- Improved mobile UX

## Results

Within weeks:
- 3x more enquiries
- Lower bounce rate
- Higher engagement

## Key lesson

Small UX improvements can lead to big business results.
    `,
  },
];

// ─────────────────────────────────────────────
// Helpers (used in your blog page)
// ─────────────────────────────────────────────

export function getAllPosts(): Post[] {
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((post) => post.slug);
}
