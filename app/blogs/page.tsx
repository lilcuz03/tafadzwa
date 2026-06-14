import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog-data";
import { FiArrowRight, FiClock, FiTag } from "react-icons/fi";
import Image from "next/image";

// ─── SEO ──────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Blog | Tafadzwa Chiripanyanga",
  description:
    "Insights on web development, digital strategy, and growing your South African business online — written by fullstack developer Tafadzwa Chiripanyanga.",
  keywords: [
    "web development blog South Africa",
    "Next.js South Africa",
    "small business website tips",
    "digital marketing South Africa",
    "Tafadzwa Chiripanyanga",
  ],
  openGraph: {
    title: "Blog | Tafadzwa Chiripanyanga",
    description:
      "Insights on web development, digital strategy, and growing your South African business online.",
    url: "https://tafadzwa.site/blog",
    siteName: "Tafadzwa Chiripanyanga",
    type: "website",
  },
  alternates: { canonical: "https://tafadzwa.site/blog" },
};

// ─── Category colour map ──────────────────────────────────────────────────────

const categoryStyle: Record<string, string> = {
  "Business Growth": "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  "Web Development": "bg-violet-500/10 border-violet-500/20 text-violet-300",
  "Case Study": "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
};

const fallbackCategoryStyle = "bg-white/5 border-white/10 text-gray-400";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-24 pb-16 text-center">
          <span className="text-cyan-400 text-xs uppercase tracking-[4px] font-medium">
            Insights
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight tracking-tight">
            Blog
          </h1>
          <p className="text-gray-400 mt-5 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Practical advice on web development, digital strategy, and building
            a stronger online presence for your South African business.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 bg-white/5 border border-white/10 rounded-full px-5 py-2.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-gray-300 text-sm font-medium">
              {posts.length} articles published
            </span>
          </div>
        </section>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── FEATURED POST ────────────────────────────────────────────────── */}
        {featured && (
          <section
            className="py-12"
            aria-label="Featured article"
          >
            <p className="text-xs uppercase tracking-[3px] text-gray-500 font-medium mb-6">
              Featured
            </p>
            <Link
              href={`/blog/${featured.slug}`}
              className="group flex flex-col lg:flex-row gap-0 border border-white/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
              aria-label={`Read: ${featured.title}`}
            >
              {/* Cover image */}
              <div className="relative w-full lg:w-[52%] shrink-0 aspect-[16/9] lg:aspect-auto lg:min-h-[360px] overflow-hidden">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30 hidden lg:block" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center gap-5 p-7 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-medium border rounded-full px-3 py-1 ${
                      categoryStyle[featured.category] ?? fallbackCategoryStyle
                    }`}
                  >
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <FiClock
                      className="text-[11px]"
                      aria-hidden="true"
                    />
                    {featured.readTime}
                  </span>
                  <span className="text-xs text-gray-600">
                    {new Date(featured.date).toLocaleDateString("en-ZA", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight text-white group-hover:text-cyan-50 transition-colors">
                  {featured.title}
                </h2>

                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {featured.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 text-xs text-gray-500 bg-white/[0.04] border border-white/10 rounded-full px-2.5 py-1"
                    >
                      <FiTag
                        className="text-[10px]"
                        aria-hidden="true"
                      />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-2 group-hover:gap-3 transition-all duration-200">
                  Read article
                  <FiArrowRight aria-hidden="true" />
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        {rest.length > 0 && <div className="h-px bg-white/10" />}

        {/* ── REST OF POSTS ────────────────────────────────────────────────── */}
        {rest.length > 0 && (
          <section
            className="py-12"
            aria-label="All articles"
          >
            <p className="text-xs uppercase tracking-[3px] text-gray-500 font-medium mb-8">
              All articles
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col border border-white/10 hover:border-cyan-500/40 rounded-2xl overflow-hidden bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
                  aria-label={`Read: ${post.title}`}
                >
                  {/* Cover image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4 p-6 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-medium border rounded-full px-3 py-1 ${
                          categoryStyle[post.category] ?? fallbackCategoryStyle
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <FiClock
                          className="text-[11px]"
                          aria-hidden="true"
                        />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-cyan-50 transition-colors flex-1">
                      {post.title}
                    </h2>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-auto">
                      <span className="text-xs text-gray-600">
                        {new Date(post.date).toLocaleDateString("en-ZA", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                        Read <FiArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="py-16 text-center">
          <p className="text-gray-500 text-sm">
            Want to discuss your project?{" "}
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
            >
              Get in touch
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
