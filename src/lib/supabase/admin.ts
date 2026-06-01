import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Service role client for admin operations (bypasses RLS)
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not configured");
  }

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookies().get(name)?.value;
      },
    },
  });
}

// Check if current user is admin
export async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return false;

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
    if (!user) return false;

    const { data } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();

    return !!data;
  } catch {
    return false;
  }
}

// Get current admin user
export async function getAdminUser() {
  try {
    const cookieStore = cookies();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) return null;

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
    if (!user) return null;

    const { data } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", user.id)
      .single();

    return data ? { ...data, auth_email: user.email } : null;
  } catch {
    return null;
  }
}
