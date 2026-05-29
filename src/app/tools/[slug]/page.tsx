import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolBySlug, getRelatedTools } from "@/lib/tools-data";
import ToolDetail from "@/components/tools/ToolDetail";

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "টুল পাওয়া যায়নি — OhmiclyLearn" };

  return {
    title: `${tool.title} — ${tool.title_en} | OhmiclyLearn`,
    description: tool.desc,
    keywords: [tool.standard, tool.title_en, "BNBC 2020", "electrical tool", "OhmiclyLearn"],
  };
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title_en,
    applicationCategory: "EngineeringSoftware",
    operatingSystem: "Windows, macOS",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BDT" },
    description: tool.desc,
    url: `https://ohmiclylearn.com/tools/${tool.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolDetail tool={tool} related={related} />
    </>
  );
}
