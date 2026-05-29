import type { Metadata } from "next";
import { Zap, Target, Users, Heart, Award, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "সম্পর্কে — OhmiclyLearn",
  description:
    "OhmiclyLearn সম্পর্কে জানুন — বাংলাদেশের RMG ফ্যাক্টরি ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের জন্য ফ্রি টুলস ও রিসোর্স প্ল্যাটফর্ম।",
};

const values = [
  {
    icon: Target,
    title: "মিশন",
    description:
      "বাংলাদেশের RMG ফ্যাক্টরির ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের জন্য BNBC 2020, NFPA 70E, RSC Fire Manual ভিত্তিক ফ্রি টুলস ও রিসোর্স তৈরি করা।",
  },
  {
    icon: Heart,
    title: "ভিশন",
    description:
      "প্রতিটি ইলেকট্রিক্যাল ইঞ্জিনিয়ারের হাতে সঠিক স্ট্যান্ডার্ড রেফারেন্স পৌঁছে দেওয়া — যাতে কোনো ফ্যাক্টরিতে ইলেকট্রিক্যাল দুর্ঘটনা না ঘটে।",
  },
  {
    icon: Award,
    title: "মান",
    description:
      "প্রতিটি টুল ও কন্টেন্ট আন্তর্জাতিক স্ট্যান্ডার্ড অনুসরণ করে তৈরি করা হয়। আমরা কোয়ালিটির সাথে কোনো আপস করি না।",
  },
];

const stats = [
  { value: "৫+", label: "ফ্রি টুলস" },
  { value: "৩", label: "স্ট্যান্ডার্ড কভার" },
  { value: "১০০%", label: "বিনামূল্যে" },
  { value: "বাংলা", label: "ভাষায়" },
];

export default function AboutPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-bnbc mb-4 inline-block">আমাদের সম্পর্কে</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            OhmiclyLearn কী?
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            বাংলাদেশের RMG ফ্যাক্টরির ইলেকট্রিক্যাল ইঞ্জিনিয়ারদের জন্য তৈরি
            সম্পূর্ণ বিনামূল্যের টুলস ও রিসোর্স প্ল্যাটফর্ম।
          </p>
        </div>

        {/* Story */}
        <div className="card p-8 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-gold rounded-lg p-2">
              <Zap className="h-6 w-6 text-brand-navy" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 font-bn">
              আমাদের গল্প
            </h2>
          </div>
          <p className="text-slate-600 font-bn leading-relaxed mb-4">
            বাংলাদেশের রেডিমেড গার্মেন্টস ইন্ডাস্ট্রিতে হাজার হাজার
            ইলেকট্রিক্যাল ইঞ্জিনিয়ার কাজ করেন। তারা প্রতিদিন BNBC 2020, NFPA
            70E, RSC Fire Manual — এই স্ট্যান্ডার্ডগুলোর সাথে কাজ করেন। কিন্তু
            সঠিক টুলস ও রেফারেন্স খুঁজে পাওয়া সবসময় সহজ হয় না।
          </p>
          <p className="text-slate-600 font-bn leading-relaxed">
            OhmiclyLearn ঠিক সেই সমস্যার সমাধান। আমরা বাংলায় সহজ ভাষায়
            স্ট্যান্ডার্ড রেফারেন্স, ফ্রি টুলস এবং MCQ প্রশ্নব্যাংক তৈরি
            করেছি — যাতে প্রতিটি ইঞ্জিনিয়ার দ্রুত এবং সঠিক সিদ্ধান্ত নিতে
            পারেন।
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <div className="bg-brand-blue/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-7 w-7 text-brand-blue" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 font-bn mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm font-bn">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-brand-navy rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-brand-gold font-bn">
                  {stat.value}
                </p>
                <p className="text-white/70 text-sm font-bn">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
