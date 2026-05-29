import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "RSC audit-এ আগে অনেক ভয় লাগত। OhmiclyLearn-এর checklist download করে prepare করার পর এবার সব ৪৭টি clause PASS করেছি।",
    name: "রহিম উদ্দিন",
    role: "Electrical Manager, Gazipur",
  },
  {
    quote:
      "IR test report বানাতে আগে ২ ঘণ্টা লাগত। এখন ১০ মিনিটে হয়ে যায়। Kt correction automatic।",
    name: "সাইফুল ইসলাম",
    role: "Electrical Engineer, Ashulia",
  },
  {
    quote:
      "ABC License পরীক্ষার জন্য MCQ bank অনেক কাজে লেগেছে। বাংলায় explanation পাওয়া কোথাও ছিল না।",
    name: "নাজমুল হাসান",
    role: "ABC License Holder, Chittagong",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy font-bn">
            ইঞ্জিনিয়ারদের মতামত
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-brand-lightgray rounded-xl p-6 relative"
            >
              <Quote className="h-8 w-8 text-brand-gold/30 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    className="h-4 w-4 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-brand-navy font-bn text-sm leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="font-semibold text-brand-navy font-bn text-sm">
                  {t.name}
                </p>
                <p className="text-brand-gray text-xs font-bn mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
