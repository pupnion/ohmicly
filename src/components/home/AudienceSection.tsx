import { Building2, GraduationCap, Award, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const audiences = [
  {
    icon: Building2,
    title: "RMG Factory Electrical Manager/Supervisor",
    desc: "Prepare for RSC, NIRAPON, ACCORD audits",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    icon: GraduationCap,
    title: "BSc and Diploma Electrical Engineers",
    desc: "BNBC 2020, NFPA, IEC standard reference tools",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
  },
  {
    icon: Award,
    title: "ABC License Candidates",
    desc: "MCQ practice, application guide, syllabus",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    icon: Wrench,
    title: "Factory Electricians and Supervisors",
    desc: "Technical guides in simple language",
    color: "text-brand-purple",
    bg: "bg-brand-purple/10",
  },
];

export default function AudienceSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-bn">
            Who is OhmiclyLearn for?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {audiences.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0", item.bg)}>
                <item.icon className={cn("h-6 w-6", item.color)} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-navy font-bn">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-brand-gray font-bn">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
