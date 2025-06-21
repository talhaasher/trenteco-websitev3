import { ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export async function getProductData() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("products").select("*")
  if (error || !data) {
    console.error("Error fetching products:", error)
    return null
  }
  return data
}

export async function getFeatures() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("features").select("*")
  if (error || !data) {
    console.error("Error fetching features:", error)
    return []
  }
  return data
}

export async function getArticles() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("articles").select("*")
  if (error || !data) {
    console.error("Error fetching articles:", error)
    return null
  }
  return data
}

export async function searchArticles(query: string) {
  const q = query.trim().toLowerCase()
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .or([
        `title.ilike.%${q}%`,
        `tags.cs.{${q}}`
      ].join(","))
    if (!error && data && data.length > 0) {
      return data
    }
  } catch (e) {
    console.error("Error searching articles:", e)
  }
  return []
}

export async function searchProducts(query: string) {
  const q = query.trim().toLowerCase()
  const products = await getProductData()
  if (!products) return []
  return products.filter(product =>
    product.name.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.material.toLowerCase().includes(q) ||
    (product.category && product.category.toLowerCase().includes(q))
  )
}

export async function getTeamMembers() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("team_members").select("*")
  if (error || !data) {
    console.error("Error fetching team members:", error)
    return null
  }
  return data
}

export async function getFaqs() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("faqs").select("*")
  if (error || !data) {
    console.error("Error fetching faqs:", error)
    return null
  }
  return data
}

export async function submitEnquiry(enquiry: {
  name: string
  email: string
  company?: string
  phone?: string
  enquiry_type?: string
  message: string
  newsletter_subscription?: boolean
  status?: string
  priority?: string
}) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("enquiry")
    .insert([
      {
        name: enquiry.name,
        email: enquiry.email,
        company: enquiry.company || null,
        phone: enquiry.phone || null,
        enquiry_type: enquiry.enquiry_type && enquiry.enquiry_type !== "" ? enquiry.enquiry_type : "other",
        message: enquiry.message,
        newsletter_subscription: enquiry.newsletter_subscription ?? false,
        status: enquiry.status || "new",
        priority: enquiry.priority || "normal",
      }
    ])
    .select()
  if (error) {
    // Improved error logging
    console.error("Error submitting enquiry:", error.message, error.details, error.hint, error.code)
    return null
  }
  return data?.[0] || null
}

export async function subscribeNewsletter(email: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("newsletter")
    .insert([{ email }])
    .select()
  if (error) {
    console.error("Error subscribing to newsletter:", error.message)
    return null
  }
  return data?.[0] || null
}




