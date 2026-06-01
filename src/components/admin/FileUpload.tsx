"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  bucket: string;
  accept: string;
  onUpload: (url: string) => void;
  label: string;
  preview?: boolean;
  currentUrl?: string;
  className?: string;
}

export default function FileUpload({
  bucket,
  accept,
  onUpload,
  label,
  preview = false,
  currentUrl,
  className = "",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError(null);
    setFileName(file.name);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", bucket);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      if (data.url) {
        onUpload(data.url);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
      setFileName(null);
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const file = e.dataTransfer.files?.[0];
      if (file) uploadFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bucket]
  );

  const handleRemove = () => {
    onUpload("");
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isImage = accept.includes("image") || accept.includes(".jpg") || accept.includes(".png") || accept.includes(".webp");

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 font-bn mb-2">
        {label}
      </label>

      {/* Preview for images */}
      {preview && currentUrl && (
        <div className="mb-3 relative inline-block">
          <img
            src={currentUrl}
            alt="Preview"
            className="w-32 h-24 object-cover rounded-lg border border-slate-200"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Drop Zone */}
      {(!currentUrl || !preview) && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-brand-blue bg-blue-50"
              : "border-slate-300 hover:border-brand-blue"
          }`}
        >
          {uploading ? (
            <div className="space-y-3">
              <div className="w-full bg-slate-200 rounded-full h-2 max-w-xs mx-auto">
                <div
                  className="bg-brand-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 font-bn">
                আপলোড হচ্ছে... {progress}%
              </p>
              {fileName && (
                <p className="text-xs text-slate-400">{fileName}</p>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {isImage ? (
                <ImageIcon className="h-8 w-8 text-slate-400 mx-auto" />
              ) : (
                <Upload className="h-8 w-8 text-slate-400 mx-auto" />
              )}
              <p className="text-sm text-slate-500 font-bn">
                ফাইল আপলোড করতে ক্লিক করুন বা ড্র্যাগ করুন
              </p>
              <p className="text-xs text-slate-400">
                {accept.replace(/\./g, "").toUpperCase().split(",").join(", ")}
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </div>
      )}

      {/* File name display (non-image) */}
      {!preview && currentUrl && !uploading && (
        <div className="flex items-center gap-2 mt-2 p-2 bg-slate-50 rounded-lg">
          <File className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-600 flex-1 truncate">
            {fileName || currentUrl.split("/").pop()}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-500 mt-2 font-bn">{error}</p>
      )}
    </div>
  );
}
