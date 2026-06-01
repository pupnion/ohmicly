import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — OhmiclyLearn",
  description:
    "Contact the OhmiclyLearn team. Email us for questions, suggestions, or collaboration.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@ohmiclylearn.com",
    description: "Email us for any question or suggestion",
    color: "bg-brand-blue",
  },
  {
    icon: MessageSquare,
    title: "Facebook Page",
    value: "fb.com/ohmiclylearn",
    description: "Send us a message on our Facebook page",
    color: "bg-brand-gold",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    description: "RMG Industry Hub — Gazipur, Narayanganj",
    color: "bg-brand-green",
  },
  {
    icon: Clock,
    title: "Response Time",
    value: "24-48 hours",
    description: "Usually replied within 1-2 business days",
    color: "bg-brand-purple",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="badge-bnbc mb-4 inline-block">Contact</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 font-bn mb-4">
            Contact Us
          </h1>
          <p className="text-slate-600 font-bn max-w-2xl mx-auto">
            Contact us for any question, suggestion, or collaboration. We would
            love to hear from you!
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
            Send a Message
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                  Email
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
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter subject"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 font-bn mb-1">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Write your message..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue font-bn text-sm resize-none"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
