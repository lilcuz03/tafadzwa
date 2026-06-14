import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/posts";
import { FiArrowLeft, FiClock, FiTag, FiArrowRight } from "react-icons/fi";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── SEO ──────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | Tafadzwa Chiripanyanga`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tafadzwa.site/blog/${post.slug}`,
      siteName: "Tafadzwa Chiripanyanga",
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
    alternates: {
      canonical: `https://tafadzwa.site/blog/${post.slug}`,
    },
  };
}

// ─── MDX component overrides (matches site design system) ────────────────────

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xl sm:text-2xl font-extrabold text-white mt-12 mb-4 leading-snug tracking-tight"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-lg sm:text-xl font-bold text-white mt-8 mb-3 leading-snug"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-gray-400 leading-relaxed text-base sm:text-[17px] mb-6"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="space-y-3 mb-6 pl-1"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="space-y-3 mb-6 pl-1 list-decimal list-inside"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-3 text-gray-400 text-base leading-relaxed">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
      <span {...props} />
    </li>
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong
      className="text-white font-semibold"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    />
  ),
  hr: () => <div className="my-10 h-px bg-white/10" />,
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-cyan-500 pl-5 my-8 text-gray-300 italic text-base sm:text-lg leading-relaxed"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="bg-white/5 border border-white/10 text-cyan-300 rounded px-1.5 py-0.5 text-sm font-mono"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-white/[0.04] border border-white/10 rounded-xl p-5 overflow-x-auto text-sm font-mono text-gray-300 mb-6"
      {...props}
    />
  ),
};

// ─── Category colour map ──────────────────────────────────────────────────────

const categoryStyle: Record<string, string> = {
  "Business Growth": "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
  "Web Development": "bg-violet-500/10 border-violet-500/20 text-violet-300",
  "Case Study": "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
};

const fallbackCategoryStyle = "bg-white/5 border-white/10 text-gray-400";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* ── COVER IMAGE ────────────────────────────────────────────────────── */}
      <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[460px] overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black" />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* ── BACK LINK ──────────────────────────────────────────────────────── */}
        <div className="pt-8 pb-2">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 text-sm transition-colors"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to blog
          </Link>
        </div>

        {/* ── ARTICLE HEADER ───────────────────────────────────────────────── */}
        <header className="py-8 border-b border-white/10">
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
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
            <span className="text-xs text-gray-600">
              {new Date(post.date).toLocaleDateString("en-ZA", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-white">
            {post.title}
          </h1>

          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mt-5">
            {post.excerpt}
          </p>

          {/* Author + tags */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-7">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-sm font-bold">
                T
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {post.author}
                </p>
                <p className="text-xs text-gray-500">Fullstack Developer</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
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
          </div>
        </header>

        {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
        <article className="py-10">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
          />
        </article>

        {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
        <div className="h-px bg-white/10" />

        {/* ── CTA BLOCK ────────────────────────────────────────────────────── */}
        <section className="py-12 text-center">
          <div className="border border-white/10 rounded-2xl p-8 sm:p-12 bg-white/[0.02]">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Ready to grow your business online?
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
              I build fast, SEO-optimised websites for South African businesses.
              Let&apos;s talk about what your business needs.
            </p>
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-black font-bold px-8 py-3.5 rounded-full hover:bg-cyan-400 transition-all duration-200 hover:scale-105 active:scale-100 text-sm mt-7"
            >
              Start a conversation
            </a>
          </div>
        </section>

        {/* ── RELATED POSTS ────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <>
            <div className="h-px bg-white/10" />
            <section
              className="py-12"
              aria-label="Related articles"
            >
              <p className="text-xs uppercase tracking-[3px] text-gray-500 font-medium mb-7">
                Related articles
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-3 border border-white/10 hover:border-cyan-500/40 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
                    aria-label={`Read: ${p.title}`}
                  >
                    <span
                      className={`self-start text-xs font-medium border rounded-full px-3 py-1 ${
                        categoryStyle[p.category] ?? fallbackCategoryStyle
                      }`}
                    >
                      {p.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-50 transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
                      <span className="text-xs text-gray-600">
                        {p.readTime}
                      </span>
                      <span className="text-cyan-400 text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <FiArrowRight aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Bottom spacing */}
        <div className="pb-16" />
      </div>
    </main>
  );
}
