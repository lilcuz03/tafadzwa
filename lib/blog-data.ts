// ─── Blog Post Data ────────────────────────────────────────────────────────────

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  featured?: boolean;
  coverImage: string; // path relative to /public e.g. "/images/blog/my-post.jpg"
  tags: string[];
  content: string;
};

export const categories = [
  "All",
  "Development",
  "Mobile",
  "Business",
  "Design",
];

export const posts: Post[] = [
  {
    slug: "why-nextjs-for-sa-businesses",
    title: "Why I Build Every Client Site with Next.js",
    excerpt:
      "Performance, SEO, and developer experience — here's why Next.js is my go-to for South African businesses that need to be found online.",
    category: "Development",
    date: "Jun 2026",
    readTime: "5 min read",
    featured: true,
    tags: ["Next.js", "SEO", "South Africa"],
    coverImage: "/images/blog/nextjs-sa.jpg",
    content: `
      <p>When a client in South Africa asks me to build their website, the first decision is already made: it's going to be Next.js. Here's why.</p>
      <h2>SEO That Actually Works</h2>
      <p>Most SA businesses rely on Google to bring in customers. Next.js gives me server-side rendering and static generation out of the box — meaning Google can crawl every page properly. No hydration delays, no empty shells.</p>
      <p>For local businesses competing in areas like Durban, Cape Town, or Joburg, this matters more than people think. A React SPA with client-side rendering is invisible to Google compared to a properly rendered Next.js page.</p>
      <h2>Speed on South African Networks</h2>
      <p>Not everyone in SA has fibre. Many users are on mobile data with varying speeds. Next.js lets me optimise images automatically, lazy-load components, and ship minimal JavaScript. The result is a site that loads fast on a R99/month data plan.</p>
      <h2>Developer Experience</h2>
      <p>File-based routing, API routes, server components — I can build a full-stack app without leaving the framework. For freelance work where I'm handling everything myself, this speed matters. Less setup, more shipping.</p>
      <h2>The Stack That Pairs With It</h2>
      <p>I pair Next.js with Tailwind CSS for styling, Supabase for the backend when I need one, and Vercel for deployment. The whole stack is free to start and scales when needed. Perfect for SA small businesses that need professional results on a budget.</p>
      <p>If you're a business owner considering a new website, feel free to reach out — I'd love to chat about what Next.js can do for you.</p>
    `,
  },
  {
    slug: "react-native-vs-flutter-2026",
    title: "React Native vs Flutter in 2026 — An Honest Take",
    excerpt:
      "I've shipped production apps in both. Here's what I'd actually pick depending on the project, team, and budget.",
    category: "Mobile",
    date: "May 2026",
    readTime: "7 min read",
    featured: true,
    tags: ["React Native", "Flutter", "Mobile"],
    coverImage: "/images/blog/rn-vs-flutter.jpg",
    content: `
      <p>This isn't another "which is better" article. I've built real apps in both React Native and Flutter, and the honest answer is: it depends.</p>
      <h2>When I Reach for React Native</h2>
      <p>If the team already knows JavaScript/TypeScript, React Native is the obvious choice. The ecosystem is massive, npm packages cover almost everything, and sharing logic with a Next.js web app is trivial.</p>
      <p>For startups that need to move fast and might pivot, React Native's flexibility and the ability to share code across web and mobile is a real advantage.</p>
      <h2>When Flutter Makes More Sense</h2>
      <p>Flutter's rendering engine means pixel-perfect UI across platforms with zero platform-specific quirks. If the app is heavily custom UI — think animations, complex layouts, branded experiences — Flutter delivers consistency that React Native sometimes struggles with.</p>
      <p>Dart is also a genuinely pleasant language once you get past the initial learning curve.</p>
      <h2>Performance in 2026</h2>
      <p>Both are fast enough for 95% of apps. The "React Native is slow" narrative is outdated — the new architecture with Fabric and TurboModules has closed the gap significantly. Flutter was always fast.</p>
      <h2>My Default?</h2>
      <p>For most client projects, I default to React Native because my web stack is already TypeScript-heavy. But I genuinely enjoy Flutter and reach for it when the project calls for it.</p>
    `,
  },
  {
    slug: "ai-agents-small-business",
    title: "How AI Agents Can Help Small SA Businesses",
    excerpt:
      "WhatsApp bots, automated customer support, and lead capture — practical AI automation that doesn't need a big budget.",
    category: "Business",
    date: "May 2026",
    readTime: "6 min read",
    tags: ["AI", "WhatsApp", "Automation", "South Africa"],
    coverImage: "/images/blog/ai-agents.jpg",
    content: `
      <p>AI isn't just for big tech companies. Small businesses in South Africa can use AI agents to automate repetitive tasks, capture leads, and provide 24/7 customer support — all without hiring extra staff.</p>
      <h2>WhatsApp Customer Support Agents</h2>
      <p>WhatsApp is how South Africa communicates. An AI agent that handles common questions, takes bookings, and escalates complex issues to a human can save hours every day. I build these using LangChain and open-source models — no expensive API fees.</p>
      <h2>Lead Capture That Works While You Sleep</h2>
      <p>A chatbot on your website that qualifies leads, asks the right questions, and sends you a summary via email or WhatsApp. No more missed enquiries because you were busy on a job site.</p>
      <h2>The Cost?</h2>
      <p>Using self-hosted tools like n8n, Supabase, and open-source LLMs, the running cost can be nearly zero. The main investment is the setup — which is where I come in.</p>
      <p>If you're a small business owner curious about what AI could do for you, let's have a conversation. No jargon, no upselling — just practical solutions.</p>
    `,
  },
  {
    slug: "supabase-vs-firebase",
    title: "Supabase vs Firebase — Which Backend Should You Choose?",
    excerpt:
      "A real-world comparison after building multiple projects on both. Spoiler: there's no universal winner.",
    category: "Development",
    date: "Apr 2026",
    readTime: "8 min read",
    tags: ["Supabase", "Firebase", "Backend"],
    coverImage: "/images/blog/supabase-firebase.jpg",
    content: `
      <p>I've shipped projects on both Supabase and Firebase. Here's my honest breakdown after using them in production.</p>
      <h2>Supabase: The SQL Option</h2>
      <p>Supabase is Postgres under the hood. If you know SQL, you'll feel at home. Row-level security is powerful once you understand it, and the realtime subscriptions work great. The dashboard is clean and the docs are excellent.</p>
      <p>I use Supabase for most of my projects because I prefer relational data and the ability to write raw SQL when I need to.</p>
      <h2>Firebase: The NoSQL Option</h2>
      <p>Firebase is mature, battle-tested, and has features Supabase is still building — like Firebase Auth's phone authentication and Firebase ML. Firestore's document model is intuitive for simple apps.</p>
      <p>The downside is vendor lock-in. Once you're deep in Firebase, moving off it is painful.</p>
      <h2>My Recommendation</h2>
      <p>For new projects in 2026, I default to Supabase. Open source, SQL-based, generous free tier, and the ecosystem is growing fast. But Firebase is still the right choice if you need specific features it offers.</p>
    `,
  },
  {
    slug: "freelancing-sa-developer",
    title: "Freelancing as a Developer in South Africa",
    excerpt:
      "Lessons from my first year building client projects — finding work, pricing, managing expectations, and staying sane.",
    category: "Business",
    date: "Apr 2026",
    readTime: "6 min read",
    tags: ["Freelancing", "Career", "South Africa"],
    coverImage: "/images/blog/freelancing-sa.jpg",
    content: `
      <p>Freelancing in South Africa as a developer is different from freelancing in the US or Europe. Here's what I've learned.</p>
      <h2>Finding Clients</h2>
      <p>Upwork and Fiverr work, but the competition is global. Local networking — WhatsApp groups, Facebook business groups, word of mouth — has brought me more work than any platform. SA business owners want to talk to someone who understands their context.</p>
      <h2>Pricing</h2>
      <p>Don't race to the bottom. A well-built Next.js site with proper SEO is worth more than a cheap WordPress template. Educate clients on the value, show them competitors' sites, and price based on the outcome you're delivering.</p>
      <h2>Managing Expectations</h2>
      <p>Scope creep is real. I now send a clear brief before starting any project — what's included, what's not, and what revision rounds look like. It's saved me from many headaches.</p>
      <h2>Staying Motivated</h2>
      <p>Freelancing can be lonely. I keep myself sharp by building side projects, learning new tech, and connecting with other developers online. The chess board helps too — it teaches patience.</p>
    `,
  },
  {
    slug: "tailwind-design-system",
    title: "Building a Design System with Tailwind CSS",
    excerpt:
      "How I structure tokens, components, and spacing to keep every project consistent without slowing down.",
    category: "Design",
    date: "Mar 2026",
    readTime: "5 min read",
    tags: ["Tailwind CSS", "Design Systems", "CSS"],
    coverImage: "/images/blog/tailwind-design.jpg",
    content: `
      <p>Every project I build uses Tailwind CSS. But without structure, Tailwind can become a mess of utility classes. Here's how I keep things clean.</p>
      <h2>Design Tokens in tailwind.config</h2>
      <p>I define all colours, spacing, and font sizes in the Tailwind config. This gives me a single source of truth. When a client wants to change their brand colour, I change one value and it propagates everywhere.</p>
      <h2>Component Patterns</h2>
      <p>I build reusable components for buttons, cards, inputs, and sections. Each component has sensible defaults but accepts variants via props. This speeds up every new page.</p>
      <h2>Spacing & Typography</h2>
      <p>I use a consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64) and stick to 2-3 font sizes per page. Constraint breeds consistency.</p>
      <h2>Dark Mode</h2>
      <p>With CSS custom properties and Tailwind's dark mode support, switching themes is straightforward. I design dark-first since most developer portfolios and modern apps default to dark.</p>
      <p>A good design system isn't about perfection — it's about making the next page faster to build than the last one.</p>
    `,
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function getAllPosts(): Post[] {
  return posts;
}
