"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Clock } from "lucide-react";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/admin/blog");
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" মুছে ফেলতে চান?`)) return;

    const res = await fetch(`/api/admin/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const newPublished = !post.published;
    const res = await fetch("/api/admin/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
        published: newPublished,
        published_at: newPublished ? new Date().toISOString() : null,
      }),
    });

    if (res.ok) {
      setPosts(
        posts.map((p) =>
          p.id === post.id
            ? {
                ...p,
                published: newPublished,
                published_at: newPublished
                  ? new Date().toISOString()
                  : null,
              }
            : p
        )
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-bn">Blog</h1>
          <p className="text-slate-500 font-bn text-sm mt-1">
            Manage blog posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn"
        >
          <Plus className="h-4 w-4" />
          নতুন পোস্ট লিখুন
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            Loading...
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            কোনো ব্লগ পোস্ট নেই
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Published
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800 font-bn text-sm">
                          {post.title}
                        </p>
                        <p className="text-xs text-slate-400 font-en">
                          /{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bn">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublish(post)}
                        className="flex items-center gap-1 text-xs"
                      >
                        {post.published ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-slate-400" />
                        )}
                        <span
                          className={`font-bn ${
                            post.published
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 font-en">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-blue transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
