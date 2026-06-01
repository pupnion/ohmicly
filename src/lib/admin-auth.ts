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

    // কুকি ম্যানেজমেন্টের স্ট্যান্ডার্ড এবং সঠিক নিয়ম (get, set, remove সব সহ)
    const supabase = createServerClient(url, key, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // সার্ভার কম্পোনেন্টে অনেক সময় সেট করা না গেলে ইগনোর করবে
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.delete({ name, ...options });
          } catch (error) {
            // সার্ভার কম্পোনেন্টে অনেক সময় ডিলিট করা না গেলে ইগনোর করবে
          }
        },
      },
    });

    // ইউজারের সেশন ডাটাবেজ থেকে একদম ফ্রেশভাবে তুলে আনা
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isAdmin: false, user: null };
    }

    // admin_users টেবিল থেকে চেক করা আপনার আইডিটি আছে কি না
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .maybeSingle(); // single এর বদলে maybeSingle ব্যবহার করা নিরাপদ যাতে এরর থ্রো না করে

    return {
      isAdmin: !!adminData,
      user: adminData ? user : null,
    };
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return { isAdmin: false, user: null };
  }
}
