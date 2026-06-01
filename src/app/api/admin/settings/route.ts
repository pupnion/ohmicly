import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function getSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}

// GET all settings
export async function GET() {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("site_settings").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Convert array to object
  const settings: Record<string, unknown> = {};
  data.forEach((s) => {
    settings[s.key] = s.value;
  });

  return NextResponse.json(settings);
}

// PUT update settings
export async function PUT(request: NextRequest) {
  const supabase = getSupabase();
  const body = await request.json();

  // Upsert each setting
  const updates = Object.entries(body).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("site_settings")
    .upsert(updates, { onConflict: "key" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
