"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Zap, Eye, EyeOff, Mail, Lock, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
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

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-brand-navy/10 backdrop-blur-sm" />

      {/* Popup Card — 30/70 split */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 transition-colors bg-white/80 rounded-full p-1"
        >
          <X className="w-5 h-5" />
        </Link>

        {/* Left Side — Logo (30%) */}
        <div className="hidden sm:flex w-[30%] bg-brand-navy items-center justify-center relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-900" />
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-brand-gold/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-brand-blue/10 rounded-full blur-3xl" />

          <div className="relative z-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="bg-brand-gold rounded-xl p-3">
                <Zap className="h-8 w-8 text-brand-navy" />
              </div>
              <span className="text-white font-bold text-2xl font-bn">
                OhmiclyLearn
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[200px] mx-auto font-bn">
              বাংলাদেশ আরএমজি কারখানার জন্য ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড আয়ত্ত করুন।
            </p>
          </div>
        </div>

        {/* Right Side — Form (70%) */}
        <div className="w-full sm:w-[70%] p-8 sm:p-10">
          {/* Mobile Logo */}
          <div className="sm:hidden text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="bg-brand-gold rounded-lg p-2">
                <Zap className="h-5 w-5 text-brand-navy" />
              </div>
              <span className="text-brand-navy font-bold text-xl font-bn">
                OhmiclyLearn
              </span>
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-slate-900 mb-2 font-bn">
            স্বাগতম
          </h1>
          <p className="text-slate-500 text-sm mb-8 font-bn">
            শেখা চালিয়ে যেতে এবং ইলেকট্রিক্যাল কমপ্লায়েন্স স্ট্যান্ডার্ড আয়ত্ত করতে লগইন করুন।
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 font-bn">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-bn">
                ইমেইল
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-bn">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white font-semibold py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors disabled:opacity-50 text-sm font-bn"
            >
              {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500 mt-5 font-bn">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="text-brand-blue font-semibold hover:underline">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
