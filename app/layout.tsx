import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer";

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

export const metadata: Metadata = {
  title: "taachii | Fullstack Web & Mobile Development",
  description:
    "taachii builds fast, modern websites and mobile apps with Next.js, React Native and Flutter. Based in South Africa, working with clients worldwide.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "taachii",
    title: "taachii | Fullstack Web & Mobile Development",
    description: "Fast, modern websites and mobile apps, built end to end.",
    locale: "en_ZA",
  },
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "taachii",
  description: "Fullstack web and mobile development studio.",
  areaServed: "Worldwide",
  telephone: "+27813532248",
  email: "tafadzwachiri03@outlook.com",
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
