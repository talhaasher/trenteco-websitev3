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
    return null
  }
  return data
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
  const { data, error } = await supabase.from("faq").select("*")
  if (error || !data) {
    console.error("Error fetching faqs:", error)
    return null
  }
  return data
}

export async function getArticles() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("article").select("*")
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
      .from("article")
      .select("*")
      .or([
        `title.ilike.%${q}%`,
        `excerpt.ilike.%${q}%`,
        `content.ilike.%${q}%`,
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


