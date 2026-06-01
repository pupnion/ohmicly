import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import FeaturedToolsSection from "@/components/home/FeaturedToolsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AudienceSection from "@/components/home/AudienceSection";
import StandardsSection from "@/components/home/StandardsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/home/FaqSection";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedToolsSection />
      <HowItWorksSection />
      <AudienceSection />
      <StandardsSection />
      <TestimonialsSection />
      <FaqSection />
      <CTASection />
    </>
  );
}
