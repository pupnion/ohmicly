"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Search, ToggleLeft, ToggleRight } from "lucide-react";

type Tool = {
  id: string;
  slug: string;
  title: string;
  title_en: string;
  category: string;
  is_free: boolean;
  is_published: boolean;
  downloads: number;
  created_at: string;
};

export default function AdminToolsPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await fetch("/api/admin/tools");
      const data = await res.json();
      setTools(Array.isArray(data) ? data : []);
    } catch {
      setTools([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`"${title}" মুছে ফেলতে চান? এটি পূর্বাবস্থায় ফেরানো যাবে না।`)) return;

    const res = await fetch(`/api/admin/tools?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setTools(tools.filter((t) => t.id !== id));
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const res = await fetch("/api/admin/tools", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_published: !currentStatus }),
    });

    if (res.ok) {
      setTools(
        tools.map((t) =>
          t.id === id ? { ...t, is_published: !currentStatus } : t
        )
      );
    }
  };

  const filtered = tools.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.title_en.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-bn">Tools</h1>
          <p className="text-slate-500 font-bn text-sm mt-1">
            Manage tools and templates
          </p>
        </div>
        <Link
          href="/admin/tools/new"
          className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn"
        >
          <Plus className="h-4 w-4" />
          নতুন Tool যোগ করুন
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            No tools found
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
                    Free
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Published
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Downloads
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((tool) => (
                  <tr
                    key={tool.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-800 font-bn text-sm">
                          {tool.title}
                        </p>
                        <p className="text-xs text-slate-400 font-en">
                          {tool.title_en}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 font-bn">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-bn ${
                          tool.is_free
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {tool.is_free ? "ফ্রি" : "প্রিমিয়াম"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          handleTogglePublish(tool.id, tool.is_published)
                        }
                        className="flex items-center gap-1 text-xs"
                      >
                        {tool.is_published ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-slate-400" />
                        )}
                        <span
                          className={`font-bn ${
                            tool.is_published
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {tool.is_published ? "Published" : "Draft"}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600 font-en">
                      {(tool.downloads || 0).toLocaleString("en-US")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/tools/${tool.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-blue transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(tool.id, tool.title)}
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
