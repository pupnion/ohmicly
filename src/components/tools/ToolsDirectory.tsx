"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Download, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { tools, iconMap, colorMap } from "@/lib/tools-data";

const categories = ["All", "Calculator", "Checklist", "Template", "Reference"] as const;

export default function ToolsDirectory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = tools.filter((tool) => {
    const matchesSearch =
      search === "" ||
      tool.title.toLowerCase().includes(search.toLowerCase()) ||
      tool.title_en.toLowerCase().includes(search.toLowerCase()) ||
      tool.desc.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || tool.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-navy font-bn">
            All Tools and Templates
          </h1>
          <p className="mt-3 text-brand-gray font-bn text-lg">
            BNBC 2020, NFPA 70E, RSC — all standard references in one place
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gray" />
            <input
              type="text"
              placeholder="Search tools... (e.g. RSC, IR Test, Cable)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none text-sm font-bn transition-colors"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium font-bn transition-colors",
                activeCategory === cat
                  ? "bg-brand-navy text-white"
                  : "bg-gray-100 text-brand-gray hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-brand-gray font-bn mb-6">
          {filtered.length} tools found
        </p>

        {/* Tools Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => {
              const Icon = iconMap[tool.icon];
              const colors = colorMap[tool.color];

              return (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg hover:border-brand-navy/10 transition-all duration-200 flex flex-col"
                >
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colors.bg)}>
                      <Icon className={cn("h-6 w-6", colors.text)} />
                    </div>
                    <div className="flex gap-2">
                      {tool.isPopular && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-brand-gold/10 text-brand-gold font-bn">
                          <Star className="h-3 w-3" />
                          Most Popular
                        </span>
                      )}
                      {tool.isFree && (
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-brand-green/10 text-brand-green font-bn">
                          Free
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-brand-navy font-bn group-hover:text-brand-blue transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-brand-gray mt-0.5 font-en">{tool.title_en}</p>

                  {/* Description */}
                  <p className="mt-3 text-sm text-brand-gray font-bn leading-relaxed flex-1">
                    {tool.desc}
                  </p>

                  {/* Standard Badge */}
                  <div className="mt-4">
                    <span className={cn("inline-block text-xs px-3 py-1 rounded-full border font-en", colors.badge)}>
                      {tool.standard}
                    </span>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-brand-gray font-bn">
                      {new Intl.NumberFormat("en-US").format(tool.downloads)} downloads
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue font-bn group-hover:gap-2.5 transition-all">
                      <Download className="h-4 w-4" />
                      Download
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-brand-gray/40 mx-auto mb-4" />
            <p className="text-brand-gray font-bn text-lg">
              No tools found
            </p>
            <p className="text-brand-gray/60 font-bn text-sm mt-1">
              Try a different keyword
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
