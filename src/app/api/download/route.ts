import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { toolSlug } = body;

    if (!toolSlug) {
      return NextResponse.json(
        { success: false, error: "toolSlug is required" },
        { status: 400 }
      );
    }

    try {
      const supabase = createClient();

      // Get tool from database
      const { data: tool } = await supabase
        .from("tools")
        .select("file_url, downloads")
        .eq("slug", toolSlug)
        .single();

      // Increment download count
      if (tool) {
        await supabase
          .from("tools")
          .update({ downloads: (tool.downloads || 0) + 1 })
          .eq("slug", toolSlug);

        // If tool has a file_url (Supabase Storage), use it
        if (tool.file_url) {
          return NextResponse.json({
            success: true,
            downloadUrl: tool.file_url,
          });
        }
      }
    } catch {
      // Supabase not configured, fall through to static file
    }

    // Fallback to static file
    return NextResponse.json({
      success: true,
      downloadUrl: `/downloads/${toolSlug}.xlsx`,
    });
  } catch (err) {
    console.error("Download API error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
