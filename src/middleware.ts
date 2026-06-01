import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Only protect /admin and /dashboard routes
  if (!isAdminRoute && !isDashboardRoute) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, redirect to login
  if (!supabaseUrl || !supabaseKey) {
    if (pathname !== "/admin/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not logged in → redirect to login
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = isDashboardRoute ? "/login" : "/admin/login";
      return NextResponse.redirect(url);
    }

    // For admin routes, check if user exists in admin_users table
    if (isAdminRoute) {
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!adminData) {
        // User is logged in but NOT an admin → redirect to home with error
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(url);
      }
    }
  } catch {
    // Auth check failed, redirect to login
    const url = request.nextUrl.clone();
    url.pathname = isDashboardRoute ? "/login" : "/admin/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
