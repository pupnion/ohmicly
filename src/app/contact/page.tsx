import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "যোগাযোগ — OhmiclyLearn",
  description:
    "OhmiclyLearn টিমের সাথে যোগাযোগ করুন। প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের মেইল করুন।",
};

const contactMethods = [
  {
    icon: Mail,
    title: "ইমেইল",
    value: "hello@ohmiclylearn.com",
    description: "যেকোনো প্রশ্ন বা পরামর্শের জন্য ইমেইল করুন",
    color: "bg-brand-blue",
  },
  {
    icon: MessageSquare,
    title: "ফেসবুক পেজ",
    value: "fb.com/ohmiclylearn",
    description: "আমাদের ফেসবুক পেজে মেসেজ করুন",
    color: "bg-brand-gold",
  },
  {
    icon: MapPin,
    title: "লোকেশন",
    value: "ঢাকা, বাংলাদেশ",
    description: "RMG ইন্ডাস্ট্রি হাব — গাজীপুর, নারায়ণগঞ্জ",
    color: "bg-brand-green",
  },
  {
    icon: Clock,
    title: "রেসপন্স টাইম",
    value: "২৪-৪৮ ঘন্টা",
    description: "সাধারণত ১-২ কর্মদিবসের মধ্যে উত্তর দেওয়া হয়",
    color: "bg-brand-purple",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">যোগাযোগ</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            কোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।
            আমরা শুনতে আগ্রহী!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method) => (
            <div key={method.title} className="card p-6 flex items-start gap-4">
              <div className={`${method.color} w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}>
                <method.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 font-bn mb-1">
                  {method.title}
                </h3>
                <p className="text-brand-blue font-semibold font-bn mb-1">
                  {method.value}
                </p>
                <p className="text-sm text-slate-500 font-bn">
                  {method.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="card p-8 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 font-bn mb-6">
            মেসেজ পাঠান
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                  নাম
                </label>
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                  ইমেইল
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                বিষয়
              </label>
              <input
                type="text"
                placeholder="বিষয় লিখুন"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                মেসেজ
              </label>
              <textarea
                rows={5}
                placeholder="আপনার মেসেজ লিখুন..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              মেসেজ পাঠান
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
