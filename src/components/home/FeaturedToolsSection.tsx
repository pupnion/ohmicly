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

const colorMap: Record<string, { bg: string; text: string; badge: string }> = {
  red: { bg: "bg-red-50", text: "text-brand-red", badge: "bg-red-50 text-red-700 border-red-200" },
  blue: { bg: "bg-blue-50", text: "text-brand-blue", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  yellow: { bg: "bg-yellow-50", text: "text-brand-gold", badge: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  purple: { bg: "bg-purple-50", text: "text-brand-purple", badge: "bg-purple-50 text-purple-700 border-purple-200" },
  orange: { bg: "bg-orange-50", text: "text-brand-orange", badge: "bg-orange-50 text-orange-700 border-orange-200" },
  green: { bg: "bg-green-50", text: "text-brand-green", badge: "bg-green-50 text-green-700 border-green-200" },
};

const tools = [
  {
    title: "RSC Full Electrical Checklist",
    title_en: "RSC Electrical Audit Checklist",
    desc: "৪৭টি clause — বাংলায় ও ইংরেজিতে। BNBC 2020 reference সহ।",
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
    desc: "৩০ সার্কিট, Auto Kt Correction, PASS/FAIL automatic।",
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
    desc: "Dropdown থেকে select করুন — Risk Index auto calculate।",
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
    desc: "IEC 60446, BS 7671, BNBC 2020 — পুরনো ও নতুন রঙ তুলনা।",
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
    desc: "Equipment type দিলে Category 1-4 ও সব PPE list auto।",
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
    desc: "Current ও Isc দিলে MCB/MCCB/ACB type ও brand suggest।",
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
    <section className="py-20 bg-brand-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-bn">
            সবচেয়ে বেশি ব্যবহৃত টুলস
          </h2>
          <p className="mt-3 text-brand-gray font-bn text-lg">
            RSC Audit থেকে শুরু করে ABC License পর্যন্ত
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon];
            const colors = colorMap[tool.color];

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-navy/10 transition-all duration-200 flex flex-col"
              >
                {/* Top Row: Icon + Badges */}
                <div className="flex items-start justify-between mb-4">
                  <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
                    <Icon className={cn("h-6 w-6", colors.text)} />
                  </div>
                  <div className="flex gap-2">
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
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-brand-navy font-bn group-hover:text-brand-blue transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-brand-gray mt-0.5 font-en">{tool.title_en}</p>

                {/* Description */}
                <p className="mt-3 text-sm text-brand-gray font-bn leading-relaxed flex-1">
                  {tool.desc}
                </p>

                {/* Standard Badge */}
                <div className="mt-4">
                  <span className={cn("inline-block text-xs px-3 py-1 rounded-full border font-en", colors.badge)}>
                    {tool.standard}
                  </span>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-brand-gray font-bn">
                    {new Intl.NumberFormat("en-US").format(tool.downloads)} ডাউনলোড
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue font-bn group-hover:gap-2.5 transition-all">
                    <Download className="h-4 w-4" />
                    ডাউনলোড করুন
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
