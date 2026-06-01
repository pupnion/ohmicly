import type { Metadata } from "next";
import { Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Electrical Engineering Articles | OhmiclyLearn",
  description:
    "Articles and guides on BNBC 2020, NFPA 70E, electrical safety. Read in English.",
};

const posts = [
  {
    title: "Earthing System Design Guide According to BNBC 2020",
    excerpt:
      "Which sections of BNBC 2020 must be followed when designing earthing systems for RMG factories in Bangladesh? Learn in detail.",
    date: "May 25, 2026",
    category: "BNBC 2020",
    color: "bg-brand-blue",
    slug: "bnbc-2020-earthing-design",
  },
  {
    title: "Arc Flash PPE Selection — NFPA 70E Guide",
    excerpt:
      "How to select the correct PPE when working in arc flash hazard areas? Complete guide according to NFPA 70E.",
    date: "May 20, 2026",
    category: "NFPA 70E",
    color: "bg-brand-gold",
    slug: "arc-flash-ppe-selection",
  },
  {
    title: "Fire Alarm System Installation Guide for RMG Factories",
    excerpt:
      "Step-by-step guide to installing fire alarm system according to RSC Fire Manual.",
    date: "May 15, 2026",
    category: "RSC Fire",
    color: "bg-brand-red",
    slug: "rmg-fire-alarm-installation",
  },
  {
    title: "Cable Sizing Calculation — Simple Method",
    excerpt:
      "From load calculation to cable sizing — learn the complete process in simple language.",
    date: "May 10, 2026",
    category: "Electrical",
    color: "bg-brand-green",
    slug: "cable-sizing-guide",
  },
  {
    title: "Lightning Protection System (LPS) — Complete Guide",
    excerpt:
      "Everything about LPS design, installation, and maintenance according to BNBC 2020.",
    date: "May 5, 2026",
    category: "BNBC 2020",
    color: "bg-brand-purple",
    slug: "lps-complete-guide",
  },
  {
    title: "Lockout/Tagout (LOTO) Procedure — NFPA 70E",
    excerpt:
      "Learn why LOTO procedure is critical for electrical safety and how to apply it.",
    date: "May 1, 2026",
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
          <span className="badge-bnbc mb-4 inline-block">Blog</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            Electrical Engineering Blog
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            Read articles on BNBC 2020, NFPA 70E, RSC Fire Manual, and general
            electrical engineering topics.
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
                Read More <ArrowRight className="h-4 w-4" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
