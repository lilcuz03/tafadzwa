// app/dashboard/layout.tsx
//
// Keeps this route out of search engines and link previews. The page itself
// is also never linked from your nav, footer, or sitemap — this is a second
// layer so even a stray inbound link won't get it indexed.
//
// Also loads JetBrains Mono, scoped only to this route via next/font — it's
// exposed as --font-mono and used for data/labels throughout the dashboard
// to visually separate it from the public site's Poppins-based look. This
// doesn't touch your root layout or affect any other page.

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={jetbrainsMono.variable}>{children}</div>;
}
