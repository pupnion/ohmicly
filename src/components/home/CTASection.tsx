import Link from "next/link";
import { Download, Shield } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-16 bg-brand-navy relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white font-bn">
          আজই শুরু করুন — সম্পূর্ণ বিনামূল্যে
        </h2>
        <p className="mt-4 text-white/70 font-bn text-lg">
          Registration ছাড়াই সব ফ্রি টুলস ব্যবহার করুন
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy font-semibold px-8 py-3.5 rounded-lg hover:bg-yellow-400 transition-colors font-bn"
          >
            <Download className="h-5 w-5" />
            ফ্রি টুলস ডাউনলোড করুন
          </Link>
          <Link
            href="/tools/rsc-checklist"
            className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/5 transition-colors font-bn"
          >
            <Shield className="h-5 w-5" />
            RSC Checklist দেখুন
          </Link>
        </div>
      </div>
    </section>
  );
}
