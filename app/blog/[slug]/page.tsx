import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { posts, getPostBySlug, getAllSlugs } from "@/lib/blog-data";

const SITE = "https://tafadzwa.site";
const AUTHOR = "Tafadzwa Chiripanyanga";
const OG_IMAGE = `${SITE}/opengraph-image`;

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
  if (!post) {
    return {
      title: { absolute: "Post not found | taachii" },
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE}/blog/${post.slug}`;
  const title = `${post.title} | taachii`;

  return {
    title: { absolute: title },
    description: post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: AUTHOR, url: SITE }],
    keywords: post.tags,
    robots: { index: true, follow: true },
    openGraph: {
      type: "article",
      url,
      siteName: "taachii",
      locale: "en_ZA",
      title,
      description: post.excerpt,
      authors: [AUTHOR],
      section: post.category,
      tags: post.tags,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.excerpt,
      images: [OG_IMAGE],
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

  const url = `${SITE}/blog/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: url,
        inLanguage: "en-ZA",
        articleSection: post.category,
        keywords: post.tags.join(", "),
        image: OG_IMAGE,
        author: { "@type": "Person", name: AUTHOR, url: SITE },
        publisher: { "@type": "Organization", name: "taachii", url: SITE },
        isPartOf: { "@id": `${SITE}/blog#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <main
      id="top"
      className="gutter relative pb-[clamp(4rem,10vw,9rem)] pt-[clamp(8rem,14vw,11rem)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto w-full max-w-[44rem]">
        <article>
          {/* Header */}
          <header>
            <Reveal>
              <Link
                href="/blog"
                className="svc-link mb-8 inline-flex items-center gap-2 text-[.9rem] font-medium t-muted"
              >
                <ArrowLeft
                  className="h-4 w-4"
                  aria-hidden="true"
                />
                All posts
              </Link>

              <p className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
                <span className="inline-flex items-center gap-2.5">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--orange)" }}
                  />
                  {post.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{post.date}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>

              <h1 className="font-display text-[clamp(2rem,5.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-balance">
                {post.title}
              </h1>

              <p
                className="mt-7 border-l-2 pl-5 text-[clamp(1.05rem,1.6vw,1.2rem)] leading-relaxed t-muted"
                style={{ borderColor: "var(--cyan)" }}
              >
                {post.excerpt}
              </p>

              {post.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border b-line px-3 py-1 text-[.78rem] font-medium t-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          </header>

          <div className="b-line my-10 h-px border-t md:my-12" />

          {/* Body */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author */}
        <Reveal className="mt-14 md:mt-16">
          <aside
            aria-label="About the author"
            className="b-line flex flex-col items-start justify-between gap-6 rounded-3xl border p-7 sm:flex-row sm:items-center md:p-9"
          >
            <div className="flex items-center gap-4">
              <span
                className="b-line font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-semibold"
                aria-hidden="true"
              >
                TC
              </span>
              <div>
                <p className="font-display text-lg font-semibold tracking-[-0.02em]">
                  Written by {AUTHOR}
                </p>
                <p className="t-muted">
                  Founder of taachii, a fullstack developer in Durban, South
                  Africa.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:tafadzwachiri03@outlook.com"
                className="btn-ghost"
              >
                Email me
              </a>
              <Link
                href="/#contact"
                className="cta"
              >
                Start a project{" "}
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </aside>
        </Reveal>

        {/* Prev / next */}
        <Reveal className="mt-5 md:mt-6">
          <nav
            aria-label="More posts"
            className="grid gap-4 sm:grid-cols-2"
          >
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="b-line group flex flex-col gap-2 rounded-3xl border p-6 transition-colors hover:border-[var(--cyan)]"
              >
                <span className="inline-flex items-center gap-2 text-[.78rem] font-medium uppercase tracking-[.16em] t-muted">
                  <ArrowLeft
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                  Previous
                </span>
                <span className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em]">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="b-line group flex flex-col gap-2 rounded-3xl border p-6 transition-colors hover:border-[var(--cyan)] sm:items-end sm:text-right"
              >
                <span className="inline-flex items-center gap-2 text-[.78rem] font-medium uppercase tracking-[.16em] t-muted">
                  Next
                  <ArrowRight
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.02em]">
                  {nextPost.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Reveal>

        <div className="mt-10 flex justify-center">
          <Link
            href="/blog"
            className="svc-link inline-flex items-center gap-2 text-[.95rem] font-semibold"
          >
            <ArrowLeft
              className="h-4 w-4"
              aria-hidden="true"
            />
            Back to all posts
          </Link>
        </div>
      </div>
    </main>
  );
}
