import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Users, Clock, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "ফোরাম — ইলেকট্রিক্যাল ইঞ্জিনিয়ার কমিউনিটি | OhmiclyLearn",
  description:
    "ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের কমিউনিটি ফোরাম। প্রশ্ন করুন, উত্তর দিন, জ্ঞান শেয়ার করুন।",
};

const categories = [
  {
    title: "BNBC 2020",
    description: "বিল্ডিং কোড, ইলেকট্রিক্যাল ইনস্টলেশন, আর্থিং বিষয়ক আলোচনা",
    threads: 24,
    posts: 89,
    color: "bg-brand-blue",
  },
  {
    title: "NFPA 70E",
    description: "আর্ক ফ্ল্যাশ, PPE, লকআউট/ট্যাগআউট বিষয়ক আলোচনা",
    threads: 18,
    posts: 67,
    color: "bg-brand-gold",
  },
  {
    title: "RSC Fire Manual",
    description: "ফায়ার সেফটি, স্প্রিংকলার, ফায়ার অ্যালার্ম বিষয়ক আলোচনা",
    threads: 15,
    posts: 52,
    color: "bg-brand-red",
  },
  {
    title: "সাধারণ ইলেকট্রিক্যাল",
    description: "ওয়ারিং, মোটর, ট্রান্সফরমার, প্যানেল — সব বিষয়ে আলোচনা",
    threads: 42,
    posts: 156,
    color: "bg-brand-green",
  },
  {
    title: "ক্যারিয়ার ও চাকরি",
    description: "চাকরির খবর, ইন্টারভিউ টিপস, ক্যারিয়ার গাইডেন্স",
    threads: 31,
    posts: 98,
    color: "bg-brand-purple",
  },
  {
    title: "টুলস ও রিসোর্স",
    description: "OhmiclyLearn টুলস ব্যবহার, ফিডব্যাক, নতুন ফিচার রিকোয়েস্ট",
    threads: 12,
    posts: 45,
    color: "bg-brand-orange",
  },
];

const recentThreads = [
  {
    title: "BNBC 2020 অনুযায়ী আর্থিং রেজিস্ট্যান্স কত হওয়া উচিত?",
    author: "রাকিব উদ্দিন",
    category: "BNBC 2020",
    replies: 8,
    time: "২ ঘন্টা আগে",
  },
  {
    title: "আর্ক ফ্ল্যাশ PPE ক্যাটাগরি ২ এর জন্য কোন গ্লাভস লাগবে?",
    author: "তানভীর আহমেদ",
    category: "NFPA 70E",
    replies: 5,
    time: "৪ ঘন্টা আগে",
  },
  {
    title: "স্প্রিংকলার সিস্টেমের ওয়াটার প্রেশার কত হওয়া দরকার?",
    author: "মাহফুজা আক্তার",
    category: "RSC Fire",
    replies: 12,
    time: "৬ ঘন্টা আগে",
  },
  {
    title: "১০০ এইচপি মোটরের জন্য ক্যাবল সাইজ কত হবে?",
    author: "কামাল হোসেন",
    category: "সাধারণ ইলেকট্রিক্যাল",
    replies: 15,
    time: "৮ ঘন্টা আগে",
  },
];

export default function ForumPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">কমিউনিটি</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            ইলেকট্রিক্যাল ইঞ্জিনিয়ার ফোরাম
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            প্রশ্ন করুন, উত্তর দিন, এবং অন্য ইঞ্জিনিয়ারদের সাথে জ্ঞান শেয়ার করুন।
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-blue font-en">142</p>
            <p className="text-sm text-slate-500 font-bn">থ্রেড</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-green font-en">507</p>
            <p className="text-sm text-slate-500 font-bn">পোস্ট</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-gold font-en">89</p>
            <p className="text-sm text-slate-500 font-bn">সদস্য</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 font-bn mb-6">
            ক্যাটাগরি
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href="#"
                className="card p-5 group flex items-start gap-4"
              >
                <div className={`${cat.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-800 font-bn mb-1 group-hover:text-brand-blue transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-bn mb-2 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-bn">{cat.threads} থ্রেড</span>
                    <span className="font-bn">{cat.posts} পোস্ট</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Threads */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 font-bn flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-brand-blue" />
              সাম্প্রতিক আলোচনা
            </h2>
          </div>
          <div className="space-y-3">
            {recentThreads.map((thread, i) => (
              <Link
                key={i}
                href="#"
                className="card p-4 flex items-center justify-between gap-4 group"
              >
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-800 font-bn text-sm group-hover:text-brand-blue transition-colors truncate">
                    {thread.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span className="font-bn">{thread.author}</span>
                    <span className="font-bn">{thread.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {thread.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-500 shrink-0">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-en">{thread.replies}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
