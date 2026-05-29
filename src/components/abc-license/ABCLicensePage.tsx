"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  FileText,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  ClipboardList,
  BookOpen,
  Zap,
  Users,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Accordion ── */
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

/* ── Data ── */
const grades = [
  {
    grade: "A",
    title: "Grade A — উচ্চতর ইলেকট্রিক্যাল",
    desc: "সর্বোচ্চ ভোল্টেজ level-এ কাজ করার লাইসেন্স। 33kV পর্যন্ত HT ও LT সব কাজ।",
    voltage: "33kV পর্যন্ত",
    color: "bg-brand-red/10 text-brand-red border-brand-red/20",
    icon: "text-brand-red",
  },
  {
    grade: "B",
    title: "Grade B — মাঝারি ইলেকট্রিক্যাল",
    desc: "মাঝারি voltage level-এ কাজের লাইসেন্স। 11kV পর্যন্ত LT ও মাঝারি HT কাজ।",
    voltage: "11kV পর্যন্ত",
    color: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    icon: "text-brand-blue",
  },
  {
    grade: "C",
    title: "Grade C — নিম্ন ইলেকট্রিক্যাল",
    desc: "নিম্ন voltage level-এ কাজের লাইসেন্স। LT (400V) পর্যন্ত ঘরোয়া ও বাণিজ্যিক কাজ।",
    voltage: "400V (LT) পর্যন্ত",
    color: "bg-brand-green/10 text-brand-green border-brand-green/20",
    icon: "text-brand-green",
  },
];

const applicationSteps = [
  {
    step: "১",
    title: "যোগ্যতা যাচাই করুন",
    desc: "BSc/Diploma in Electrical Engineering + ন্যূনতম ২ বছরের কাজের অভিজ্ঞতা। Grade C-এর জন্য ITI + ৫ বছর অভিজ্ঞতা।",
  },
  {
    step: "২",
    title: "আবেদন ফরম সংগ্রহ করুন",
    desc: "Chief Inspector of Factories (CIF) অফিস থেকে বা online download করুন। সঠিকভাবে পূরণ করুন।",
  },
  {
    step: "৩",
    title: "প্রয়োজনীয় কাগজপত্র সংগ্রহ",
    desc: "সব কাগজপত্র attested কপি সহ প্রস্তুত করুন। নিচে বিস্তারিত তালিকা আছে।",
  },
  {
    step: "৪",
    title: "আবেদন জমা দিন",
    desc: "CIF অফিসে আবেদন ফরম ও কাগজপত্র জমা দিন। ফি জমা দিন (Grade অনুযায়ী)।",
  },
  {
    step: "৫",
    title: "লিখিত ও মৌখিক পরীক্ষা দিন",
    desc: "লিখিত পরীক্ষায় MCQ ও descriptive। পাশ করলে মৌখিক পরীক্ষা (viva) হবে।",
  },
  {
    step: "৬",
    title: "লাইসেন্স গ্রহণ",
    desc: "সব পরীক্ষায় উত্তীর্ণ হলে ABC License পাবেন। ৩ বছর পর নবায়ন করতে হবে।",
  },
];

const documents = [
  "আবেদন ফরম (সঠিকভাবে পূরিত)",
  "শিক্ষাগত যোগ্যতার সার্টিফিকেট (BSc/Diploma/ITI — attested)",
  "কাজের অভিজ্ঞতার সার্টিফিকেট (সংস্থার লেটারহেডে)",
  "জাতীয় পরিচয়পত্রের কপি (NID)",
  "পাসপোর্ট সাইজের ৪ কপি ছবি (সাদা পটভূমি)",
  "স্বাস্থ্য সনদ (Medical Certificate)",
  "চারিত্রিক সনদ (Character Certificate)",
  "ফি প্রদানের রসিদ (Treasury Challan)",
  "পূর্ববর্তী লাইসেন্সের কপি (নবায়নের ক্ষেত্রে)",
  "কর্মস্থলের প্রতিষ্ঠানের ট্রেড লাইসেন্স কপি",
];

const faqs = [
  {
    q: "ABC License ছাড়া ইলেকট্রিক্যাল কাজ করা যায়?",
    a: "না। বাংলাদেশে ইলেকট্রিক্যাল কাজ করতে ABC License বাধ্যতামূলক। ছাড়া কাজ করলে আইনানুগ ব্যবস্থা নেওয়া হতে পারে।",
  },
  {
    q: "কত সময়ে লাইসেন্স পাওয়া যায়?",
    a: "আবেদন জমা দেওয়ার পর সাধারণত ৩-৬ মাস সময় লাগে। পরীক্ষার সময়সূচী CIF অফিস থেকে জানানো হয়।",
  },
  {
    q: "Grade A, B, C — কোনটা দরকার?",
    a: "আপনার কাজের উপর নির্ভর করে। LT (400V) কাজে C, 11kV পর্যন্ত B, 33kV পর্যন্ত A দরকার। সাধারণত RMG factory-এ B grade যথেষ্ট।",
  },
  {
    q: "MCQ পরীক্ষায় কোন বিষয় থেকে আসে?",
    a: "BNBC 2020, NFPA 70E, Electrical Safety Rules, Wiring Regulations (BS 7671), Basic Electrical Theory — এই বিষয়গুলো থেকে MCQ আসে।",
  },
  {
    q: "লাইসেন্স নবায়ন কত সময় পর?",
    a: "৩ বছর পর নবায়ন করতে হবে। নবায়নের জন্য আলাদা ফি ও আবেদন প্রয়োজন।",
  },
];

