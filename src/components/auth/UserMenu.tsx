"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

export default function UserMenu() {
  const { user, loading, signOut } = useSupabaseAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-white/10 animate-pulse" />
      </div>
    );
  }

  // Not logged in — show login/signup
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="text-white/70 hover:text-white text-sm font-medium font-bn transition-colors px-3 py-2"
        >
          লগইন
        </Link>
        <Link
          href="/register"
          className="bg-brand-gold text-brand-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
        >
          নিবন্ধন
        </Link>
      </div>
    );
  }

  // Logged in — show avatar + dropdown
  const displayName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
      >
        <div className="bg-brand-gold rounded-full h-8 w-8 flex items-center justify-center text-brand-navy text-xs font-bold">
          {initials}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50">
          {/* User info */}
          <div className="px-4 py-2.5 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate font-bn">
              {displayName}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-brand-blue hover:bg-slate-50 transition-colors font-bn"
          >
            <LayoutDashboard className="h-4 w-4" />
            ড্যাশবোর্ড
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-brand-blue hover:bg-slate-50 transition-colors font-bn"
          >
            <User className="h-4 w-4" />
            আমার প্রোফাইল
          </Link>

          <div className="border-t border-slate-100 my-1" />

          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-bn"
          >
            <LogOut className="h-4 w-4" />
            লগআউট
          </button>
        </div>
      )}
    </div>
  );
}
