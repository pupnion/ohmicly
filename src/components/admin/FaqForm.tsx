"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FaqData = {
  id?: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_published: boolean;
};

const defaultFaq: FaqData = {
  question: "",
  answer: "",
  category: "general",
  sort_order: 0,
  is_published: true,
};

const categories = [
  { value: "general", label: "General" },
  { value: "rsc-audit", label: "RSC Audit" },
  { value: "abc-license", label: "ABC License" },
  { value: "electrical-safety", label: "Electrical Safety" },
  { value: "tools", label: "Tools" },
];

export default function FaqForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: FaqData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FaqData>(initialData || defaultFaq);
  const [saving, setSaving] = useState(false);

  const updateField = (field: keyof FaqData, value: unknown) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = mode === "create" ? "POST" : "PUT";
    const body = mode === "edit" ? { ...form, id: form.id } : form;

    const res = await fetch("/api/admin/faq", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/faq");
      router.refresh();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          প্রশ্ন ও উত্তর
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            প্রশ্ন *
          </label>
          <textarea
            value={form.question}
            onChange={(e) => updateField("question", e.target.value)}
            required
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            উত্তর *
          </label>
          <textarea
            value={form.answer}
            onChange={(e) => updateField("answer", e.target.value)}
            required
            rows={6}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-y"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          সেটিংস
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              ক্রম নম্বর
            </label>
            <input
              type="number"
              value={form.sort_order}
              onChange={(e) =>
                updateField("sort_order", parseInt(e.target.value) || 0)
              }
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
            <p className="text-xs text-slate-400 mt-1 font-bn">
              কম নম্বর = আগে দেখাবে
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-3">
            Publish Status
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => updateField("is_published", !form.is_published)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                form.is_published ? "bg-green-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  form.is_published ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span className="text-sm font-medium text-slate-700 font-bn">
              {form.is_published ? "প্রকাশিত" : "ড্রাফট"}
            </span>
          </label>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-navy text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
        >
          {saving ? "সেভ হচ্ছে..." : "প্রশ্ন সেভ করুন"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-bn"
        >
          বাতিল
        </button>
      </div>
    </form>
  );
}
