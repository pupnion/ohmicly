"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, ArrowRight, Zap, Shield } from "lucide-react";

export default function HeroSection() {
  const [downloadCount, setDownloadCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setDownloadCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-brand-navy overflow-hidden">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-left">
            {/* H1 */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight font-bn">
              Electrical Engineering{" "}
              <span className="text-brand-gold">Tools Box</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/60 font-bn max-w-lg leading-relaxed">
              BNBC 2020, NFPA 70E, RSC Fire Manual — all standard reference
              tools in one place. RSC audit, IR test, LPS risk — all free.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tools/rsc-checklist"
                className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
              >
                RSC Requirements
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors font-bn"
              >
                <Download className="h-5 w-5" />
                Free Download
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              {/* Live Downloads */}
              <div>
                <p className="text-xl md:text-2xl font-bold text-white font-en">
                  {downloadCount.toLocaleString("en-US")}
                  <span className="text-brand-green text-xs ml-1.5">●</span>
                </p>
                <p className="text-white/40 text-sm font-bn">Downloads</p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              {/* Tools */}
              <div>
                <p className="text-xl md:text-2xl font-bold text-white font-en">
                  120+
                </p>
                <p className="text-white/40 text-sm font-bn">Tools</p>
              </div>

              <div className="h-10 w-px bg-white/10" />

              {/* Templates */}
              <div>
                <p className="text-xl md:text-2xl font-bold text-white font-en">
                  80+
                </p>
                <p className="text-white/40 text-sm font-bn">Templates</p>
              </div>
            </div>
          </div>

          {/* Right Visual — Animated Icon */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-80 h-80">
              {/* Outer spinning ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-spin-slow" />
              {/* Middle ring */}
              <div className="absolute inset-6 rounded-full border-2 border-brand-gold/20" />
              {/* Inner circle with icon */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-blue/20 flex items-center justify-center">
                <Zap className="h-16 w-16 text-brand-gold" />
              </div>
              {/* Floating badge — top right */}
              <div className="absolute -top-2 right-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Shield className="h-6 w-6 text-brand-green" />
              </div>
              {/* Floating badge — bottom left */}
              <div className="absolute bottom-4 -left-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <Download className="h-6 w-6 text-brand-lightblue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