/* ── Page ── */
export default function ABCLicensePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-brand-navy py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-sm font-medium font-bn mb-6">
            <Award className="h-4 w-4" />
            ইলেকট্রিক্যাল লাইসেন্স গাইড
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-bn leading-tight">
            ABC License করুন
            <span className="text-brand-gold"> — ধাপে ধাপে গাইড</span>
          </h1>
          <p className="mt-4 text-white/70 font-bn text-lg max-w-2xl mx-auto">
            বাংলাদেশে ইলেকট্রিক্যাল কাজ করতে ABC License বাধ্যতামূলক। এই
            পেজে আপনি জানবেন — কিভাবে আবেদন করবেন, কোন কাগজপত্র লাগবে,
            এবং পরীক্ষায় কিভাবে প্রস্তুতি নেবেন।
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mcq"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
            >
              <BookOpen className="h-5 w-5" />
              MCQ Practice করুন
            </Link>
            <a
              href="#grades"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition-colors font-bn"
            >
              বিস্তারিত পড়ুন
              <ChevronRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── What is ABC License ── */}
      <section id="grades" className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-bn">
              ABC License কি?
            </h2>
            <p className="mt-3 text-brand-gray font-bn max-w-2xl mx-auto">
              ABC License হলো বাংলাদেশে ইলেকট্রিক্যাল কাজ করার জন্য
              সরকারি অনুমোদিত লাইসেন্স। Chief Inspector of Factories (CIF)
              কর্তৃক প্রদান করা হয়। তিন ধরনের Grade আছে:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {grades.map((g) => (
              <div
                key={g.grade}
                className={cn(
                  "rounded-xl border-2 p-6 text-center",
                  g.color
                )}
              >
                <div className="text-5xl font-bold font-en mb-3">
                  {g.grade}
                </div>
                <h3 className="text-lg font-bold text-brand-navy font-bn mb-2">
                  {g.title}
                </h3>
                <p className="text-sm text-brand-gray font-bn mb-4">{g.desc}</p>
                <div className="inline-block bg-white rounded-full px-4 py-1.5 text-xs font-semibold font-en border">
                  {g.voltage}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Application Process ── */}
      <section className="py-16 md:py-20 bg-brand-lightgray">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-bn">
              আবেদন প্রক্রিয়া — ৬টি ধাপ
            </h2>
            <p className="mt-3 text-brand-gray font-bn">
              ধাপে ধাপে ABC License এর জন্য আবেদন করুন
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applicationSteps.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-brand-navy text-white flex items-center justify-center text-sm font-bold font-bn mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-brand-navy font-bn mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-brand-gray font-bn leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Required Documents ── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-bn">
              প্রয়োজনীয় কাগজপত্র
            </h2>
            <p className="mt-3 text-brand-gray font-bn">
              আবেদনের সাথে নিচের কাগজপত্র জমা দিন
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-brand-lightgray rounded-xl p-6 md:p-8">
            <div className="space-y-3">
              {documents.map((doc, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ClipboardList className="h-5 w-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-brand-navy font-bn">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MCQ Practice CTA ── */}
      <section className="py-16 md:py-20 bg-brand-navy relative overflow-hidden">
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-gold/10 text-brand-gold px-4 py-1.5 rounded-full text-sm font-medium font-bn mb-6">
            <Zap className="h-4 w-4" />
            পরীক্ষার প্রস্তুতি
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white font-bn">
            MCQ Practice করে পরীক্ষার প্রস্তুতি নিন
          </h2>
          <p className="mt-4 text-white/70 font-bn text-lg max-w-2xl mx-auto">
            BNBC 2020, NFPA 70E, Electrical Safety — সব বিষয়ে MCQ Practice
            করুন। বাংলায় explanation সহ।
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mcq"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
            >
              <BookOpen className="h-5 w-5" />
              MCQ Practice শুরু করুন
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors font-bn"
            >
              ফ্রি টুলস দেখুন
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 md:py-20 bg-brand-lightgray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy font-bn">
              সচরাচর জিজ্ঞাসা
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
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
      </section>
    </div>
  );
}
