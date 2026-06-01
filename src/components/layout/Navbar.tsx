"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Zap, ChevronDown, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import UserMenu from "@/components/auth/UserMenu";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "RSC Checklist", href: "/tools/rsc-checklist" },
      { label: "IR Test Report", href: "/tools/ir-test-report" },
      { label: "LPS Risk Index", href: "/tools/lps-risk-index" },
      { label: "Wire Color Code", href: "/tools/wire-color-code" },
      { label: "Arc Flash PPE", href: "/tools/arc-flash-ppe" },
    ],
  },
  {
    label: "Standards",
    href: "/standards",
    children: [
      { label: "BNBC 2020", href: "/standards/bnbc-2020" },
      { label: "NFPA 70E", href: "/standards/nfpa-70e" },
      { label: "RSC Fire Manual", href: "/standards/rsc-fire" },
    ],
  },
  { label: "MCQ", href: "/mcq" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Forum", href: "/forum" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 bg-brand-navy/95 backdrop-blur supports-[backdrop-filter]:bg-brand-navy/80 border-b border-white/10 transition-shadow duration-300",
          scrolled && "shadow-lg shadow-brand-navy/20"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-brand-gold rounded-lg p-1.5">
                <Zap className="h-5 w-5 text-brand-navy" />
              </div>
              <span className="text-white font-bold text-xl font-bn">
                OhmiclyLearn
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() =>
                    link.children && handleDropdownEnter(link.label)
                  }
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 text-white/70 hover:text-white px-3 py-2 rounded-md text-sm font-medium font-bn transition-colors",
                      isActive(link.href) &&
                        "text-white bg-white/10"
                    )}
                  >
                    {link.label}
                    {link.children && (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && openDropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-4 py-2.5 text-sm font-bn transition-colors",
                            isActive(child.href)
                              ? "text-brand-blue bg-brand-blue/5 font-semibold"
                              : "text-slate-700 hover:text-brand-blue hover:bg-slate-50"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Auth + CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <UserMenu />

              <Link
                href="/tools"
                className="hidden md:inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold text-sm px-4 py-2 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
              >
                <Wrench className="h-4 w-4" />
                Free Tools
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white/70 hover:text-white p-2"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden transition-all duration-200 overflow-hidden",
            isOpen ? "max-h-[500px]" : "max-h-0"
          )}
        >
          <div className="px-4 pb-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => !link.children && setIsOpen(false)}
                  className={cn(
                    "flex items-center justify-between text-white/70 hover:text-white hover:bg-white/5 px-3 py-2.5 rounded-md text-sm font-medium font-bn transition-colors",
                    isActive(link.href) && "text-white bg-white/10"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenDropdown(
                          openDropdown === link.label ? null : link.label
                        );
                      }}
                      className="p-1"
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          openDropdown === link.label && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </Link>

                {/* Mobile Sub-items */}
                {link.children && openDropdown === link.label && (
                  <div className="pl-4 space-y-1 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm font-bn transition-colors",
                          isActive(child.href)
                            ? "text-brand-gold bg-white/5 font-semibold"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth + CTA */}
            <div className="md:hidden pt-2">
              <UserMenu />
            </div>

            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 bg-brand-gold text-brand-navy font-semibold text-sm px-4 py-2.5 rounded-lg mt-3 font-bn"
            >
              <Wrench className="h-4 w-4" />
              Free Tools
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
