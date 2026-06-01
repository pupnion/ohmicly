import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "MCQ Bank — Electrical Engineering Questions | OhmiclyLearn",
  description:
    "BNBC 2020, NFPA 70E, general electrical engineering MCQ question bank. Prepare for exams.",
};

const categories = [
  {
    title: "BNBC 2020",
    description: "MCQ questions from Bangladesh National Building Code",
    count: 50,
    time: "30 min",
    color: "bg-brand-blue",
    href: "/mcq/bnbc-2020",
  },
  {
    title: "NFPA 70E",
    description: "Questions on electrical safety and arc flash",
    count: 40,
    time: "25 min",
    color: "bg-brand-gold",
    href: "/mcq/nfpa-70e",
  },
  {
    title: "Electrical Basics",
    description: "Questions on voltage, current, resistance, power factor",
    count: 60,
    time: "35 min",
    color: "bg-brand-green",
    href: "/mcq/electrical-basics",
  },
  {
    title: "Wiring and Cabling",
    description: "Questions on wiring system, cable sizing, color code",
    count: 35,
    time: "20 min",
    color: "bg-brand-purple",
    href: "/mcq/wiring",
  },
  {
    title: "Transformer and Motor",
    description: "Questions on transformer, induction motor, starter",
    count: 45,
    time: "30 min",
    color: "bg-brand-orange",
    href: "/mcq/transformer-motor",
  },
  {
    title: "Fire Safety",
    description: "Questions on RSC Fire Manual, fire alarm, sprinkler system",
    count: 30,
    time: "20 min",
    color: "bg-brand-red",
    href: "/mcq/fire-safety",
  },
];

export default function MCQPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">MCQ Bank</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            Electrical MCQ Question Bank
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            Test yourself with MCQ questions on BNBC 2020, NFPA 70E, and
            general electrical engineering topics.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-blue font-en">260+</p>
            <p className="text-sm text-slate-500 font-bn">Total Questions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-green font-en">6</p>
            <p className="text-sm text-slate-500 font-bn">Categories</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-gold font-en">Free</p>
            <p className="text-sm text-slate-500 font-bn">Completely Free</p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="card p-6 group"
            >
              <div className={`${cat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-slate-800 font-bn mb-2">
                {cat.title}
              </h2>
              <p className="text-sm text-slate-600 font-bn mb-4">
                {cat.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1 font-bn">
                  <Users className="h-4 w-4" /> {cat.count} questions
                </span>
                <span className="flex items-center gap-1 font-bn">
                  <Clock className="h-4 w-4" /> {cat.time}
                </span>
              </div>
              <div className="flex items-center gap-1 text-brand-blue text-sm font-semibold font-bn group-hover:gap-2 transition-all">
                Start <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
