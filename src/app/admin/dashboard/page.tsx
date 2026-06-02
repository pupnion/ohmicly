import { createAdminClient } from "@/lib/supabase/admin";
import { Wrench, FileText, Download, Star, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const supabase = createAdminClient();

    const [toolsRes, blogRes, faqRes] = await Promise.all([
      supabase.from("tools").select("id"),
      supabase.from("posts").select("id, is_published, title, created_at").order("created_at", { ascending: false }),
      supabase.from("faqs").select("id"),
    ]);

    let testimonials: { id: string }[] = [];
    let downloads: { id: string; tool_slug: string; downloaded_at: string }[] = [];

    try {
      const tRes = await supabase.from("testimonials").select("id");
      testimonials = tRes.data || [];
    } catch {}

    try {
      const dRes = await supabase.from("downloads").select("id, tool_slug, downloaded_at").order("downloaded_at", { ascending: false });
      downloads = dRes.data || [];
    } catch {}

    const tools = toolsRes.data || [];
    const blogs = blogRes.data || [];
    const faqs = faqRes.data || [];

    const publishedBlogs = blogs.filter((b) => b.is_published).length;
    const unpublishedBlogs = blogs.filter((b) => !b.is_published).length;

    return {
      toolCount: tools.length,
      popularToolCount: tools.length,
      blogCount: blogs.length,
      publishedBlogs,
      unpublishedBlogs,
      faqCount: faqs.length,
      testimonialCount: testimonials.length,
      downloadCount: downloads.length,
      recentBlogs: blogs.slice(0, 5),
      recentDownloads: downloads.slice(0, 5),
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      toolCount: 0,
      popularToolCount: 0,
      blogCount: 0,
      publishedBlogs: 0,
      unpublishedBlogs: 0,
      faqCount: 0,
      testimonialCount: 0,
      downloadCount: 0,
      recentBlogs: [],
      recentDownloads: [],
    };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "মোট Tools", value: stats.toolCount, icon: Wrench, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Published Tools", value: stats.popularToolCount, icon: Star, color: "text-green-600", bg: "bg-green-100" },
    { label: "মোট Blog Posts", value: stats.blogCount, icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
    { label: "মোট Downloads", value: stats.downloadCount, icon: Download, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "মোট Testimonials", value: stats.testimonialCount, icon: Star, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Pending Review", value: stats.unpublishedBlogs, icon: Clock, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 font-bn">Dashboard</h1>
        <p className="text-slate-500 font-bn text-sm mt-1">Overview of your site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bg}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-brand-navy font-en">{card.value}</p>
            <p className="text-sm text-slate-500 font-bn mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 font-bn mb-4">Recent Downloads</h2>
          {stats.recentDownloads.length > 0 ? (
            <div className="space-y-3">
              {stats.recentDownloads.map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-700 font-en">{d.tool_slug}</span>
                  <span className="text-xs text-slate-400 font-en">
                    {new Date(d.downloaded_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-bn">No downloads yet</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 font-bn mb-4">Recent Blog Posts</h2>
          {stats.recentBlogs.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBlogs.map((post) => (
                <div key={post.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <span className="text-sm text-slate-700 font-bn">{post.title}</span>
                    {!post.is_published && (
                      <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bn">Draft</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-en">
                    {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 font-bn">No blog posts yet</p>
          )}
        </div>
      </div>
    </div>
  );
     }
