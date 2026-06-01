"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Plus, Image as ImageIcon } from "lucide-react";

type ToolData = {
  id?: string;
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

const defaultTool: ToolData = {
  slug: "",
  title: "",
  title_en: "",
  desc: "",
  desc_long: "",
  standard: "",
  type: "Excel",
  category: "Calculator",
  color: "blue",
  icon: "FileSpreadsheet",
  downloads: 0,
  is_free: true,
  is_popular: false,
  is_published: false,
  price: 0,
  standard_badges: [],
  how_to_use: [],
  audience: [],
  faqs: [],
  related_slugs: [],
  file_url: "",
  thumbnail_url: "",
};

const categories = ["Calculator", "Checklist", "Template", "Reference"];

export default function ToolForm({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: ToolData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<ToolData>(initialData || defaultTool);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof ToolData, value: unknown) => {
    setForm({ ...form, [field]: value });
  };

  // Auto-generate slug from title_en
  const handleTitleEnChange = (value: string) => {
    updateField("title_en", value);
    if (mode === "create") {
      updateField(
        "slug",
        value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim()
      );
    }
  };

  // Standard badges from comma-separated string
  const [badgesInput, setBadgesInput] = useState(
    initialData?.standard_badges?.join(", ") || ""
  );

  const handleBadgesChange = (value: string) => {
    setBadgesInput(value);
    const badges = value
      .split(",")
      .map((b) => b.trim())
      .filter(Boolean);
    updateField("standard_badges", badges);
  };

  // Dynamic list helpers
  const addListItem = (field: "how_to_use" | "audience") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const updateListItem = (
    field: "how_to_use" | "audience",
    index: number,
    value: string
  ) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const removeListItem = (field: "how_to_use" | "audience", index: number) => {
    setForm({ ...form, [field]: form[field].filter((_, i) => i !== index) });
  };

  // File upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    clearInterval(progressInterval);
    setUploadProgress(100);

    const data = await res.json();
    if (data.url) {
      updateField("file_url", data.url);
    }
    setUploading(false);
  };

  // Thumbnail upload
  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumb(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "blog-images");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      updateField("thumbnail_url", data.url);
    }
    setUploadingThumb(false);
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = mode === "create" ? "POST" : "PUT";
    const body = mode === "edit" ? { ...form, id: form.id } : form;

    const res = await fetch("/api/admin/tools", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/tools");
      router.refresh();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      {/* SECTION 1 — Basic Info */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          মৌলিক তথ্য
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Title (Bengali) *
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Title (English) *
            </label>
            <input
              type="text"
              value={form.title_en}
              onChange={(e) => handleTitleEnChange(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            Slug
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            placeholder="auto-generated-from-title"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-en"
          />
        </div>

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
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            Description (Bengali)
          </label>
          <textarea
            value={form.desc}
            onChange={(e) => updateField("desc", e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            Standard Reference
          </label>
          <input
            type="text"
            value={form.standard}
            onChange={(e) => updateField("standard", e.target.value)}
            placeholder="BNBC 2020 Sec 1.3.32 | BS 7671 Table 64"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            Standard Badges (comma separated)
          </label>
          <input
            type="text"
            value={badgesInput}
            onChange={(e) => handleBadgesChange(e.target.value)}
            placeholder="BNBC, RSC, NFPA, BS 7671"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
          />
        </div>
      </div>

      {/* SECTION 2 — Pricing */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          মূল্য নির্ধারণ
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => updateField("is_free", !form.is_free)}
            className={`relative inline-flex h-12 w-24 items-center rounded-full transition-colors ${
              form.is_free ? "bg-green-500" : "bg-amber-500"
            }`}
          >
            <span
              className={`inline-block h-10 w-10 transform rounded-full bg-white transition-transform shadow-md ${
                form.is_free ? "translate-x-1" : "translate-x-12"
              }`}
            />
          </button>
          <span
            className={`text-lg font-semibold font-bn ${
              form.is_free ? "text-green-600" : "text-amber-600"
            }`}
          >
            {form.is_free ? "ফ্রি" : "প্রিমিয়াম"}
          </span>
        </div>

        {!form.is_free && (
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              মূল্য (টাকা)
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                updateField("price", parseInt(e.target.value) || 0)
              }
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>
        )}
      </div>

      {/* SECTION 3 — File Upload */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          ফাইল আপলোড
        </h2>

        {/* Main File */}
        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-2">
            Tool File (.xlsx, .xls, .pdf, .dwg)
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-brand-blue transition-colors"
          >
            {uploading ? (
              <div className="space-y-2">
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-brand-blue h-2 rounded-full transition-all"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-slate-500 font-bn">
                  আপলোড হচ্ছে... {uploadProgress}%
                </p>
              </div>
            ) : form.file_url ? (
              <div className="space-y-2">
                <p className="text-sm text-green-600 font-bn">
                  ফাইল আপলোড সম্পন্ন
                </p>
                <p className="text-xs text-slate-400 font-en break-all">
                  {form.file_url}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-500 font-bn">
                  ফাইল আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.pdf,.dwg"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-2">
            Thumbnail (ঐচ্ছিক)
          </label>
          <div className="flex items-start gap-4">
            {form.thumbnail_url ? (
              <div className="relative">
                <img
                  src={form.thumbnail_url}
                  alt="Thumbnail"
                  className="w-32 h-24 object-cover rounded-lg border"
                />
                <button
                  type="button"
                  onClick={() => updateField("thumbnail_url", "")}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => thumbInputRef.current?.click()}
                className="w-32 h-24 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-brand-blue transition-colors"
              >
                {uploadingThumb ? (
                  <span className="text-xs text-slate-500 font-bn">
                    Uploading...
                  </span>
                ) : (
                  <>
                    <ImageIcon className="h-6 w-6 text-slate-400" />
                    <span className="text-xs text-slate-400 font-bn mt-1">
                      Upload
                    </span>
                  </>
                )}
              </button>
            )}
            <input
              ref={thumbInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleThumbUpload}
              className="hidden"
              disabled={uploadingThumb}
            />
          </div>
        </div>
      </div>

      {/* SECTION 4 — How To Use */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 font-bn">
            কিভাবে ব্যবহার করবেন
          </h2>
          <button
            type="button"
            onClick={() => addListItem("how_to_use")}
            className="text-sm text-brand-blue font-bn flex items-center gap-1"
          >
            <Plus className="h-3 w-3" /> ধাপ যোগ করুন
          </button>
        </div>
        {form.how_to_use.length === 0 && (
          <p className="text-sm text-slate-400 font-bn">কোনো ধাপ যোগ করা হয়নি</p>
        )}
        {form.how_to_use.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-sm text-slate-400 w-8 font-bn">
              ধাপ {i + 1}
            </span>
            <input
              type="text"
              value={step}
              onChange={(e) =>
                updateListItem("how_to_use", i, e.target.value)
              }
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
            <button
              type="button"
              onClick={() => removeListItem("how_to_use", i)}
              className="p-1.5 text-slate-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* SECTION 5 — Target Audience */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 font-bn">
            টার্গেট অডিয়েন্স
          </h2>
          <button
            type="button"
            onClick={() => addListItem("audience")}
            className="text-sm text-brand-blue font-bn flex items-center gap-1"
          >
            <Plus className="h-3 w-3" /> যোগ করুন
          </button>
        </div>
        {form.audience.length === 0 && (
          <p className="text-sm text-slate-400 font-bn">কোনো অডিয়েন্স যোগ করা হয়নি</p>
        )}
        {form.audience.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                updateListItem("audience", i, e.target.value)
              }
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
            />
            <button
              type="button"
              onClick={() => removeListItem("audience", i)}
              className="p-1.5 text-slate-400 hover:text-red-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* SECTION 6 — Publish Settings */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          প্রকাশ সেটিংস
        </h2>

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

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-navy text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
        >
          {saving
            ? "সেভ হচ্ছে..."
            : mode === "create"
            ? "সেভ করুন"
            : "আপডেট করুন"}
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
