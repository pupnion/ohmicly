"use client";

import { useState, useEffect } from "react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useRouter } from "next/navigation";
import {
  Zap,
  FileText,
  Download,
  BookOpen,
  LogOut,
  User,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type DownloadRecord = {
  id: string;
  tool_slug: string;
  downloaded_at: string;
};

export default function DashboardPage() {
  const { user, loading, signOut } = useSupabaseAuth();
  const router = useRouter();
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [loadingDownloads, setLoadingDownloads] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDownloads = async () => {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("downloads")
          .select("id, tool_slug, downloaded_at")
          .eq("user_id", user.id)
          .order("downloaded_at", { ascending: false })
          .limit(10);

        setDownloads(data || []);
      } catch {
        // Table might not exist yet
      }
      setLoadingDownloads(false);
    };

    fetchDownloads();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue" />
      </div>
    );
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-brand-gold rounded-full h-14 w-14 flex items-center justify-center text-brand-navy font-bold text-lg">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold font-bn">
                  স্বাগতম, {displayName}
                </h1>
                <p className="text-white/60 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bn"
            >
              <LogOut className="h-4 w-4" />
              লগআউট
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg font-semibold text-slate-800 font-bn mb-6">
          আপনার ড্যাশবোর্ড
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card 1 */}
          <Link
            href="/tools"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
          >
            <div className="bg-brand-blue/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-brand-blue/20 transition-colors">
              <FileText className="h-6 w-6 text-brand-blue" />
            </div>
            <h3 className="font-semibold text-slate-800 font-bn mb-1">
              টুলস ব্রাউজ করুন
            </h3>
            <p className="text-sm text-slate-500 font-bn">
              ইঞ্জিনিয়ারিং টুলস ব্রাউজ এবং ডাউনলোড করুন
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            href="/mcq"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
          >
            <div className="bg-brand-gold/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-brand-gold/20 transition-colors">
              <BookOpen className="h-6 w-6 text-brand-gold" />
            </div>
            <h3 className="font-semibold text-slate-800 font-bn mb-1">
              MCQ প্র্যাকটিস
            </h3>
            <p className="text-sm text-slate-500 font-bn">
              ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং MCQ অনুশীলন করুন
            </p>
          </Link>

          {/* Card 3 */}
          <Link
            href="/standards"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100 group"
          >
            <div className="bg-brand-green/10 rounded-lg p-3 w-fit mb-4 group-hover:bg-brand-green/20 transition-colors">
              <Download className="h-6 w-6 text-brand-green" />
            </div>
            <h3 className="font-semibold text-slate-800 font-bn mb-1">
              স্ট্যান্ডার্ডস
            </h3>
            <p className="text-sm text-slate-500 font-bn">
              BNBC, NFPA, RSC স্ট্যান্ডার্ডস রেফারেন্স
            </p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Download History */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-5 w-5 text-slate-400" />
              <h3 className="font-semibold text-slate-800 font-bn">
                ডাউনলোড হিস্ট্রি
              </h3>
            </div>
            {loadingDownloads ? (
              <p className="text-sm text-slate-400 font-bn">Loading...</p>
            ) : downloads.length === 0 ? (
              <p className="text-sm text-slate-400 font-bn">
                কোনো ডাউনলোড নেই। টুলস পেজ থেকে টুল ডাউনলোড করুন।
              </p>
            ) : (
              <div className="space-y-3">
                {downloads.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Download className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700 font-en">
                        {d.tool_slug}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-en">
                      {new Date(d.downloaded_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-5 w-5 text-slate-400" />
              <h3 className="font-semibold text-slate-800 font-bn">
                প্রোফাইল তথ্য
              </h3>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500 font-bn">নাম</p>
                <p className="text-slate-800 font-medium">{displayName}</p>
              </div>
              <div>
                <p className="text-slate-500 font-bn">ইমেইল</p>
                <p className="text-slate-800 font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-slate-500 font-bn">অ্যাকাউন্ট তৈরি</p>
                <p className="text-slate-800 font-medium">
                  {new Date(user.created_at).toLocaleDateString("bn-BD")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
