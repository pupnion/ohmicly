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
    title: "Grade A — Higher Electrical",
    desc: "License to work at the highest voltage level. All HT and LT work up to 33kV.",
    voltage: "Up to 33kV",
    color: "bg-brand-red/10 text-brand-red border-brand-red/20",
    icon: "text-brand-red",
  },
  {
    grade: "B",
    title: "Grade B — Medium Electrical",
    desc: "License for medium voltage level work. LT and medium HT work up to 11kV.",
    voltage: "Up to 11kV",
    color: "bg-brand-blue/10 text-brand-blue border-brand-blue/20",
    icon: "text-brand-blue",
  },
  {
    grade: "C",
    title: "Grade C — Lower Electrical",
    desc: "License for low voltage level work. Domestic and commercial work up to LT (400V).",
    voltage: "Up to 400V (LT)",
    color: "bg-brand-green/10 text-brand-green border-brand-green/20",
    icon: "text-brand-green",
  },
];

const applicationSteps = [
  {
    step: "1",
    title: "Check Eligibility",
    desc: "BSc/Diploma in Electrical Engineering + minimum 2 years of work experience. For Grade C: ITI + 5 years experience.",
  },
  {
    step: "2",
    title: "Collect Application Form",
    desc: "Get it from the Chief Inspector of Factories (CIF) office or download online. Fill it out correctly.",
  },
  {
    step: "3",
    title: "Gather Required Documents",
    desc: "Prepare all documents with attested copies. See the detailed list below.",
  },
  {
    step: "4",
    title: "Submit Application",
    desc: "Submit the application form and documents at the CIF office. Pay the fee (according to Grade).",
  },
  {
    step: "5",
    title: "Take Written and Oral Exam",
    desc: "Written exam includes MCQ and descriptive. If you pass, there will be an oral exam (viva).",
  },
  {
    step: "6",
    title: "Receive License",
    desc: "After passing all exams, you will receive the ABC License. Must be renewed after 3 years.",
  },
];

const documents = [
  "Application form (correctly filled)",
  "Educational qualification certificate (BSc/Diploma/ITI — attested)",
  "Work experience certificate (on company letterhead)",
  "National ID card copy (NID)",
  "4 passport-size photos (white background)",
  "Medical Certificate",
  "Character Certificate",
  "Fee payment receipt (Treasury Challan)",
  "Copy of previous license (for renewal)",
  "Trade license of the workplace institution",
];

const faqs = [
  {
    q: "Can I do electrical work without an ABC License?",
    a: "No. ABC License is mandatory for electrical work in Bangladesh. Working without one may result in legal action.",
  },
  {
    q: "How long does it take to get the license?",
    a: "Usually 3-6 months after submitting the application. The exam schedule is communicated from the CIF office.",
  },
  {
    q: "Which grade do I need — A, B, or C?",
    a: "It depends on your work. C for LT (400V), B for up to 11kV, A for up to 33kV. Generally B grade is sufficient for RMG factories.",
  },
  {
    q: "What topics are covered in the MCQ exam?",
    a: "MCQs come from BNBC 2020, NFPA 70E, Electrical Safety Rules, Wiring Regulations (BS 7671), and Basic Electrical Theory.",
  },
  {
    q: "How often must the license be renewed?",
    a: "Must be renewed after 3 years. A separate fee and application is required for renewal.",
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
            Electrical License Guide
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-bn leading-tight">
            Get Your ABC License
            <span className="text-brand-gold"> — Step by Step Guide</span>
          </h1>
          <p className="mt-4 text-white/70 font-bn text-lg max-w-2xl mx-auto">
            ABC License is mandatory for electrical work in Bangladesh. On this
            page you will learn — how to apply, what documents you need,
            and how to prepare for the exam.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mcq"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
            >
              <BookOpen className="h-5 w-5" />
              Practice MCQ
            </Link>
            <a
              href="#grades"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/5 transition-colors font-bn"
            >
              Read More
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
              What is ABC License?
            </h2>
            <p className="mt-3 text-brand-gray font-bn max-w-2xl mx-auto">
              ABC License is the government-approved license for electrical work
              in Bangladesh. It is issued by the Chief Inspector of Factories
              (CIF). There are three grades:
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
              Application Process — 6 Steps
            </h2>
            <p className="mt-3 text-brand-gray font-bn">
              Apply for ABC License step by step
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
              Required Documents
            </h2>
            <p className="mt-3 text-brand-gray font-bn">
              Submit the following documents with your application
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
            Exam Preparation
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white font-bn">
            Prepare for the Exam with MCQ Practice
          </h2>
          <p className="mt-4 text-white/70 font-bn text-lg max-w-2xl mx-auto">
            Practice MCQs on BNBC 2020, NFPA 70E, Electrical Safety — all
            topics. With explanations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/mcq"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
            >
              <BookOpen className="h-5 w-5" />
              Start MCQ Practice
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors font-bn"
            >
              View Free Tools
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
              Frequently Asked Questions
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
