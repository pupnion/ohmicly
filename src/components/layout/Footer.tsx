"use client";

import Link from "next/link";
import { Zap, Mail, Phone, MapPin, SendHorizontal } from "lucide-react";

const footerLinks = {
  tools: [
    { label: "RSC Checklist", href: "/tools/rsc-checklist" },
    { label: "IR Test Report", href: "/tools/ir-test-report" },
    { label: "LPS Risk Index", href: "/tools/lps-risk-index" },
    { label: "Wire Color Code", href: "/tools/wire-color-code" },
    { label: "Arc Flash PPE", href: "/tools/arc-flash-ppe" },
  ],
  resources: [
    { label: "BNBC 2020 Guide", href: "/standards/bnbc-2020" },
    { label: "NFPA 70E Guide", href: "/standards/nfpa-70e" },
    { label: "RSC Fire Manual", href: "/standards/rsc-fire" },
    { label: "MCQ Bank", href: "/mcq" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
    { label: "Forum", href: "/forum" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const socials = [
  {
    href: "https://facebook.com/ohmiclylearn",
    label: "Facebook",
    svg: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: "https://youtube.com/@ohmiclylearn",
    label: "YouTube",
    svg: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/ohmiclylearn",
    label: "LinkedIn",
    svg: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const standards = [
  { name: "BNBC 2020", color: "bg-brand-blue" },
  { name: "NFPA 70E", color: "bg-brand-gold" },
  { name: "RSC Fire", color: "bg-brand-red" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">
      {/* Standards Bar */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-white/50 text-sm font-bn mr-2">
              Standards we cover:
            </span>
            {standards.map((s) => (
              <span
                key={s.name}
                className={`${s.color} text-white text-xs font-semibold px-3 py-1.5 rounded-full font-en`}
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <div className="bg-brand-gold rounded-lg p-1.5">
                <Zap className="h-5 w-5 text-brand-navy" />
              </div>
              <span className="text-white font-bold text-xl font-bn">
                OhmiclyLearn
              </span>
            </div>
            <p className="text-white/50 text-sm font-bn leading-relaxed">
              Free tools, templates, and standard references for RMG factory
              electrical engineers in Bangladesh — completely free.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href="mailto:hello@ohmiclylearn.com"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                <span>hello@ohmiclylearn.com</span>
              </a>
              <a
                href="tel:+8801XXXXXXXXX"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span className="font-bn">+880 1XXX-XXXXXX</span>
              </a>
              <div className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="font-bn">Gazipur, Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-bn">
              Popular Tools
            </h4>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-bn">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-bn">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-white font-bold text-lg font-bn mb-2">
              Subscribe to Newsletter
            </h3>
            <p className="text-white/50 text-sm font-bn mb-4">
              Get new tools, articles, and standard updates directly in your
              email.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 focus:border-brand-gold/50 text-sm font-bn"
              />
              <button
                type="submit"
                className="bg-brand-gold text-brand-navy font-semibold px-4 py-2.5 rounded-lg hover:bg-yellow-400 transition-colors flex items-center gap-2 font-bn text-sm shrink-0"
              >
                <SendHorizontal className="h-4 w-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm font-bn">
            &copy; {new Date().getFullYear()} OhmiclyLearn. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white/70 transition-colors font-bn"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-white/70 transition-colors font-bn"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
