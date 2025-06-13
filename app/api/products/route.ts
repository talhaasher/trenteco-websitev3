import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Fallback data in case database is not set up
const fallbackProducts = [
  {
    id: 1,
    name: "Standard Kraft Paper Bag",
    category: "retail",
    price: 0.45,
    size: "medium",
    material: "kraft",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Durable kraft paper bag with twisted paper handles. Perfect for retail stores.",
    sku: "SKU-001",
    stock_quantity: 100,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "White Paper Bag with Flat Handles",
    category: "retail",
    price: 0.55,
    size: "large",
    material: "white",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Elegant white paper bag with flat handles, ideal for clothing and accessories.",
    sku: "SKU-002",
    stock_quantity: 75,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Food Delivery Bag",
    category: "food",
    price: 0.35,
    size: "small",
    material: "kraft",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Grease-resistant paper bag designed for takeaway food items.",
    sku: "SKU-003",
    stock_quantity: 200,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Luxury Boutique Bag",
    category: "luxury",
    price: 0.95,
    size: "medium",
    material: "premium",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Premium quality paper bag with ribbon handles and gold foil printing.",
    sku: "SKU-004",
    stock_quantity: 50,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Bakery Paper Bag",
    category: "food",
    price: 0.25,
    size: "small",
    material: "kraft",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Food-safe paper bag perfect for bakery items and pastries.",
    sku: "SKU-005",
    stock_quantity: 150,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Gift Bag with Rope Handles",
    category: "luxury",
    price: 0.85,
    size: "medium",
    material: "premium",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Elegant gift bag with rope handles and matte finish.",
    sku: "SKU-006",
    stock_quantity: 60,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Grocery Paper Bag",
    category: "retail",
    price: 0.65,
    size: "large",
    material: "kraft",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Strong kraft paper bag with reinforced bottom, ideal for groceries.",
    sku: "SKU-007",
    stock_quantity: 120,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Pharmacy Paper Bag",
    category: "retail",
    price: 0.4,
    size: "small",
    material: "white",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Clean white paper bag suitable for pharmacies and healthcare products.",
    sku: "SKU-008",
    stock_quantity: 90,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Wine Bottle Bag",
    category: "luxury",
    price: 0.75,
    size: "medium",
    material: "premium",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Specialized paper bag designed to hold wine bottles securely.",
    sku: "SKU-009",
    stock_quantity: 40,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Custom Printed Bag",
    category: "retail",
    price: 0.85,
    size: "large",
    material: "kraft",
    image_url: "/placeholder.svg?height=300&width=300",
    description: "Customizable kraft paper bag with your logo and branding.",
    sku: "SKU-010",
    stock_quantity: 80,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

function applyFilters(products: typeof fallbackProducts, searchParams: URLSearchParams) {
  let filteredProducts = [...products]

  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const limit = searchParams.get("limit")

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category)
  }

  if (featured === "true") {
    filteredProducts = filteredProducts.filter((p) => p.is_featured)
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number.parseInt(limit))
  }

  return filteredProducts
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  try {
    // Try to connect to Supabase
    const supabase = await createClient()

    let query = supabase.from("products").select("*").order("created_at", { ascending: false })

    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    if (category) {
      query = query.eq("category", category)
    }

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    if (limit) {
      query = query.limit(Number.parseInt(limit))
    }

    const { data: products, error } = await query

    if (error) {
      console.log("Database error, using fallback data:", error.message)
      return NextResponse.json(applyFilters(fallbackProducts, searchParams))
    }

    return NextResponse.json(products || [])
  } catch (error) {
    console.log("Connection error, using fallback data:", error)
    return NextResponse.json(applyFilters(fallbackProducts, searchParams))
  }
}
