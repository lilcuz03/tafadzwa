import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  ArrowRight,
  Mail,
} from "lucide-react";
import { posts, getPostBySlug, getAllSlugs } from "@/lib/blog-data";

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Taffy`,
      description: post.excerpt,
      type: "article",
      url: `https://tafadzwa.site/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const currentIndex = posts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-400/[0.05] blur-[100px]" />
        <div className="absolute top-[60%] -left-32 w-[350px] h-[350px] rounded-full bg-emerald-400/[0.04] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[720px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Header ──────────────────────────────────────────────────── */}
        <section className="pt-[clamp(6rem,10vw,8rem)] pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-0.5">
              <Tag className="w-2.5 h-2.5 text-cyan-400" />
              <span className="text-[10.5px] text-cyan-300 font-medium">
                {post.category}
              </span>
            </span>
            <span className="text-[11.5px] text-slate-500 inline-flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="text-[11.5px] text-slate-500 inline-flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(1.6rem,5vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.15] mb-5">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-[clamp(0.95rem,2vw,1.05rem)] text-slate-400 leading-[1.75] font-light border-l-2 border-cyan-400/30 pl-5">
            {post.excerpt}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-slate-500 bg-white/[0.03] border border-white/[0.06] rounded-md px-2 py-0.5 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/[0.06] to-transparent mb-10" />

        {/* ── Article body ─────────────────────────────────────────────── */}
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ── Author / CTA ─────────────────────────────────────────────── */}
        <div className="mt-14 mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-cyan-400/[0.05] blur-[50px] pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-slate-100 mb-1">
                Written by Taffy
              </p>
              <p className="text-[13px] text-slate-500 font-light">
                Fullstack developer based in Durban, South Africa.
              </p>
            </div>
            <a
              href="mailto:tafadzwachiri03@outlook.com"
              className="inline-flex items-center gap-2 text-[12.5px] font-bold px-4 py-2 rounded-xl text-[#060a0a] flex-shrink-0"
              style={{
                background: "linear-gradient(110deg, #22d3ee, #4ade80)",
              }}
            >
              <Mail className="w-3.5 h-3.5" />
              Get in touch
            </a>
          </div>
        </div>

        {/* ── Prev / Next navigation ──────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8 border-t border-white/[0.06]">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-cyan-400/20 transition-all"
            >
              <span className="text-[11px] text-slate-600 inline-flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous
              </span>
              <span className="text-[13.5px] font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-emerald-400/20 transition-all text-right"
            >
              <span className="text-[11px] text-slate-600 inline-flex items-center gap-1 justify-end">
                Next <ArrowRight className="w-3 h-3" />
              </span>
              <span className="text-[13.5px] font-medium text-slate-300 group-hover:text-white transition-colors leading-snug">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* ── Back to blog ─────────────────────────────────────────────── */}
        <div className="pb-16 pt-4 flex justify-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
