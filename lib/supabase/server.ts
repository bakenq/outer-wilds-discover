// lib/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function createClient(cookieStore: ReadonlyRequestCookies) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // can be ignored if middleware exists?
          }
        },
      },
    }
  );
}
