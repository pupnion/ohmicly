import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Clock, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "MCQ ব্যাংক — ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং প্রশ্ন | OhmiclyLearn",
  description:
    "BNBC 2020, NFPA 70E, সাধারণ ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং MCQ প্রশ্নব্যাংক। পরীক্ষার প্রস্তুতি নিন।",
};

const categories = [
  {
    title: "BNBC 2020",
    description: "বাংলাদেশ জাতীয় ভবন নির্মাণ সংহিতা থেকে MCQ প্রশ্ন",
    count: 50,
    time: "৩০ মিনিট",
    color: "bg-brand-blue",
    href: "/mcq/bnbc-2020",
  },
  {
    title: "NFPA 70E",
    description: "ইলেকট্রিক্যাল সেফটি এবং আর্ক ফ্ল্যাশ সম্পর্কিত প্রশ্ন",
    count: 40,
    time: "২৫ মিনিট",
    color: "bg-brand-gold",
    href: "/mcq/nfpa-70e",
  },
  {
    title: "ইলেকট্রিক্যাল বেসিক",
    description: "ভোল্টেজ, কারেন্ট, রেজিস্ট্যান্স, পাওয়ার ফ্যাক্টর বিষয়ক প্রশ্ন",
    count: 60,
    time: "৩৫ মিনিট",
    color: "bg-brand-green",
    href: "/mcq/electrical-basics",
  },
  {
    title: "ওয়ারিং ও ক্যাবলিং",
    description: "ওয়ারিং সিস্টেম, ক্যাবল সাইজিং, কালার কোড সম্পর্কিত প্রশ্ন",
    count: 35,
    time: "২০ মিনিট",
    color: "bg-brand-purple",
    href: "/mcq/wiring",
  },
  {
    title: "ট্রান্সফরমার ও মোটর",
    description: "ট্রান্সফরমার, ইন্ডাকশন মোটর, স্টার্টার সম্পর্কিত প্রশ্ন",
    count: 45,
    time: "৩০ মিনিট",
    color: "bg-brand-orange",
    href: "/mcq/transformer-motor",
  },
  {
    title: "ফায়ার সেফটি",
    description: "RSC Fire Manual, ফায়ার অ্যালার্ম, স্প্রিংকলার সিস্টেম প্রশ্ন",
    count: 30,
    time: "২০ মিনিট",
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
          <span className="badge-bnbc mb-4 inline-block">MCQ ব্যাংক</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            ইলেকট্রিক্যাল MCQ প্রশ্নব্যাংক
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            BNBC 2020, NFPA 70E এবং সাধারণ ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং বিষয়ে
            MCQ প্রশ্নের মাধ্যমে নিজেকে যাচাই করুন।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-blue font-en">260+</p>
            <p className="text-sm text-slate-500 font-bn">মোট প্রশ্ন</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-green font-en">6</p>
            <p className="text-sm text-slate-500 font-bn">ক্যাটাগরি</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-gold font-en">ফ্রি</p>
            <p className="text-sm text-slate-500 font-bn">সম্পূর্ণ বিনামূল্যে</p>
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
                  <Users className="h-4 w-4" /> {cat.count} প্রশ্ন
                </span>
                <span className="flex items-center gap-1 font-bn">
                  <Clock className="h-4 w-4" /> {cat.time}
                </span>
              </div>
              <div className="flex items-center gap-1 text-brand-blue text-sm font-semibold font-bn group-hover:gap-2 transition-all">
                শুরু করুন <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
