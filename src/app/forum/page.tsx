import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Users, Clock, ArrowRight, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Forum — Electrical Engineer Community | OhmiclyLearn",
  description:
    "Community forum for electrical engineers. Ask questions, share answers, and share knowledge.",
};

const categories = [
  {
    title: "BNBC 2020",
    description: "Discussion on building code, electrical installation, and earthing",
    threads: 24,
    posts: 89,
    color: "bg-brand-blue",
  },
  {
    title: "NFPA 70E",
    description: "Discussion on arc flash, PPE, and lockout/tagout",
    threads: 18,
    posts: 67,
    color: "bg-brand-gold",
  },
  {
    title: "RSC Fire Manual",
    description: "Discussion on fire safety, sprinkler, and fire alarm systems",
    threads: 15,
    posts: 52,
    color: "bg-brand-red",
  },
  {
    title: "General Electrical",
    description: "Discussion on wiring, motor, transformer, panel — all topics",
    threads: 42,
    posts: 156,
    color: "bg-brand-green",
  },
  {
    title: "Career and Jobs",
    description: "Job news, interview tips, career guidance",
    threads: 31,
    posts: 98,
    color: "bg-brand-purple",
  },
  {
    title: "Tools and Resources",
    description: "OhmiclyLearn tools usage, feedback, new feature requests",
    threads: 12,
    posts: 45,
    color: "bg-brand-orange",
  },
];

const recentThreads = [
  {
    title: "What should be the earthing resistance according to BNBC 2020?",
    author: "Rakib Uddin",
    category: "BNBC 2020",
    replies: 8,
    time: "2 hours ago",
  },
  {
    title: "Which gloves are needed for Arc Flash PPE Category 2?",
    author: "Tanvir Ahmed",
    category: "NFPA 70E",
    replies: 5,
    time: "4 hours ago",
  },
  {
    title: "What water pressure is needed for sprinkler system?",
    author: "Mahfuza Akter",
    category: "RSC Fire",
    replies: 12,
    time: "6 hours ago",
  },
  {
    title: "What cable size for 100 HP motor?",
    author: "Kamal Hossain",
    category: "General Electrical",
    replies: 15,
    time: "8 hours ago",
  },
];

export default function ForumPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">Community</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            Electrical Engineer Forum
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            Ask questions, share answers, and exchange knowledge with other engineers.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-blue font-en">142</p>
            <p className="text-sm text-slate-500 font-bn">Threads</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-green font-en">507</p>
            <p className="text-sm text-slate-500 font-bn">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-brand-gold font-en">89</p>
            <p className="text-sm text-slate-500 font-bn">Members</p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 font-bn mb-6">
            Categories
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
                    <span className="font-bn">{cat.threads} threads</span>
                    <span className="font-bn">{cat.posts} posts</span>
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
              Recent Discussions
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
