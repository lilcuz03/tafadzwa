import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/menu";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

// ─── Fonts ─────────────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ─── SEO Metadata ──────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL("https://tafadzwa.site"),
  title: {
    default: "Taffy | Fullstack Developer — Next.js, React Native & Flutter",
    template: "%s | Taffy",
  },
  description:
    "Tafadzwa 'Taffy' Chiripanyanga is a Zimbabwean fullstack developer based in Durban, South Africa. He builds high-quality mobile apps and web platforms using Next.js, React Native, Flutter, Supabase and more. Open for freelance and remote work.",
  keywords: [
    "Taffy",
    "Tafadzwa Chiripanyanga",
    "fullstack developer South Africa",
    "Next.js developer Durban",
    "React Native developer",
    "Flutter developer",
    "freelance developer South Africa",
    "mobile app developer Durban",
    "web developer Zimbabwe",
    "Supabase developer",
  ],
  authors: [{ name: "Tafadzwa Chiripanyanga", url: "https://tafadzwa.site" }],
  creator: "Tafadzwa Chiripanyanga",
  openGraph: {
    title: "Taffy | Fullstack Developer — Next.js, React Native & Flutter",
    description:
      "Zimbabwean fullstack developer based in Durban, SA. Building mobile apps, web platforms, and digital experiences that ship fast and last.",
    url: "https://tafadzwa.site",
    siteName: "Taffy — Portfolio",
    type: "website",
    locale: "en_ZA",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Taffy — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taffy | Fullstack Developer",
    description:
      "Building mobile apps & web platforms from Durban, South Africa.",
    images: ["/images/hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://tafadzwa.site" },
};

// ─── JSON-LD Structured Data ───────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tafadzwa Chiripanyanga",
  alternateName: "Taffy",
  url: "https://tafadzwa.site",
  image: "https://tafadzwa.site/images/hero.png",
  jobTitle: "Fullstack Developer",
  description:
    "Zimbabwean fullstack developer based in Durban, South Africa, specialising in Next.js, React Native, Flutter and Supabase.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Durban",
    addressCountry: "ZA",
  },
  sameAs: ["https://github.com/tafadzwa", "https://linkedin.com/in/tafadzwa"],
  knowsAbout: [
    "Next.js",
    "React Native",
    "Flutter",
    "TypeScript",
    "Supabase",
    "MongoDB",
    "Tailwind CSS",
    "Node.js",
  ],
  offers: {
    "@type": "Offer",
    description:
      "Freelance fullstack development — mobile apps, web platforms, and backend APIs.",
    areaServed: ["ZA", "ZW", "Worldwide"],
  },
};

// ─── Root Layout ───────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#060a0a] text-[#f0fdfa]">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
