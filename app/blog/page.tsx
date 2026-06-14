import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Blog</h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 border border-white/10 rounded-xl hover:border-cyan-500/40 transition"
            >
              <h2 className="text-xl font-semibold text-white">{post.title}</h2>

              <p className="text-gray-400 mt-2">{post.excerpt}</p>

              <div className="text-xs text-gray-500 mt-3">
                {post.readTime} • {post.category}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
