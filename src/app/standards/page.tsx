import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, FileText, Flame, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Electrical Standards — BNBC 2020, NFPA 70E, RSC | OhmiclyLearn",
  description:
    "BNBC 2020, NFPA 70E, RSC Fire Manual — complete guide for electrical engineers in Bangladesh.",
};

const standards = [
  {
    title: "BNBC 2020",
    subtitle: "Bangladesh National Building Code",
    description:
      "Mandatory standard for electrical installation, earthing, lightning protection system (LPS), and fire safety.",
    icon: BookOpen,
    href: "/standards/bnbc-2020",
    color: "bg-brand-blue",
    topics: [
      "Electrical Installation Code",
      "Earthing System Design",
      "LPS (Lightning Protection System)",
      "Fire Alarm System",
      "Emergency Lighting",
    ],
  },
  {
    title: "NFPA 70E",
    subtitle: "Workplace Electrical Safety Standard",
    description:
      "International standard for arc flash hazard, PPE selection, and electrical safe work practices.",
    icon: Shield,
    href: "/standards/nfpa-70e",
    color: "bg-brand-gold",
    topics: [
      "Arc Flash Hazard Analysis",
      "PPE Category Selection",
      "Lockout/Tagout (LOTO)",
      "Electrical Safe Work Practices",
      "Boundary Distance",
    ],
  },
  {
    title: "RSC Fire Manual",
    subtitle: "Ready Made Garments Fire Safety Manual",
    description:
      "Fire safety compliance, fire detection, sprinkler system, and evacuation plan for RMG factories.",
    icon: Flame,
    href: "/standards/rsc-fire",
    color: "bg-brand-red",
    topics: [
      "Fire Detection System",
      "Sprinkler System Design",
      "Evacuation Plan",
      "Fire Extinguisher Placement",
      "Electrical Fire Prevention",
    ],
  },
];

export default function StandardsPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">Standard Reference</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            Electrical Standards Guide
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            BNBC 2020, NFPA 70E, and RSC Fire Manual — complete reference guide
            for RMG factory engineers in Bangladesh.
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
                Read More <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
