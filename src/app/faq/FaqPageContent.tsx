"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Zap,
  BookOpen,
  Shield,
  Flame,
  Cable,
  MessageCircle,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ── Data ── */
const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "general", label: "General", icon: MessageCircle },
  { id: "bnbc", label: "BNBC 2020", icon: BookOpen },
  { id: "nfpa", label: "NFPA 70E", icon: Shield },
  { id: "rsc", label: "RSC Fire", icon: Flame },
  { id: "electrical", label: "Electrical", icon: Cable },
] as const;

type CategoryId = (typeof categories)[number]["id"];

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: Exclude<CategoryId, "all">;
}

const faqData: FaqItem[] = [
  // General
  {
    id: "g1",
    question: "Is OhmiclyLearn really free?",
    answer:
      "Yes, 100% free. All tools, templates, MCQs, and standard references are completely free — no hidden charges, no premium tier. Our mission is to support RMG factory electrical engineers in Bangladesh.",
    category: "general",
  },
  {
    id: "g2",
    question: "Do I need to register to download tools?",
    answer:
      "No registration required for downloading tools. Simply browse, click download, and use. However, creating a free account gives you access to your dashboard, download history, and bookmarking features.",
    category: "general",
  },
  {
    id: "g3",
    question: "Can I use these tools for commercial factory audits?",
    answer:
      "Absolutely. All tools are designed specifically for real-world RMG factory use — RSC audits, IR testing, LPS assessments, and more. Use them freely in your professional work.",
    category: "general",
  },
  {
    id: "g4",
    question: "How often are tools and standards updated?",
    answer:
      "We review and update tools whenever standards change. BNBC 2020, NFPA 70E, and RSC Fire Manual references are kept current. Subscribe to our newsletter to get notified of updates.",
    category: "general",
  },
  {
    id: "g5",
    question: "Who created OhmiclyLearn?",
    answer:
      "OhmiclyLearn was created by experienced electrical engineers working in Bangladesh's RMG sector. We built it to solve the real problems we face daily — lack of accessible tools, unclear standard references, and time-consuming manual calculations.",
    category: "general",
  },
  // BNBC 2020
  {
    id: "b1",
    question: "Which BNBC 2020 clauses relate to electrical installations?",
    answer:
      "The key electrical clauses are in Part 6 (Section 6.2 — Electrical Installation). This covers wiring methods, overcurrent protection, grounding, and panel schedules. Our RSC Checklist maps every clause for you.",
    category: "bnbc",
  },
  {
    id: "b2",
    question: "Does BNBC 2020 apply to existing factories or only new construction?",
    answer:
      "BNBC 2020 primarily applies to new construction and major renovations. However, RSC audits often reference BNBC clauses for existing installations. Our tools help you bridge both scenarios.",
    category: "bnbc",
  },
  {
    id: "b3",
    question: "What is the difference between BNBC 2020 and BS 7671?",
    answer:
      "BNBC 2020 is Bangladesh's national building code, while BS 7671 is the UK wiring regulation. BNBC borrows heavily from BS 7671 but adapts requirements for Bangladesh's climate and infrastructure. Our tools reference both where applicable.",
    category: "bnbc",
  },
  {
    id: "b4",
    question: "Where can I download the BNBC 2020 standard?",
    answer:
      "The official BNBC 2020 document is published by the Ministry of Housing and Public Works. We provide key clause references and summaries in our tools. Visit our Standards section for detailed guides.",
    category: "bnbc",
  },
  // NFPA 70E
  {
    id: "n1",
    question: "What is NFPA 70E and why does it matter for RMG factories?",
    answer:
      "NFPA 70E is the US standard for electrical safety in the workplace. It defines arc flash boundaries, PPE requirements, and safe work practices. Many international buyers require NFPA 70E compliance for factory audits.",
    category: "nfpa",
  },
  {
    id: "n2",
    question: "How do I calculate arc flash incident energy?",
    answer:
      "Arc flash incident energy depends on fault current, clearing time, and working distance. Use our Arc Flash PPE Calculator — it uses the IEEE 1584 method to calculate incident energy and recommends the correct PPE category.",
    category: "nfpa",
  },
  {
    id: "n3",
    question: "What PPE category do I need for my electrical panel work?",
    answer:
      "NFPA 70E defines 4 PPE categories based on incident energy (cal/cm²). Category 1 (4 cal/cm²) requires FR shirt and safety glasses. Category 4 (40 cal/cm²) requires a full arc flash suit. Use our calculator to determine your exact category.",
    category: "nfpa",
  },
  // RSC Fire
  {
    id: "r1",
    question: "What does the RSC Fire Manual check during audits?",
    answer:
      "RSC audits verify 47+ clauses covering electrical installations, fire detection, emergency lighting, cable management, earthing systems, and more. Our RSC Checklist breaks down every clause with pass/fail criteria.",
    category: "rsc",
  },
  {
    id: "r2",
    question: "How can I prepare my factory for an RSC electrical audit?",
    answer:
      "Start with our RSC Checklist — it covers all electrical clauses. Key areas: proper cable sizing, correct breaker ratings, functional earth continuity, labeled panels, and maintained IR test records. Download the checklist and do a self-audit first.",
    category: "rsc",
  },
  {
    id: "r3",
    question: "What IR test values are acceptable for RSC compliance?",
    answer:
      "For cables and wiring: minimum 1 MΩ at 500V DC. For motors: minimum 1 MΩ per kV of rated voltage + 1 MΩ. Temperature-corrected values using k-factors are required. Our IR Test Report tool handles all corrections automatically.",
    category: "rsc",
  },
  {
    id: "r4",
    question: "How often should IR testing be done?",
    answer:
      "RSC recommends annual IR testing for all electrical installations. Critical systems (fire pumps, emergency lighting) may require quarterly testing. Always keep records with temperature correction data for audit purposes.",
    category: "rsc",
  },
  // Electrical
  {
    id: "e1",
    question: "How do I select the right circuit breaker for a motor?",
    answer:
      "Motor CB selection depends on full-load current (FLC), starting current, and cable size. Rule: CB rating = FLC × 1.25 (for continuous duty). Our CB Selection Calculator handles all standard motor ratings and trip curve selection.",
    category: "electrical",
  },
  {
    id: "e2",
    question: "What is the correct wire color code for Bangladesh?",
    answer:
      "Bangladesh follows a mix of BS 7671 and local standards: Brown (Live), Blue (Neutral), Green-Yellow (Earth). Three-phase: Brown, Black, Grey. Always verify with your factory's specific documentation. Our Wire Color Code tool shows all combinations.",
    category: "electrical",
  },
  {
    id: "e3",
    question: "How do I calculate earth fault loop impedance?",
    answer:
      "Earth fault loop impedance (Zs) = Ze + (R1 + R2) × length / 1000. Ze is the external impedance, R1+R2 is the circuit conductor resistance per km. It must be low enough for the CB to trip within 0.4s (for 230V). Use our tools for quick calculations.",
    category: "electrical",
  },
  {
    id: "e4",
    question: "What size earthing conductor do I need?",
    answer:
      "Earthing conductor size depends on the main protective conductor size. Minimum 10mm² for TN-S systems, 16mm² for TT systems. For factories, cross-reference with BNBC 2020 Table 6.2 and your specific fault current rating.",
    category: "electrical",
  },
  {
    id: "e5",
    question: "What is the difference between RCD and MCB?",
    answer:
      "MCB (Miniature Circuit Breaker) protects against overcurrent and short circuits. RCD (Residual Current Device) protects against earth leakage and electrocution. For factory safety, you need both — MCBs for equipment protection, RCDs for personnel protection.",
    category: "electrical",
  },
];

