import type { Metadata } from "next";
import FaqPageContent from "./FaqPageContent";

export const metadata: Metadata = {
  title: "FAQ — OhmiclyLearn",
  description:
    "Frequently asked questions about electrical engineering tools, BNBC 2020, NFPA 70E, RSC Fire Manual, and compliance for RMG factories in Bangladesh.",
  openGraph: {
    title: "FAQ — OhmiclyLearn",
    description:
      "Everything you need to know about electrical standards, tools, and compliance for RMG factories.",
  },
};

export default function FaqPage() {
  return <FaqPageContent />;
}
