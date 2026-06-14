import { Metadata } from "next";
import "./blog-prose.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on development, mobile apps, freelancing in South Africa, and the tech that powers modern products. By Tafadzwa 'Taffy' Chiripanyanga.",
  openGraph: {
    title: "Blog | Taffy — Fullstack Developer",
    description:
      "Thoughts on development, mobile apps, freelancing in SA, and modern tech.",
    url: "https://tafadzwa.site/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
