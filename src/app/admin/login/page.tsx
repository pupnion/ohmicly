"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = useMemo(() => {
    try {
      return createClient();
    } catch {
      return null;
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase is not configured. Please set environment variables.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !data?.user) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }

      // নিরাপদ উপায়ে চেক করা (.single() এর বদলে .maybeSingle() বা ডেটার লেন্থ চেক করা)
      const { data: adminData, error: dbError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", data.user.id);

      // যদি ডাটাবেজে আপনার ইমেইল pupnion@gmail.com হয়, তবে কোনো সিকিউরিটি এরর থাকলেও আমরা ডিরেক্ট ঢুকতে দেব
      const isMasterAdmin = data.user.email === "pupnion@gmail.com";

      if (!isMasterAdmin && (!adminData || adminData.length === 0)) {
        await supabase.auth.signOut();
        setError("You do not have admin access");
        setLoading(false);
        return;
      }

      // সফল হলে সরাসরি অ্যাডমিন ড্যাশবোর্ডে রিডাইরেক্ট
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-brand-gold rounded-lg p-2">
              <Zap className="h-6 w-6 text-brand-navy" />
            </div>
            <span className="text-white font-bold text-2xl font-bn">
              OhmiclyLearn
            </span>
          </div>
          <p className="text-white/50 font-bn">Admin Panel - Safe Mode Enabled</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg font-bn">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 font-bn mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ohmiclylearn.com"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 font-bn mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white font-semibold py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn disabled:opacity-50"
            >
              {loading ? "লগইন হচ্ছে..." : "অ্যাডমিন লগইন করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
        }
