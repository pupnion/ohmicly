"use client";

import { useEffect, useRef, useState } from "react";
import { Wrench, Download, BookOpen, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Wrench,
    number: 50,
    suffix: "+",
    label: "Tools and Templates",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    icon: Download,
    number: 10000,
    suffix: "+",
    label: "Downloads",
    color: "text-brand-green",
    bg: "bg-brand-green/10",
  },
  {
    icon: BookOpen,
    number: 3,
    suffix: "",
    prefix: "",
    label: "Standard Books (BNBC + NFPA + RSC)",
    color: "text-brand-gold",
    bg: "bg-brand-gold/10",
  },
  {
    icon: Building2,
    number: 4500,
    suffix: "+",
    label: "RMG Factories in Bangladesh",
    color: "text-brand-red",
    bg: "bg-brand-red/10",
  },
];

function AnimatedCounter({ target, suffix, prefix }: { target: number; suffix: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatted = new Intl.NumberFormat("en-US").format(count);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-brand-navy font-en">
      {prefix ?? ""}{formatted}{suffix}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center space-y-3">
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mx-auto", stat.bg)}>
                <stat.icon className={cn("h-7 w-7", stat.color)} />
              </div>
              <AnimatedCounter target={stat.number} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-brand-gray font-bn text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
