// app/bad-leads/layout.tsx
//
// Keeps this route hidden from search engines. Never linked from nav or sitemap.
// Uses JetBrains Mono scoped to this route only, same as the main dashboard.

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bad Leads",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function BadLeadsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-full flex flex-col bg-[#060a0a] text-[#f0fdfa]"
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}