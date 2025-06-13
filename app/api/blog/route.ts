import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Fallback data in case database is not set up
const fallbackBlogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Packaging",
    slug: "future-sustainable-packaging",
    excerpt:
      "Exploring innovative approaches to eco-friendly packaging solutions that benefit both businesses and the environment.",
    content:
      "In today's world, sustainable packaging is no longer just a trend—it's a necessity. As consumers become increasingly environmentally conscious, businesses must adapt their packaging strategies to meet these evolving demands. This shift towards sustainability isn't just about doing the right thing for the planet; it's also about meeting customer expectations and staying competitive in an evolving marketplace.",
    author: "Sarah Johnson",
    category: "sustainability",
    tags: ["sustainability", "packaging", "environment"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "5 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Paper vs Plastic: Making the Right Choice",
    slug: "paper-vs-plastic-choice",
    excerpt: "A comprehensive comparison of paper and plastic packaging options for modern businesses.",
    content:
      "The debate between paper and plastic packaging has been ongoing for decades. Each material has its advantages and disadvantages, and the right choice depends on various factors including your business type, environmental goals, and customer preferences. Understanding these differences is crucial for making informed packaging decisions.",
    author: "Mike Chen",
    category: "materials",
    tags: ["paper", "plastic", "comparison"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "7 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Custom Branding on Paper Bags: Best Practices",
    slug: "custom-branding-paper-bags",
    excerpt:
      "Learn how to effectively brand your paper bags to enhance your business identity and customer experience.",
    content:
      "Custom branding on paper bags is an excellent way to promote your business while providing customers with a functional and attractive packaging solution. From design considerations to printing techniques, there are many factors to consider when creating branded packaging that represents your business effectively.",
    author: "Emma Davis",
    category: "branding",
    tags: ["branding", "design", "marketing"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "4 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    title: "The Economics of Bulk Paper Bag Orders",
    slug: "economics-bulk-paper-bag-orders",
    excerpt: "Understanding the cost benefits and considerations when ordering paper bags in bulk quantities.",
    content:
      "When it comes to purchasing paper bags for your business, ordering in bulk can provide significant cost savings and operational benefits. However, there are several factors to consider to ensure you're making the most economical choice for your specific needs.",
    author: "David Wilson",
    category: "business",
    tags: ["bulk", "economics", "cost-saving"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "6 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    title: "UK Manufacturing: Supporting Local Economy",
    slug: "uk-manufacturing-local-economy",
    excerpt: "How choosing UK-manufactured packaging supports the local economy and reduces environmental impact.",
    content:
      "Choosing UK-manufactured packaging solutions offers numerous benefits beyond just supporting local businesses. From reduced carbon footprints due to shorter transportation distances to supporting local employment, there are compelling reasons to choose domestic suppliers for your packaging needs.",
    author: "James Taylor",
    category: "manufacturing",
    tags: ["uk-manufacturing", "local-economy", "sustainability"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "5 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Sustainable Materials in Paper Bag Production",
    slug: "sustainable-materials-paper-bags",
    excerpt: "An in-depth look at the sustainable materials and processes used in modern paper bag manufacturing.",
    content:
      "The paper bag industry has evolved significantly in recent years, with manufacturers adopting more sustainable materials and production processes. From FSC-certified papers to water-based inks, modern paper bag production prioritizes environmental responsibility without compromising on quality or functionality.",
    author: "Emma Williams",
    category: "sustainability",
    tags: ["materials", "sustainability", "manufacturing"],
    image_url: "/placeholder.svg?height=400&width=600",
    read_time: "6 min read",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

function applyFilters(posts: typeof fallbackBlogPosts, searchParams: URLSearchParams) {
  let filteredPosts = [...posts]

  const category = searchParams.get("category")
  const limit = searchParams.get("limit")

  if (category) {
    filteredPosts = filteredPosts.filter((p) => p.category === category)
  }

  if (limit) {
    filteredPosts = filteredPosts.slice(0, Number.parseInt(limit))
  }

  return filteredPosts
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  try {
    // Try to connect to Supabase
    const supabase = await createClient()

    let query = supabase.from("blog_posts").select("*").eq("published", true).order("created_at", { ascending: false })

    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    if (category) {
      query = query.eq("category", category)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const { data: posts, error } = await query

    if (error) {
      console.log("Database error, using fallback blog data:", error.message)
      return NextResponse.json(applyFilters(fallbackBlogPosts, searchParams))
    }

    return NextResponse.json(posts || [])
  } catch (error) {
    console.log("Connection error, using fallback blog data:", error)
    return NextResponse.json(applyFilters(fallbackBlogPosts, searchParams))
  }
}
