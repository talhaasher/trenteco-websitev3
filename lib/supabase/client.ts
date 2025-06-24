// ⚠️ Only use this client for public, non-sensitive data (e.g., published articles, products, faqs, etc.)
// ❌ Never use this client for admin-only or sensitive operations (e.g., reading all enquiries, managing articles, etc.)
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}
