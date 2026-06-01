import { tools as staticTools, type Tool } from "@/lib/tools-data";

// Get tools from Supabase with fallback to static data
export async function getTools(): Promise<Tool[]> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = createClient();
    const { data, error } = await supabase
      .from("tools")
      .select("*")
      .order("downloads", { ascending: false });

    if (error || !data || data.length === 0) {
      return staticTools;
    }

    // Map DB data to Tool type
    return data.map((t) => ({
      slug: t.slug,
      title: t.title,
      title_en: t.title_en,
      desc: t.desc,
      desc_long: t.desc_long,
      standard: t.standard,
      standard_badges: t.standard_badges || [],
      type: t.type,
      category: t.category,
      downloads: t.downloads,
      icon: t.icon,
      color: t.color,
      isFree: t.is_free,
      isPopular: t.is_popular,
      howToUse: t.how_to_use || [],
      audience: t.audience || [],
      faqs: t.faqs || [],
      relatedSlugs: t.related_slugs || [],
    }));
  } catch {
    return staticTools;
  }
}

// Get single tool by slug
export async function getToolBySlugFromDB(
  slug: string
): Promise<Tool | undefined> {
  const allTools = await getTools();
  return allTools.find((t) => t.slug === slug);
}
