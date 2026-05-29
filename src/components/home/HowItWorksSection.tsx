import { Search, Download, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "১",
    icon: Search,
    title: "টুলটি খুঁজুন",
    desc: "Search থেকে বা category থেকে tool খুঁজুন।",
    color: "bg-brand-blue",
  },
  {
    number: "২",
    icon: Download,
    title: "ডাউনলোড করুন",
    desc: "একটা click-এ Excel বা PDF download।",
    color: "bg-brand-green",
  },
  {
    number: "৩",
    icon: CheckCircle,
    title: "Audit-এ ব্যবহার করুন",
    desc: "RSC/NIRAPON auditor-কে দেখান।",
    color: "bg-brand-gold",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-bn">
            কিভাবে কাজ করে?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200" />
              )}

              <div className="relative z-10 space-y-4">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-navy text-white text-sm font-bold font-bn mb-2">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>

                {/* Text */}
                <h3 className="text-lg font-semibold text-brand-navy font-bn">
                  {step.title}
                </h3>
                <p className="text-brand-gray font-bn text-sm">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
