"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, Star, ToggleLeft, ToggleRight } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  district: string;
  content: string;
  avatar_url: string;
  rating: number;
  is_published: boolean;
  created_at: string;
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/admin/testimonials");
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
    } catch {
      setTestimonials([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" এর testimonial মুছে ফেলতে চান?`)) return;

    const res = await fetch(`/api/admin/testimonials?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleTogglePublish = async (
    id: string,
    currentStatus: boolean
  ) => {
    const res = await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_published: !currentStatus }),
    });

    if (res.ok) {
      setTestimonials(
        testimonials.map((t) =>
          t.id === id ? { ...t, is_published: !currentStatus } : t
        )
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-bn">
            Testimonials
          </h1>
          <p className="text-slate-500 font-bn text-sm mt-1">
            ইউজারদের মতামত পরিচালনা করুন
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn"
        >
          <Plus className="h-4 w-4" />
          নতুন Testimonial যোগ করুন
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            Loading...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            কোনো testimonial নেই
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Designation
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Rating
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Published
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 font-bn">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {t.avatar_url ? (
                          <img
                            src={t.avatar_url}
                            alt={t.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center text-xs font-bold">
                            {t.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-slate-800 text-sm font-bn">
                            {t.name}
                          </p>
                          {t.district && (
                            <p className="text-xs text-slate-400 font-bn">
                              {t.district}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-slate-600 font-bn">
                        {t.role}
                      </p>
                      {t.company && (
                        <p className="text-xs text-slate-400 font-bn">
                          {t.company}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < t.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() =>
                          handleTogglePublish(t.id, t.is_published)
                        }
                        className="flex items-center gap-1 text-xs"
                      >
                        {t.is_published ? (
                          <ToggleRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-slate-400" />
                        )}
                        <span
                          className={`font-bn ${
                            t.is_published
                              ? "text-green-600"
                              : "text-slate-400"
                          }`}
                        >
                          {t.is_published ? "Published" : "Draft"}
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/testimonials/${t.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-blue transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(t.id, t.name)}
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
