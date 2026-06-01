import type { Metadata } from "next";
import { Zap, Target, Users, Heart, Award, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "About — OhmiclyLearn",
  description:
    "Learn about OhmiclyLearn — free tools and resources platform for electrical engineers in Bangladesh RMG factories.",
};

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "Create free tools and resources based on BNBC 2020, NFPA 70E, RSC Fire Manual for electrical engineers in Bangladesh RMG factories.",
  },
  {
    icon: Heart,
    title: "Vision",
    description:
      "Deliver correct standard references to every electrical engineer — so no factory suffers an electrical accident.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "Every tool and content is created following international standards. We never compromise on quality.",
  },
];

const stats = [
  { value: "5+", label: "Free Tools" },
  { value: "3", label: "Standards Covered" },
  { value: "100%", label: "Free" },
  { value: "English", label: "Language" },
];

export default function AboutPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="badge-bnbc mb-4 inline-block">About Us</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            What is OhmiclyLearn?
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            A completely free tools and resources platform built for electrical
            engineers in Bangladesh RMG factories.
          </p>
        </div>

        {/* Story */}
        <div className="card p-8 mb-12 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-gold rounded-lg p-2">
              <Zap className="h-6 w-6 text-brand-navy" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 font-bn">
              Our Story
            </h2>
          </div>
          <p className="text-slate-600 font-bn leading-relaxed mb-4">
            Thousands of electrical engineers work in Bangladesh&apos;s ready-made
            garments industry. They work daily with standards like BNBC 2020,
            NFPA 70E, and RSC Fire Manual. But finding the right tools and
            references is not always easy.
          </p>
          <p className="text-slate-600 font-bn leading-relaxed">
            OhmiclyLearn is the solution to that problem. We have created
            standard references, free tools, and MCQ question banks in simple
            language — so every engineer can make quick and correct decisions.
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
