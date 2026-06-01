"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Star, X, Upload } from "lucide-react";

type TestimonialData = {
  id?: string;
  name: string;
  role: string;
  company: string;
  district: string;
  content: string;
  avatar_url: string;
  rating: number;
  is_published: boolean;
};

const defaultTestimonial: TestimonialData = {
  name: "",
  role: "",
  company: "",
  district: "",
  content: "",
  avatar_url: "",
  rating: 5,
  is_published: false,
};

export default function TestimonialForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: TestimonialData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<TestimonialData>(
    initialData || defaultTestimonial
  );
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof TestimonialData, value: unknown) => {
    setForm({ ...form, [field]: value });
  };

  // Avatar upload
  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "avatars");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      updateField("avatar_url", data.url);
    }
    setUploading(false);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = mode === "create" ? "POST" : "PUT";
    const body = mode === "edit" ? { ...form, id: form.id } : form;

    const res = await fetch("/api/admin/testimonials", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Personal Info */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          ব্যক্তিগত তথ্য
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              নাম *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              পদবি
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Electrical Manager"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              প্রতিষ্ঠান
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              জেলা
            </label>
            <input
              type="text"
              value={form.district}
              onChange={(e) => updateField("district", e.target.value)}
              placeholder="Gazipur, Ashulia, etc."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          মতামত
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            মতামত / অভিজ্ঞতা *
          </label>
          <textarea
            value={form.content}
            onChange={(e) => updateField("content", e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-y"
          />
        </div>
      </div>

      {/* Avatar & Rating */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          ছবি ও রেটিং
        </h2>

        {/* Avatar Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-2">
            Avatar (ঐচ্ছিক)
          </label>
          <div className="flex items-center gap-4">
            {form.avatar_url ? (
              <div className="relative">
                <img
                  src={form.avatar_url}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                />
                <button
                  type="button"
                  onClick={() => updateField("avatar_url", "")}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue transition-colors"
              >
                {uploading ? (
                  <span className="text-xs text-slate-500 font-bn">
                    ...
                  </span>
                ) : (
                  <>
                    <Upload className="h-5 w-5 text-slate-400" />
                    <span className="text-xs text-slate-400 font-bn mt-1">
                      Upload
                    </span>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleAvatarUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>

        {/* Rating Star Selector */}
        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-2">
            Rating
          </label>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => updateField("rating", i + 1)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    i < form.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-200 hover:text-yellow-200"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-slate-500 font-bn">
              {form.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* Publish Settings */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          প্রকাশ সেটিংস
        </h2>

        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            onClick={() =>
              updateField("is_published", !form.is_published)
            }
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
            {form.is_published ? "প্রকাশিত" : "রিভিউ বাকি"}
          </span>
        </label>
        <p className="text-xs text-slate-400 font-bn">
          রিভিউ শেষে প্রকাশ করুন
        </p>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-navy text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
        >
          {saving ? "সেভ হচ্ছে..." : "Testimonial সেভ করুন"}
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
