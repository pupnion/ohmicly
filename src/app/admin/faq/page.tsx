"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, GripVertical, ToggleLeft, ToggleRight } from "lucide-react";

type Faq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
};

const categoryLabels: Record<string, string> = {
  general: "General",
  "rsc-audit": "RSC Audit",
  "abc-license": "ABC License",
  "electrical-safety": "Electrical Safety",
  tools: "Tools",
};

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch("/api/admin/faq");
      const data = await res.json();
      setFaqs(Array.isArray(data) ? data : []);
    } catch {
      setFaqs([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("এই প্রশ্নটি মুছে ফেলতে চান?")) return;

    const res = await fetch(`/api/admin/faq?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setFaqs(faqs.filter((f) => f.id !== id));
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    const res = await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_published: !currentStatus }),
    });

    if (res.ok) {
      setFaqs(
        faqs.map((f) =>
          f.id === id ? { ...f, is_published: !currentStatus } : f
        )
      );
    }
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    setDraggingId(id);
  };

  const handleDragOver = useCallback(
    (e: React.DragEvent, targetId: string) => {
      e.preventDefault();
      if (!draggingId || draggingId === targetId) return;

      const newFaqs = [...faqs];
      const dragIndex = newFaqs.findIndex((f) => f.id === draggingId);
      const targetIndex = newFaqs.findIndex((f) => f.id === targetId);

      const [removed] = newFaqs.splice(dragIndex, 1);
      newFaqs.splice(targetIndex, 0, removed);

      // Update sort_order for all items
      const updatedFaqs = newFaqs.map((faq, index) => ({
        ...faq,
        sort_order: index,
      }));

      setFaqs(updatedFaqs);
    },
    [draggingId, faqs]
  );

  const handleDragEnd = async () => {
    setDraggingId(null);

    // Save new order to database
    const updates = faqs.map((faq) => ({
      id: faq.id,
      sort_order: faq.sort_order,
    }));

    await fetch("/api/admin/faq", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bulk_update: updates }),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-bn">FAQs</h1>
          <p className="text-slate-500 font-bn text-sm mt-1">
            সচরাচর জিজ্ঞাসা পরিচালনা করুন
          </p>
        </div>
        <Link
          href="/admin/faq/new"
          className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn"
        >
          <Plus className="h-4 w-4" />
          নতুন প্রশ্ন যোগ করুন
        </Link>
      </div>

      {/* FAQ List */}
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            Loading...
          </div>
        ) : faqs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 font-bn">
            কোনো প্রশ্ন নেই। "নতুন প্রশ্ন যোগ করুন" ক্লিক করুন।
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                draggable
                onDragStart={() => handleDragStart(faq.id)}
                onDragOver={(e) => handleDragOver(e, faq.id)}
                onDragEnd={handleDragEnd}
                className={`flex items-start gap-4 px-4 py-4 hover:bg-slate-50/50 transition-colors ${
                  draggingId === faq.id ? "bg-blue-50 opacity-50" : ""
                }`}
              >
                {/* Drag Handle */}
                <div className="flex flex-col items-center gap-2 pt-1 cursor-grab active:cursor-grabbing">
                  <GripVertical className="h-5 w-5 text-slate-300" />
                  <span className="text-xs text-slate-400 w-6 text-center bg-slate-100 rounded px-1">
                    {faq.sort_order}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 font-bn text-sm">
                    {faq.question}
                  </p>
                  <p className="text-xs text-slate-500 font-bn mt-1 line-clamp-2">
                    {faq.answer}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bn">
                      {categoryLabels[faq.category] || faq.category}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() =>
                      handleTogglePublish(faq.id, faq.is_published)
                    }
                    className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                    title={faq.is_published ? "Unpublish" : "Publish"}
                  >
                    {faq.is_published ? (
                      <ToggleRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ToggleLeft className="h-5 w-5 text-slate-400" />
                    )}
                  </button>
                  <Link
                    href={`/admin/faq/${faq.id}/edit`}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-brand-blue transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
