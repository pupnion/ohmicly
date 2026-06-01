"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  color: string;
  published: boolean;
  published_at: string | null;
  cover_image_url: string;
  tags: string[];
  reading_time: number;
};

export default function EditBlogPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/blog`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const found = list.find((p: BlogPost) => p.id === params.id);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="text-slate-500 font-bn">Loading...</div>;
  }

  if (!post) {
    return <div className="text-red-500 font-bn">Post not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        পোস্ট সম্পাদনা করুন: {post.title}
      </h1>
      <BlogEditor mode="edit" initialData={post} />
    </div>
  );
}
