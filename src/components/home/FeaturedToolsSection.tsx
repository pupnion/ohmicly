import Link from "next/link";
import {
  Shield,
  FileSpreadsheet,
  Zap,
  Palette,
  HardHat,
  ToggleLeft,
  Download,
  Star,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  FileSpreadsheet,
  Zap,
  Palette,
  HardHat,
  ToggleLeft,
};

const colorMap: Record<
  string,
  { bg: string; text: string; badge: string; glow: string; border: string }
> = {
  red: {
    bg: "bg-red-50",
    text: "text-red-600",
    badge: "bg-red-50 text-red-600 border-red-100",
    glow: "group-hover:shadow-red-100",
    border: "group-hover:border-red-200",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    badge: "bg-blue-50 text-blue-600 border-blue-100",
    glow: "group-hover:shadow-blue-100",
    border: "group-hover:border-blue-200",
  },
  yellow: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    badge: "bg-amber-50 text-amber-600 border-amber-100",
    glow: "group-hover:shadow-amber-100",
    border: "group-hover:border-amber-200",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    badge: "bg-purple-50 text-purple-600 border-purple-100",
    glow: "group-hover:shadow-purple-100",
    border: "group-hover:border-purple-200",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    badge: "bg-orange-50 text-orange-600 border-orange-100",
    glow: "group-hover:shadow-orange-100",
    border: "group-hover:border-orange-200",
  },
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-600 border-emerald-100",
    glow: "group-hover:shadow-emerald-100",
    border: "group-hover:border-emerald-200",
  },
};

const tools = [
  {
    title: "RSC Full Electrical Checklist",
    title_en: "RSC Electrical Audit Checklist",
    desc: "47 clauses — in Bangla and English. With BNBC 2020 reference.",
    standard: "BNBC 2020 Sec 1.3.32 | RSC 2021",
    type: "PDF + Excel",
    downloads: 3240,
    href: "/tools/rsc-checklist",
    icon: "Shield",
    color: "red",
    isFree: true,
    isPopular: true,
  },
  {
    title: "IR Test Report Template",
    title_en: "Insulation Resistance Test Report",
    desc: "30 circuits, Auto Kt Correction, automatic PASS/FAIL.",
    standard: "BNBC 2020 Sec 1.3.32 | BS 7671 Table 64",
    type: "Excel",
    downloads: 2891,
    href: "/tools/ir-test-report",
    icon: "FileSpreadsheet",
    color: "blue",
    isFree: true,
    isPopular: true,
  },
  {
    title: "LPS Risk Index Calculator",
    title_en: "Lightning Protection Risk Index",
    desc: "Select from dropdown — Risk Index is calculated automatically.",
    standard: "BNBC 2020 Sec 1.3.33 | Table 8.1.27",
    type: "Excel",
    downloads: 2156,
    href: "/tools/lps-risk-index",
    icon: "Zap",
    color: "yellow",
    isFree: true,
    isPopular: false,
  },
  {
    title: "Wire Color Code Chart",
    title_en: "Wire & Cable Colour Code Reference",
    desc: "IEC 60446, BS 7671, BNBC 2020 — old and new color comparison.",
    standard: "BNBC 2020 Sec 1.3.21 | Table 8.1.21",
    type: "Excel",
    downloads: 1987,
    href: "/tools/wire-color-code",
    icon: "Palette",
    color: "purple",
    isFree: true,
    isPopular: false,
  },
  {
    title: "Arc Flash PPE Selector",
    title_en: "Arc Flash PPE Category Selector",
    desc: "Enter equipment type — Category 1-4 and full PPE list auto.",
    standard: "NFPA 70E 2021 Table 130.7(C)(15)",
    type: "Excel",
    downloads: 1654,
    href: "/tools/arc-flash-ppe",
    icon: "HardHat",
    color: "orange",
    isFree: true,
    isPopular: false,
  },
  {
    title: "CB Selection Guide",
    title_en: "Circuit Breaker Selection Guide",
    desc: "Enter current and Isc — get MCB/MCCB/ACB type and brand suggestion.",
    standard: "BNBC 2020 Sec 1.3.13 | IEC 60898",
    type: "Excel",
    downloads: 1432,
    href: "/tools/cb-selection",
    icon: "ToggleLeft",
    color: "green",
    isFree: true,
    isPopular: false,
  },
];

export default function FeaturedToolsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-blue/[0.03] rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-navy/5 text-brand-navy text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Engineering Tools
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-navy tracking-tight">
            Most Popular Tools
          </h2>
          <p className="mt-4 text-brand-gray text-lg max-w-2xl mx-auto leading-relaxed">
            From RSC Audit to ABC License — everything you need for electrical compliance in one place.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon];
            const colors = colorMap[tool.color];

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className={cn(
                  "group relative bg-white rounded-2xl border border-gray-100 p-6 transition-all duration-300 flex flex-col",
                  "hover:shadow-xl hover:-translate-y-1",
                  colors.glow,
                  colors.border
                )}
              >
                {/* Popular Badge — top right */}
                {tool.isPopular && (
                  <div className="absolute -top-2.5 right-5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-3 py-1 rounded-full bg-brand-navy text-white shadow-md">
                      <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                      POPULAR
                    </span>
                  </div>
                )}

                {/* Icon + Type Badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                      colors.bg
                    )}
                  >
                    <Icon className={cn("h-6 w-6", colors.text)} />
                  </div>
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                    {tool.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-brand-navy leading-snug group-hover:text-brand-blue transition-colors">
                  {tool.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5 tracking-wide uppercase">
                  {tool.title_en}
                </p>

                {/* Description */}
                <p className="mt-3 text-sm text-brand-gray leading-relaxed flex-1">
                  {tool.desc}
                </p>

                {/* Standard Badge */}
                <div className="mt-4">
                  <span
                    className={cn(
                      "inline-block text-[11px] font-medium px-3 py-1 rounded-full border tracking-wide",
                      colors.badge
                    )}
                  >
                    {tool.standard}
                  </span>
                </div>

                {/* Divider */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Download className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500 font-medium">
                      {new Intl.NumberFormat("en-US").format(tool.downloads)}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-blue opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                    View Tool
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  {tool.isFree && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-600 group-hover:hidden">
                      FREE
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-brand-navy text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-brand-navy/90 transition-all duration-200 hover:shadow-lg hover:shadow-brand-navy/20 hover:-translate-y-0.5"
          >
            View All Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            {tools.length} tools available — all free for engineers
          </p>
        </div>
      </div>
    </section>
  );
}
