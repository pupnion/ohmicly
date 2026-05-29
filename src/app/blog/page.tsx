import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ব্লগ — ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং আর্টিকেল | OhmiclyLearn",
  description:
    "BNBC 2020, NFPA 70E, ইলেকট্রিক্যাল সেফটি বিষয়ক আর্টিকেল ও গাইড। বাংলায় পড়ুন।",
};

const posts = [
  {
    title: "BNBC 2020 অনুযায়ী আর্থিং সিস্টেম ডিজাইন গাইড",
    excerpt:
      "বাংলাদেশের RMG ফ্যাক্টরিতে আর্থিং সিস্টেম ডিজাইনের সময় BNBC 2020 এর কোন সেকশনগুলো মেনে চলতে হয়? বিস্তারিত জানুন।",
    date: "২৫ মে, ২০২৬",
    category: "BNBC 2020",
    color: "bg-brand-blue",
    slug: "bnbc-2020-earthing-design",
  },
  {
    title: "আর্ক ফ্ল্যাশ PPE সিলেকশন — NFPA 70E গাইড",
    excerpt:
      "আর্ক ফ্ল্যাশ হাজার্ড এরিয়ায় কাজ করার সময় সঠিক PPE কীভাবে সিলেক্ট করবেন? NFPA 70E অনুযায়ী পূর্ণ গাইড।",
    date: "২০ মে, ২০২৬",
    category: "NFPA 70E",
    color: "bg-brand-gold",
    slug: "arc-flash-ppe-selection",
  },
  {
    title: "RMG ফ্যাক্টরিতে ফায়ার অ্যালার্ম সিস্টেম ইনস্টলেশন গাইড",
    excerpt:
      "RSC Fire Manual অনুযায়ী ফায়ার অ্যালার্ম সিস্টেম ইনস্টল করার ধাপে ধাপে গাইড।",
    date: "১৫ মে, ২০২৬",
    category: "RSC Fire",
    color: "bg-brand-red",
    slug: "rmg-fire-alarm-installation",
  },
  {
    title: "ক্যাবল সাইজিং ক্যালকুলেশন — সহজ পদ্ধতি",
    excerpt:
      "লোড ক্যালকুলেশন থেকে ক্যাবল সাইজ নির্ধারণ — সম্পূর্ণ প্রসেস বাংলায় জানুন।",
    date: "১০ মে, ২০২৬",
    category: "ইলেকট্রিক্যাল",
    color: "bg-brand-green",
    slug: "cable-sizing-guide",
  },
  {
    title: "লাইটনিং প্রোটেকশন সিস্টেম (LPS) — সম্পূর্ণ গাইড",
    excerpt:
      "BNBC 2020 অনুযায়ী LPS ডিজাইন, ইনস্টলেশন এবং মেইনটেন্যান্স সম্পর্কে সব কিছু জানুন।",
    date: "৫ মে, ২০২৬",
    category: "BNBC 2020",
    color: "bg-brand-purple",
    slug: "lps-complete-guide",
  },
  {
    title: "লকআউট/ট্যাগআউट (LOTO) প্রসিডিউর — NFPA 70E",
    excerpt:
      "ইলেকট্রিক্যাল সেফটির জন্য LOTO প্রসিডিউর কেন জরুরি এবং কীভাবে প্রয়োগ করবেন তা জানুন।",
    date: "১ মে, ২০২৬",
    category: "NFPA 70E",
    color: "bg-brand-orange",
    slug: "loto-procedure-nfpa-70e",
  },
];

export default function BlogPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">ব্লগ</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং ব্লগ
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            BNBC 2020, NFPA 70E, RSC Fire Manual এবং সাধারণ ইলেকট্রিক্যাল
            ইঞ্জিনিয়ারিং বিষয়ক আর্টিকেল বাংলায় পড়ুন।
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="card p-6 group cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`${post.color} text-white text-xs px-2.5 py-1 rounded-full font-bn`}
                >
                  {post.category}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.date}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-800 font-bn mb-2 group-hover:text-brand-blue transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-slate-600 font-bn mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-1 text-brand-blue text-sm font-semibold font-bn group-hover:gap-2 transition-all">
                পড়ুন <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
