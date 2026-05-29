"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Download,
  ChevronDown,
  FileSpreadsheet,
  Users,
  HelpCircle,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { iconMap, colorMap, type Tool } from "@/lib/tools-data";

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-brand-navy font-bn text-sm pr-4">
          {q}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-brand-gray flex-shrink-0 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "transition-all duration-200 overflow-hidden",
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        )}
      >
        <p className="px-5 text-sm text-brand-gray font-bn leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

export default function ToolDetail({
  tool,
  related,
}: {
  tool: Tool;
  related: Tool[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = iconMap[tool.icon];
  const colors = colorMap[tool.color];

  return (
    <div className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-brand-gray mb-8 font-bn">
          <Link href="/" className="hover:text-brand-blue transition-colors">
            হোম
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/tools"
            className="hover:text-brand-blue transition-colors"
          >
            টুলস
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-brand-navy font-medium">{tool.title}</span>
        </nav>

        {/* Top Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: Icon + Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0",
                    colors.bg
                  )}
                >
                  <Icon className={cn("h-8 w-8", colors.text)} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {tool.isPopular && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-brand-gold/10 text-brand-gold font-bn">
                        <Star className="h-3 w-3" />
                        সবচেয়ে জনপ্রিয়
                      </span>
                    )}
                    {tool.isFree && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-green/10 text-brand-green font-bn">
                        ফ্রি
                      </span>
                    )}
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-brand-gray font-en">
                      {tool.type}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-brand-navy font-bn">
                    {tool.title}
                  </h1>
                  <p className="text-brand-gray font-en text-sm mt-1">
                    {tool.title_en}
                  </p>
                </div>
              </div>

              <p className="text-brand-gray font-bn leading-relaxed mb-6">
                {tool.desc_long}
              </p>

              {/* Standard Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tool.standard_badges.map((badge, i) => (
                  <span
                    key={i}
                    className="inline-block text-xs px-3 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 font-en"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Download Count */}
              <p className="text-sm text-brand-gray font-bn mb-6">
                <span className="font-semibold text-brand-navy">
                  {new Intl.NumberFormat("en-US").format(tool.downloads)}
                </span>{" "}
                বার ডাউনলোড হয়েছে
              </p>
            </div>

            {/* Right: Download Card */}
            <div className="md:w-72 flex-shrink-0">
              <div className="bg-brand-lightgray rounded-xl p-6 text-center">
                <div
                  className={cn(
                    "w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4",
                    colors.bg
                  )}
                >
                  <Icon className={cn("h-8 w-8", colors.text)} />
                </div>
                <p className="font-semibold text-brand-navy font-bn mb-1">
                  {tool.type}
                </p>
                <p className="text-xs text-brand-gray font-bn mb-5">
                  সম্পূর্ণ ফ্রি — Registration ছাড়াই
                </p>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn">
                  <Download className="h-5 w-5" />
                  ডাউনলোড করুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: How to Use */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-8">
          <h2 className="text-xl font-bold text-brand-navy font-bn mb-6">
            কিভাবে ব্যবহার করবেন
          </h2>
          <div className="space-y-4">
            {tool.howToUse.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-navy text-white flex items-center justify-center flex-shrink-0 text-sm font-bold font-bn">
                  {i + 1}
                </div>
                <p className="text-brand-gray font-bn text-sm leading-relaxed pt-1">
                  {step}
                </p>
              </div>
            ))}
          </div>

          {/* Screenshot Placeholder */}
          <div className="mt-8 bg-gray-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center">
              <FileSpreadsheet className="h-10 w-10 text-brand-gray/40 mx-auto mb-2" />
              <p className="text-brand-gray/50 font-bn text-sm">
                টুলের Screenshot এখানে দেখানো হবে
              </p>
            </div>
          </div>
        </div>

        {/* Audience Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-8">
          <h2 className="text-xl font-bold text-brand-navy font-bn mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-blue" />
            কাদের জন্য দরকার
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {tool.audience.map((person, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 bg-brand-lightgray rounded-lg"
              >
                <span className="text-brand-green">✓</span>
                <span className="text-sm text-brand-navy font-bn">
                  {person}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-8">
          <h2 className="text-xl font-bold text-brand-navy font-bn mb-6 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-brand-gold" />
            সচরাচর জিজ্ঞাসা
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                q={faq.q}
                a={faq.a}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Related Tools */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-brand-navy font-bn mb-6">
              সম্পর্কিত টুলস
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((rt) => {
                const RIcon = iconMap[rt.icon];
                const rColors = colorMap[rt.color];
                return (
                  <Link
                    key={rt.slug}
                    href={`/tools/${rt.slug}`}
                    className="group bg-white rounded-xl p-5 border border-gray-100 hover:shadow-lg hover:border-brand-navy/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          rColors.bg
                        )}
                      >
                        <RIcon className={cn("h-5 w-5", rColors.text)} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-brand-navy font-bn text-sm group-hover:text-brand-blue transition-colors">
                          {rt.title}
                        </h3>
                        <p className="text-xs text-brand-gray font-en">
                          {rt.title_en}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-brand-gray font-bn leading-relaxed">
                      {rt.desc}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
