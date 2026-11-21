import type { Metadata } from "next";
import BlogIndex from "@/components/BlogIndex";
import { posts } from "@/lib/blog-data";

const SITE = "https://tafadzwa.site";
const TITLE = "Blog | taachii";
const DESCRIPTION =
  "Practical writing on Next.js, mobile apps, AI automation and freelancing in South Africa, from taachii, a Durban web and mobile development studio.";
const OG_IMAGE = `${SITE}/opengraph-image`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE}/blog` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE}/blog`,
    siteName: "taachii",
    locale: "en_ZA",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "taachii blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE}/blog#blog`,
  name: "taachii Blog",
  url: `${SITE}/blog`,
  description: DESCRIPTION,
  inLanguage: "en-ZA",
  author: {
    "@type": "Person",
    name: "Tafadzwa Chiripanyanga",
    url: SITE,
  },
  publisher: { "@type": "Organization", name: "taachii", url: SITE },
  blogPost: posts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `${SITE}/blog/${p.slug}`,
    articleSection: p.category,
    author: { "@type": "Person", name: "Tafadzwa Chiripanyanga" },
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogIndex />
    </>
  );
}