/* ── Category color mapping ── */
const categoryColors: Record<
  string,
  { bg: string; text: string; border: string; accent: string }
> = {
  general: {
    bg: "bg-brand-blue/10",
    text: "text-brand-blue",
    border: "border-brand-blue/20",
    accent: "bg-brand-blue",
  },
  bnbc: {
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    border: "border-brand-green/20",
    accent: "bg-brand-green",
  },
  nfpa: {
    bg: "bg-brand-gold/10",
    text: "text-brand-gold",
    border: "border-brand-gold/20",
    accent: "bg-brand-gold",
  },
  rsc: {
    bg: "bg-brand-red/10",
    text: "text-brand-red",
    border: "border-brand-red/20",
    accent: "bg-brand-red",
  },
  electrical: {
    bg: "bg-brand-purple/10",
    text: "text-brand-purple",
    border: "border-brand-purple/20",
    accent: "bg-brand-purple",
  },
};

/* ── Accordion Item ── */
function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const colors = categoryColors[faq.category];

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "group relative rounded-xl border transition-all duration-300",
        isOpen
          ? `${colors.border} ${colors.bg} shadow-sm`
          : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Accent bar */}
      <div
        className={cn(
          "absolute left-0 top-4 bottom-4 w-1 rounded-full transition-all duration-300",
          isOpen ? `${colors.accent} opacity-100` : "opacity-0"
        )}
      />

      <button
        onClick={onToggle}
        className="w-full text-left px-5 pl-7 py-4 flex items-start gap-4 cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Category dot */}
        <div
          className={cn(
            "w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 transition-all duration-300",
            isOpen
              ? colors.accent
              : "bg-slate-200 group-hover:bg-slate-300"
          )}
        />

        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "text-[15px] font-semibold font-bn leading-snug transition-colors duration-200",
              isOpen
                ? "text-brand-navy"
                : "text-slate-700 group-hover:text-brand-navy"
            )}
          >
            {faq.question}
          </span>
        </div>

        <div
          className={cn(
            "shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 mt-0.5",
            isOpen
              ? `${colors.bg} ${colors.text} rotate-0`
              : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? height : 0 }}
      >
        <div ref={contentRef} className="px-5 pl-7 pb-4">
          <div className="ml-6 pl-4 border-l-2 border-slate-100">
            <p className="text-sm text-slate-600 font-bn leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page Content ── */
