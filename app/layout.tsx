import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import { SITE_URL } from "@/lib/site";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const TITLE = "taachii | Fullstack Web & Mobile Development";
const DESCRIPTION =
  "taachii builds fast, SEO-ready websites and cross-platform mobile apps with Next.js, React Native and Flutter. Based in Durban, South Africa, working with clients worldwide.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | taachii" },
  description: DESCRIPTION,
  keywords: [
    "taachii",
    "Tafadzwa Chiripanyanga",
    "fullstack developer Durban",
    "Next.js developer South Africa",
    "React Native developer",
    "Flutter developer",
    "mobile app developer Durban",
    "web developer Zimbabwe",
    "freelance web developer South Africa",
  ],
  authors: [{ name: "Tafadzwa Chiripanyanga" }],
  creator: "Tafadzwa Chiripanyanga",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "taachii",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "taachii",
      inLanguage: "en-ZA",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: "taachii",
      url: SITE_URL,
      description: DESCRIPTION,
      email: "tafadzwachiri03@outlook.com",
      telephone: "+27813532248",
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Durban",
        addressCountry: "ZA",
      },
      founder: { "@id": `${SITE_URL}/#person` },
      serviceType: [
        "Mobile app development",
        "Web development",
        "Backend and API development",
        "UI and UX engineering",
      ],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Tafadzwa Chiripanyanga",
      jobTitle: "Fullstack Developer",
      url: SITE_URL,
      worksFor: { "@id": `${SITE_URL}/#business` },
      knowsAbout: [
        "Next.js",
        "React Native",
        "Flutter",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
      ],
      sameAs: [
        "https://github.com/lilcuz03",
        "https://www.instagram.com/_tafadzwa_03",
        "https://www.facebook.com/tafadzwa.chiripanyanga.87727",
      ],
    },
  ],
};

// Applies the saved theme before first paint so there is no flash
const themeInit = `try{var t=localStorage.getItem("taachii-theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <div
          className="glow a"
          aria-hidden="true"
        />
        <div
          className="glow b"
          aria-hidden="true"
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
