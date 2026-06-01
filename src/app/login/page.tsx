"use client";

import { useState } from "react";
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      // ১. ইমেইল ও পাসওয়ার্ড দিয়ে সুপাবেসে লগইন করা
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.user) {
        setError("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে।");
        setLoading(false);
        return;
      }

      // ২. লগইন হওয়া ইউজারের আইডি admin_users টেবিলে আছে কি না তা ক্লায়েন্ট সাইডেই চেক করা
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", authData.user.id)
        .maybeSingle();

      if (adminError || !adminData) {
        // যদি ডাটাবেজে এই আইডি না থাকে, তবে সেশন সাইন আউট করে দেওয়া যাতে সাধারণ ইউজার ঢুকতে না পারে
        await supabase.auth.signOut();
        setError("You do not have admin access. এই প্যানেলটি শুধুমাত্র অ্যাডমিনদের জন্য।");
        setLoading(false);
        return;
      }

      // ৩. অ্যাডমিন নিশ্চিত হলে সরাসরি অ্যাডমিন ড্যাশবোর্ডে পাঠানো
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError("সিস্টেমে কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="fixed inset-0 bg-brand-navy/10 backdrop-blur-sm" />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        <Link href="/" className="absolute top-4 right-4 z-20 text-slate-400 hover:text-slate-600 transition-colors bg-white/80 rounded-full p-1">
          <X className="w-5 h-5" />
        </Link>

        {/* Left Side — Logo */}
        <div className="hidden sm:flex w-[30%] bg-brand-navy items-center justify-center relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-slate-900" />
          <div className="relative z-10 text-center">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="bg-brand-gold rounded-xl p-3">
                <Zap className="h-8 w-8 text-brand-navy" />
              </div>
              <span className="text-white font-bold text-2xl font-bn">OhmiclyLearn</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-[200px] mx-auto font-bn">
              বাংলাদেশ আরএমজি কারখানার জন্য ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড আয়ত্ত করুন।
            </p>
          </div>
        </div>

        {/* Right Side — Form */}
        <div className="w-full sm:w-[70%] p-8 sm:p-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-2 font-bn">অ্যাডমিন লগইন</h1>
          <p className="text-slate-500 text-sm mb-8 font-bn">ওহমিকলি ড্যাশবোর্ড পরিচালনা করতে আপনার অ্যাডমিন অ্যাকাউন্ট দিয়ে লগইন করুন।</p>

          {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-5 font-bn">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-bn">ইমেইল</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5 font-bn">পাসওয়ার্ড</label>
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
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-navy text-white font-semibold py-2.5 rounded-lg hover:bg-brand-navy/90 transition-colors disabled:opacity-50 text-sm font-bn"
            >
              {loading ? "যাচাই করা হচ্ছে..." : "অ্যাডমিন লগইন করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
                }