export default function FaqPageContent() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [tabUnderline, setTabUnderline] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const categoryIndex = categories.findIndex((c) => c.id === activeCategory);

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    let items = faqData;
    if (activeCategory !== "all") {
      items = items.filter((f) => f.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqData.length };
    for (const cat of categories) {
      if (cat.id !== "all") {
        counts[cat.id] = faqData.filter((f) => f.category === cat.id).length;
      }
    }
    return counts;
  }, []);

  // Update tab underline position
  useEffect(() => {
    const tab = tabsRef.current[categoryIndex];
    if (tab) {
      setTabUnderline({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [activeCategory, categoryIndex]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    if (openItems.size === filteredFaqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredFaqs.map((f) => f.id)));
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/50 text-sm font-bn mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">FAQ</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-gold/20 text-brand-gold rounded-full px-4 py-1.5 mb-5">
              <HelpCircle className="h-4 w-4" />
              <span className="text-sm font-semibold font-bn">Help Center</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-bn leading-tight">
              Frequently Asked{" "}
              <span className="text-brand-gold">Questions</span>
            </h1>
            <p className="mt-4 text-white/60 font-bn text-lg max-w-xl">
              Everything you need to know about electrical standards, tools, and
              compliance for RMG factories in Bangladesh
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap gap-6">
            {[
              { label: "Total Questions", value: faqData.length.toString() },
              { label: "Categories", value: (categories.length - 1).toString() },
              { label: "Standards Covered", value: "4" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-brand-gold" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg font-bn">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs font-bn">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gradient-to-b from-white via-brand-lightgray/30 to-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative mb-8 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bn placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue/40 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bn"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="relative mb-8">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide relative">
              {/* Animated underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-brand-navy rounded-full transition-all duration-300 ease-out"
                style={{
                  left: tabUnderline.left,
                  width: tabUnderline.width,
                }}
              />

              {categories.map((cat, i) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenItems(new Set());
                    }}
                    className={cn(
                      "relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium font-bn transition-all duration-200 whitespace-nowrap shrink-0",
                      isActive
                        ? "text-brand-navy"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        isActive && "text-brand-navy"
                      )}
                    />
                    <span>{cat.label}</span>
                    <span
                      className={cn(
                        "text-xs px-1.5 py-0.5 rounded-full transition-all duration-200 ml-0.5",
                        isActive
                          ? "bg-brand-navy text-white"
                          : "bg-slate-100 text-slate-400"
                      )}
                    >
                      {categoryCounts[cat.id]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-slate-500 font-bn">
              <span className="font-semibold text-brand-navy">
                {filteredFaqs.length}
              </span>{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
              {searchQuery && (
                <span className="text-slate-400">
                  {" "}
                  matching &ldquo;{searchQuery}&rdquo;
                </span>
              )}
            </p>
            <button
              onClick={expandAll}
              className="text-sm text-brand-blue hover:text-brand-blue/80 font-medium font-bn transition-colors"
            >
              {openItems.size === filteredFaqs.length
                ? "Collapse All"
                : "Expand All"}
            </button>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openItems.has(faq.id)}
                onToggle={() => toggleItem(faq.id)}
                index={index}
              />
            ))}
          </div>

          {/* Empty state */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-slate-300" />
              </div>
              <p className="text-slate-500 font-bn text-lg mb-1">
                No questions found
              </p>
              <p className="text-slate-400 font-bn text-sm">
                Try a different search term or category
              </p>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-brand-navy rounded-2xl px-8 py-8 shadow-xl shadow-brand-navy/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-brand-gold" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white font-bn text-lg">
                    Still have questions?
                  </p>
                  <p className="text-white/60 font-bn text-sm">
                    We&apos;re here to help with any electrical engineering
                    question
                  </p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold text-sm px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bn shrink-0"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
