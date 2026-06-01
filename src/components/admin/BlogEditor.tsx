"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, Image as ImageIcon, Bold, Italic, Heading2, Heading3, Link as LinkIcon, List, Quote } from "lucide-react";

type BlogData = {
  id?: string;
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

const defaultPost: BlogData = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Audit Prep",
  color: "bg-brand-blue",
  published: false,
  published_at: null,
  cover_image_url: "",
  tags: [],
  reading_time: 5,
};

const categories = [
  "Audit Prep",
  "Standards",
  "Career",
  "Technical Tips",
  "ABC License",
];

export default function BlogEditor({
  mode,
  initialData,
}: {
  mode: "create" | "edit";
  initialData?: BlogData;
}) {
  const router = useRouter();
  const [form, setForm] = useState<BlogData>(initialData || defaultPost);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updateField = (field: keyof BlogData, value: unknown) => {
    setForm({ ...form, [field]: value });
  };

  // Auto-generate slug from title
  const handleTitleChange = (value: string) => {
    updateField("title", value);
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

  // Tags from comma-separated string
  const handleTagsChange = (value: string) => {
    setTagsInput(value);
    const tags = value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    updateField("tags", tags);
  };

  // Cover image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", "blog-images");

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      updateField("cover_image_url", data.url);
    }
    setUploadingImage(false);
  };

  // Markdown toolbar helpers
  const insertMarkdown = (prefix: string, suffix: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = form.content.substring(start, end);
    const newText =
      form.content.substring(0, start) +
      prefix +
      (selectedText || "text") +
      suffix +
      form.content.substring(end);

    updateField("content", newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + (selectedText ? selectedText.length : 4) + suffix.length;
      textarea.setSelectionRange(
        selectedText ? start + prefix.length + selectedText.length + suffix.length : start + prefix.length,
        selectedText ? start + prefix.length + selectedText.length + suffix.length : start + prefix.length + 4
      );
    }, 0);
  };

  // Toggle publish
  const handlePublishToggle = () => {
    const newPublished = !form.published;
    setForm({
      ...form,
      published: newPublished,
      published_at: newPublished ? new Date().toISOString() : null,
    });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const method = mode === "create" ? "POST" : "PUT";
    const body = mode === "edit" ? { ...form, id: form.id } : form;

    const res = await fetch("/api/admin/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      router.push("/admin/blog");
      router.refresh();
    } else {
      const err = await res.json();
      alert(`Error: ${err.error}`);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* SECTION 1 — Post Info */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          পোস্ট তথ্য
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
            Title *
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn"
          />
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
            Excerpt (Short Summary)
          </label>
          <textarea
            value={form.excerpt}
            onChange={(e) => updateField("excerpt", e.target.value)}
            rows={2}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-none"
          />
        </div>

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
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => handleTagsChange(e.target.value)}
              placeholder="BNBC, Fire Safety, Audit"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 — Cover Image */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          কভার ইমেজ
        </h2>

        {form.cover_image_url ? (
          <div className="relative">
            <img
              src={form.cover_image_url}
              alt="Cover"
              className="w-full max-h-64 object-cover rounded-lg border"
            />
            <button
              type="button"
              onClick={() => updateField("cover_image_url", "")}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-12 text-center cursor-pointer hover:border-brand-blue transition-colors"
          >
            {uploadingImage ? (
              <p className="text-sm text-slate-500 font-bn">
                আপলোড হচ্ছে...
              </p>
            ) : (
              <div className="space-y-2">
                <ImageIcon className="h-10 w-10 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-500 font-bn">
                  কভার ইমেজ আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন
                </p>
                <p className="text-xs text-slate-400">
                  JPG, PNG, WebP
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploadingImage}
            />
          </div>
        )}
      </div>

      {/* SECTION 3 — Content Editor */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          কন্টেন্ট
        </h2>

        {/* Markdown Toolbar */}
        <div className="flex items-center gap-1 p-2 bg-slate-50 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => insertMarkdown("**", "**")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Bold"
          >
            <Bold className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("*", "*")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Italic"
          >
            <Italic className="h-4 w-4 text-slate-600" />
          </button>
          <div className="w-px h-6 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("## ")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("### ")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4 text-slate-600" />
          </button>
          <div className="w-px h-6 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => insertMarkdown("[", "](url)")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Link"
          >
            <LinkIcon className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("- ")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="List"
          >
            <List className="h-4 w-4 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown("> ")}
            className="p-2 hover:bg-white rounded transition-colors"
            title="Quote"
          >
            <Quote className="h-4 w-4 text-slate-600" />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={form.content}
          onChange={(e) => updateField("content", e.target.value)}
          rows={20}
          placeholder="বাংলায় পোস্ট লিখুন..."
          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm font-bn resize-y"
        />
        <p className="text-xs text-slate-400 font-bn">
          Markdown supported
        </p>
      </div>

      {/* SECTION 4 — Publish Settings */}
      <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-4">
        <h2 className="text-lg font-bold text-slate-800 font-bn">
          প্রকাশ সেটিংস
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
              Reading Time (minutes)
            </label>
            <input
              type="number"
              value={form.reading_time}
              onChange={(e) =>
                updateField("reading_time", parseInt(e.target.value) || 1)
              }
              min="1"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 font-bn mb-3">
              Publish Status
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <button
                type="button"
                onClick={handlePublishToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.published ? "bg-green-500" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    form.published ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm font-medium text-slate-700 font-bn">
                {form.published ? "প্রকাশিত" : "ড্রাফট"}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-navy text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
        >
          {saving ? "সেভ হচ্ছে..." : "পোস্ট সেভ করুন"}
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
