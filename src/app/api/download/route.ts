import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { toolSlug, userId } = body;

    if (!toolSlug) {
      return NextResponse.json(
        { success: false, error: "toolSlug is required" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Insert download record
    const { error } = await supabase.from("downloads").insert({
      tool_slug: toolSlug,
      user_id: userId || null,
      downloaded_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to record download" },
        { status: 500 }
      );
    }

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
