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
  FolderOpen,
  FileText,
  CheckCircle2,
  Eye,
  Printer,
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
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/tools"
            className="hover:text-brand-blue transition-colors"
          >
            Tools
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
                        Most Popular
                      </span>
                    )}
                    {tool.isFree && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-green/10 text-brand-green font-bn">
                        Free
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
                downloads
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
                  Completely Free — No Registration Required
                </p>
                <button className="w-full inline-flex items-center justify-center gap-2 bg-brand-navy text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-brand-navy/90 transition-colors font-bn">
                  <Download className="h-5 w-5" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: How to Use */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-navy to-slate-800 px-6 md:px-10 py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-brand-gold" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  How to Use
                </h2>
                <p className="text-white/50 text-xs mt-0.5">
                  Follow these simple steps to get started
                </p>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="p-6 md:p-10">
            <div className="grid gap-0">
              {tool.howToUse.map((step, i) => {
                const stepIcons = [FolderOpen, FileText, Eye, CheckCircle2, Printer];
                const StepIcon = stepIcons[i % stepIcons.length];
                const isLast = i === tool.howToUse.length - 1;

                return (
                  <div key={i} className="relative flex gap-5">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <div className="relative z-10 w-11 h-11 rounded-xl bg-gradient-to-br from-brand-navy to-slate-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-navy/20">
                        <StepIcon className="h-5 w-5 text-brand-gold" />
                      </div>
                      {!isLast && (
                        <div className="w-0.5 h-full bg-gradient-to-b from-brand-navy/20 to-transparent min-h-[24px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={cn("pb-6", isLast && "pb-0")}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-brand-blue">
                          Step {i + 1}
                        </span>
                      </div>
                      <p className="text-brand-navy font-medium text-sm leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Preview Area */}
            <div className="mt-8 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-navy/10 via-brand-blue/10 to-brand-gold/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden">
                {/* Mock Window Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-100 rounded-md px-3 py-1 text-[10px] text-gray-400 text-center font-mono">
                      {tool.title_en?.toLowerCase().replace(/\s+/g, "-")}.xlsx
                    </div>
                  </div>
                  <FileSpreadsheet className="h-4 w-4 text-emerald-500" />
                </div>
                {/* Placeholder Content */}
                <div className="px-6 py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-200">
                    <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-brand-navy mb-1">
                    Tool Preview
                  </p>
                  <p className="text-xs text-gray-400">
                    Screenshot will be shown here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audience Section */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-10 mb-8">
          <h2 className="text-xl font-bold text-brand-navy font-bn mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-brand-blue" />
            Who Needs This
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
            Frequently Asked Questions
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
              Related Tools
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
