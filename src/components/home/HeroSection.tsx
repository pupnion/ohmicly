"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Shield, Zap, ArrowRight, AlertTriangle, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const [downloadCount, setDownloadCount] = useState(12847);

  // Simulate live download counter
  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-brand-navy overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Audit Alert Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-red/15 text-brand-red px-4 py-1.5 rounded-full text-sm font-semibold font-bn border border-brand-red/20 animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              RSC Audit Alert — ফ্যাক্টরি কমপ্লায়েন্স জরুরি
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-bn">
              ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের
              <span className="text-brand-gold"> সম্পূর্ণ টুলবক্স</span>
            </h1>

            {/* Urgency Message */}
            <div className="bg-brand-red/10 border-l-4 border-brand-red rounded-r-lg px-4 py-3">
              <p className="text-brand-red font-semibold text-sm font-bn flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                RSC Audit-এ ব্যর্থ হলে ফ্যাক্টরি বন্ধ হতে পারে!
              </p>
              <p className="text-white/60 text-sm font-bn mt-1">
                আপনার ফ্যাক্টরির ইলেকট্রিক্যাল সিস্টেম কি স্ট্যান্ডার্ড অনুযায়ী?
                এখনই চেক করুন।
              </p>
            </div>

            <p className="text-lg text-white/70 font-bn max-w-lg">
              BNBC 2020, NFPA 70E, RSC Fire Manual — সব standard reference
              tools এক জায়গায়। RSC audit, IR test, LPS risk — সব ফ্রি।
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
              >
                <Download className="h-5 w-5" />
                ফ্রি টুলস ডাউনলোড করুন
              </Link>
              <Link
                href="/tools/rsc-checklist"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition-colors font-bn"
              >
                <Shield className="h-5 w-5" />
                RSC Checklist দেখুন
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-white/50 text-sm font-bn">
                <span className="text-brand-green">✓</span> ৫০+ টুলস
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm font-bn">
                <span className="text-brand-green">✓</span> সম্পূর্ণ ফ্রি
              </div>
            </div>

            {/* Live Download Counter */}
            <div className="flex items-center gap-3 bg-white/5 rounded-lg px-4 py-3 border border-white/10 w-fit">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-brand-green" />
                <span className="text-brand-green text-xs font-bn">
                  লাইভ
                </span>
              </div>
              <div className="h-4 w-px bg-white/10" />
              <div>
                <p className="text-white font-bold text-lg font-en leading-none">
                  {downloadCount.toLocaleString("bn-BD")}
                </p>
                <p className="text-white/40 text-xs font-bn">
                  মোট ডাউনলোড
                </p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />
              {/* Middle ring */}
              <div className="absolute inset-6 rounded-full border-2 border-brand-gold/20" />
              {/* Inner circle */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-blue/20 flex items-center justify-center">
                <Zap className="h-16 w-16 text-brand-gold" />
              </div>
              {/* Floating cards */}
              <div className="absolute -top-2 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Shield className="h-6 w-6 text-brand-green" />
              </div>
              <div className="absolute bottom-4 -left-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Download className="h-6 w-6 text-brand-lightblue" />
              </div>
              {/* Floating download count badge */}
              <div className="absolute -bottom-4 right-8 bg-brand-green/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-brand-green/30">
                <p className="text-white text-xs font-bn">আজকে</p>
                <p className="text-white font-bold text-sm font-en">২৩৪ ডাউনলোড</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
