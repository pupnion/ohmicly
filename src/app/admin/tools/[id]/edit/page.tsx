"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ToolForm from "@/components/admin/ToolForm";

type Tool = {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  desc: string;
  desc_long: string;
  standard: string;
  type: string;
  category: string;
  color: string;
  icon: string;
  downloads: number;
  is_free: boolean;
  is_popular: boolean;
  is_published: boolean;
  price: number;
  standard_badges: string[];
  how_to_use: string[];
  audience: string[];
  faqs: { q: string; a: string }[];
  related_slugs: string[];
  file_url: string;
  thumbnail_url: string;
};

export default function EditToolPage() {
  const params = useParams();
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/tools`)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const found = list.find((t: Tool) => t.id === params.id);
        setTool(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return <div className="text-slate-500 font-bn">Loading...</div>;
  }

  if (!tool) {
    return <div className="text-red-500 font-bn">Tool not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 font-bn mb-8">
        Tool সম্পাদনা করুন: {tool.title}
      </h1>
      <ToolForm mode="edit" initialData={tool} />
    </div>
  );
}
