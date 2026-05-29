import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, FileText, Flame, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ইলেকট্রিক্যাল স্ট্যান্ডার্ড — BNBC 2020, NFPA 70E, RSC | OhmiclyLearn",
  description:
    "BNBC 2020, NFPA 70E, RSC Fire Manual — বাংলাদেশের ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের জন্য সম্পূর্ণ গাইড।",
};

const standards = [
  {
    title: "BNBC 2020",
    subtitle: "বাংলাদেশ জাতীয় ভবন নির্মাণ সংহিতা",
    description:
      "ইলেকট্রিক্যাল ইনস্টলেশন, আর্থিং, লাইটনিং প্রোটেকশন সিস্টেম (LPS), এবং ফায়ার সেফটির জন্য বাধ্যতামূলক স্ট্যান্ডার্ড।",
    icon: BookOpen,
    href: "/standards/bnbc-2020",
    color: "bg-brand-blue",
    topics: [
      "ইলেকট্রিক্যাল ইনস্টলেশন কোড",
      "আর্থিং সিস্টেম ডিজাইন",
      "LPS (লাইটনিং প্রোটেকশন সিস্টেম)",
      "ফায়ার অ্যালার্ম সিস্টেম",
      "ইমার্জেন্সি লাইটিং",
    ],
  },
  {
    title: "NFPA 70E",
    subtitle: "ওয়ার্কপ্লেস ইলেকট্রিক্যাল সেফটি স্ট্যান্ডার্ড",
    description:
      "আর্ক ফ্ল্যাশ হাজার্ড, PPE সিলেকশন, ইলেকট্রিক্যাল সেফ ওয়ার্ক প্র্যাকটিসের জন্য আন্তর্জাতিক স্ট্যান্ডার্ড।",
    icon: Shield,
    href: "/standards/nfpa-70e",
    color: "bg-brand-gold",
    topics: [
      "আর্ক ফ্ল্যাশ হাজার্ড অ্যানালাইসিস",
      "PPE ক্যাটাগরি সিলেকশন",
      "লকআউট/ট্যাগআউট (LOTO)",
      "ইলেকট্রিক্যাল সেফ ওয়ার্ক প্র্যাকটিস",
      "বাউন্ডারি ডিস্ট্যান্স",
    ],
  },
  {
    title: "RSC Fire Manual",
    subtitle: "রেডিমেড গার্মেন্টস ফায়ার সেফটি ম্যানুয়াল",
    description:
      "RMG ফ্যাক্টরির জন্য ফায়ার সেফটি কমপ্লায়েন্স, ফায়ার ডিটেকশন, স্প্রিংকলার সিস্টেম এবং ইভ্যাকুয়েশন প্ল্যান।",
    icon: Flame,
    href: "/standards/rsc-fire",
    color: "bg-brand-red",
    topics: [
      "ফায়ার ডিটেকশন সিস্টেম",
      "স্প্রিংকলার সিস্টেম ডিজাইন",
      "ইভ্যাকুয়েশন প্ল্যান",
      "ফায়ার এক্সটিংগুইশার প্লেসমেন্ট",
      "ইলেকট্রিক্যাল ফায়ার প্রিভেনশন",
    ],
  },
];

export default function StandardsPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">স্ট্যান্ডার্ড রেফারেন্স</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            ইলেকট্রিক্যাল স্ট্যান্ডার্ড গাইড
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            BNBC 2020, NFPA 70E এবং RSC Fire Manual — বাংলাদেশের RMG ফ্যাক্টরি
            ইঞ্জিনিয়ারদের জন্য সম্পূর্ণ রেফারেন্স গাইড।
          </p>
        </div>

        {/* Standards Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {standards.map((standard) => (
            <Link
              key={standard.href}
              href={standard.href}
              className="card p-6 group"
            >
              <div
                className={`${standard.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <standard.icon className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-bn mb-1">
                {standard.title}
              </h2>
              <p className="text-sm text-brand-blue font-bn mb-3">
                {standard.subtitle}
              </p>
              <p className="text-slate-600 text-sm font-bn mb-4">
                {standard.description}
              </p>
              <ul className="space-y-2 mb-4">
                {standard.topics.map((topic) => (
                  <li
                    key={topic}
                    className="text-sm text-slate-500 font-bn flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                    {topic}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1 text-brand-blue text-sm font-semibold font-bn group-hover:gap-2 transition-all">
                বিস্তারিত পড়ুন <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
