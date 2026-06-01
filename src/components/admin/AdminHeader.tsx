"use client";

import { useEffect, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const pageNames: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/tools": "Tools",
  "/admin/blog": "Blog",
  "/admin/faq": "FAQ",
  "/admin/testimonials": "Testimonials",
  "/admin/settings": "Settings",
};

export default function AdminHeader() {
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null);
    });
  }, [supabase]);

  // Find matching page name
  const currentPage =
    Object.entries(pageNames).find(
      ([path]) => pathname === path || pathname.startsWith(path + "/")
    )?.[1] ?? "Admin";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900 font-bn">
            Admin Panel — OhmiclyLearn
          </h1>
          <p className="text-sm text-gray-500 font-bn">{currentPage}</p>
        </div>
        {userEmail && (
          <span className="text-sm text-gray-600 font-bn">{userEmail}</span>
        )}
      </div>
    </header>
  );
}
