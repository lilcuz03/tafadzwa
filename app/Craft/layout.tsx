import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Behind the build — workspaces, events, travel, and project moments from Tafadzwa 'Taffy' Chiripanyanga, fullstack developer in Durban, South Africa.",
  openGraph: {
    title: "Gallery | Taffy — Fullstack Developer",
    description:
      "Behind the build — photos, workspaces, events, and project moments.",
    url: "https://tafadzwa.site/Craft",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
