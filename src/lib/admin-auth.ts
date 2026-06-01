import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";

interface AdminAuthResult {
  isAdmin: boolean;
  user: User | null;
}

export async function checkAdminAuth(): Promise<AdminAuthResult> {
  try {
    const cookieStore = cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return { isAdmin: false, user: null };
    }

    const supabase = createServerClient(url, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isAdmin: false, user: null };
    }

    const { data: adminData } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    return {
      isAdmin: !!adminData,
      user: adminData ? user : null,
    };
  } catch {
    return { isAdmin: false, user: null };
  }
}
