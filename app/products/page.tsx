"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  Filter, Search } from "lucide-react"
import { getProductData as getProductDataRaw } from '../data/data';
import { useCachedFetch } from "@/hooks/useCachedFetch"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  textReveal,
  scaleIn,
  fadeInLeft,
  fadeInRight
} from "@/lib/animations"

function getProductDataSafe() {
  return getProductDataRaw().then(res => res ?? [])
}

type Product = {
  id: string | number
  name: string
  category: string | null
  // size: string | null
  material: string | null
  image_url: string | null
  image_urls: string | null // <-- add this line for Supabase images array
  description: string | null
  sku: string | null
  is_featured: boolean | null
  slug?: string | null // <-- add slug for dynamic product pages
  created_at?: string | null
  updated_at?: string | null
}

// Helper to get public Supabase image URL
function getSupabaseImageUrl(path: string) {
  if (!path) return "/placeholder.svg";
  // If already a full URL, return as is
  if (/^https?:\/\//i.test(path)) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;
  if (!base || !bucket) return "/placeholder.svg";
  let cleanPath = path.replace(/^pictues[\/]+/, "").replace(/^\/+/, "");
  return `${base}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const { data: allProducts = [], loading } = useCachedFetch<Product[]>("products", getProductDataSafe)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

  useEffect(() => {
    setFilteredProducts(allProducts ?? [])
  }, [allProducts])

  // Handle filter changes
  const applyFilters = () => {
    let result = [...(allProducts ?? [])]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // // Apply category filter
    // if (selectedCategories.length > 0) {
    //   result = result.filter((product) => product.category && selectedCategories.includes(product.category))
    // }

    // Apply size filter
    // if (selectedSizes.length > 0) {
    //   result = result.filter((product) => product.size && selectedSizes.includes(product.size))
    // }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      result = result.filter((product) => product.material && selectedMaterials.includes(product.material))
    }

    // Apply sorting
    switch (sortBy) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - prioritize featured products
        result.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          return 0
        })
        break
    }

    setFilteredProducts(result)
  }

  // Handle category checkbox changes
  // const handleCategoryChange = (category: string) => {
  //   setSelectedCategories((prev) => {
  //     if (prev.includes(category)) {
  //       return prev.filter((c) => c !== category)
  //     } else {
  //       return [...prev, category]
  //     }
  //   })
  // }

  // Handle size checkbox changes
  // const handleSizeChange = (size: string) => {
  //   setSelectedSizes((prev) => {
  //     if (prev.includes(size)) {
  //       return prev.filter((s) => s !== size)
  //     } else {
  //       return [...prev, size]
  //     }
  //   })
  // }

  // Handle material checkbox changes
  const handleMaterialChange = (material: string) => {
    setSelectedMaterials((prev) => {
      if (prev.includes(material)) {
        return prev.filter((m) => m !== material)
      } else {
        return [...prev, material]
      }
    })
  }

  // Apply filters when any filter changes
  useEffect(() => {
    if ((allProducts ?? []).length > 0) {
      applyFilters()
    }
  }, [searchTerm, selectedCategories, selectedSizes, selectedMaterials, sortBy, allProducts])

  // Get unique values for filter options
  // const categories = [...new Set(allProducts.map((p) => p.category).filter((v): v is string => !!v))]
  // const sizes = [...new Set(allProducts.map((p) => p.size).filter((v): v is string => !!v))]
  const materials = [...new Set((allProducts ?? []).map((p) => p.material).filter((v): v is string => !!v))]

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <motion.section 
          className="bg-gradient-to-r from-cream-50 to-cream-100 py-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                Our <span className="text-teal-600">Products</span>
              </h1>
              <p className="text-lg text-gray-600">
                Browse our range of eco-friendly paper bags for various industries and uses.
              </p>
            </div>
          </div>
        </motion.section>

        <section className="py-12 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden animate-pulse">
                  <div className="h-64 bg-gray-200"></div>
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="bg-gradient-to-r from-cream-50 to-cream-100 py-12"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight mb-4"
              variants={textReveal}
            >
              Our <span className="text-teal-600">Products</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600"
              variants={textReveal}
            >
              Browse our range of eco-friendly paper bags for various industries and uses.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <ScrollReveal>
        <section className="py-12 bg-white">
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters - Desktop */}
              <motion.div 
                className="hidden lg:block w-64 flex-shrink-0"
                variants={fadeInLeft}
                initial="initial"
                animate="animate"
              >
                <div className="sticky top-20">
                  <h2 className="text-xl font-bold mb-6">Filters</h2>

                  {/* <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    {/* <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={category} className="ml-2 capitalize">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div> */}
                  {/* </div> */}

                  {/* <div className="mb-6">
                    <h3 className="font-medium mb-3">Size</h3>
                    {/* <div className="space-y-2">
                      {sizes.map((size) => (
                        <div key={size} className="flex items-center">
                          <Checkbox
                            id={size}
                            checked={selectedSizes.includes(size)}
                            onCheckedChange={() => handleSizeChange(size)}
                          />
                          <Label htmlFor={size} className="ml-2 capitalize">
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div> */}
                  {/* </div>  */}

                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Material</h3>
                    <motion.div 
                      className="space-y-2"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {materials.map((material, idx) => (
                        <motion.div 
                          key={material} 
                          className="flex items-center"
                          variants={staggerItem}
                        >
                          <Checkbox
                            id={material}
                            checked={selectedMaterials.includes(material)}
                            onCheckedChange={() => handleMaterialChange(material)}
                          />
                          <Label htmlFor={material} className="ml-2 capitalize">
                            {material}
                          </Label>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategories([])
                      setSelectedSizes([])
                      setSelectedMaterials([])
                      setSortBy("featured")
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </motion.div>

              {/* Products */}
              <motion.div 
                className="flex-1"
                variants={fadeInRight}
                initial="initial"
                animate="animate"
              >
                {/* Search and Sort */}
                <motion.div 
                  className="flex flex-col md:flex-row gap-4 mb-8"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div 
                    className="relative flex-1"
                    variants={staggerItem}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </motion.div>
                  <motion.div 
                    className="flex gap-2"
                    variants={staggerItem}
                  >
                    <Button
                      variant="outline"
                      className="lg:hidden border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Filter size={18} className="mr-2" />
                      Filters
                    </Button>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>
                </motion.div>

                {/* Product Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {filteredProducts.map((product, idx) => {
                      // Parse images from comma-separated string or array
                      let images: string[] = [];
                      const rawImages = (product as any).image_urls;
                      if (Array.isArray(rawImages)) {
                        images = rawImages;
                      } else if (typeof rawImages === 'string') {
                        try {
                          // Try to parse as JSON array
                          const parsed = JSON.parse(rawImages);
                          if (Array.isArray(parsed)) {
                            images = parsed;
                          } else {
                            images = rawImages.split(',').map((s: string) => s.trim()).filter(Boolean);
                          }
                        } catch {
                          images = rawImages.split(',').map((s: string) => s.trim()).filter(Boolean);
                        }
                      } else if (product.image_url) {
                        images = [product.image_url];
                      }
                      const mainImage = getSupabaseImageUrl((images[0] as string) || "");
                      return (
                        <motion.div key={product.id} variants={staggerItem}>
                          <Card className="overflow-hidden">
                            <div className="relative h-64 w-full">
                              {mainImage ? (
                                <Image
                                  src={mainImage}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  style={{ objectFit: 'cover' }}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority={true}
                                />
                              ) : (
                                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                                  No Image
                                </div>
                              )}
                              {product.is_featured && (
                                <div className="absolute top-2 left-2 bg-teal-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                                  Featured
                                </div>
                              )}
                            </div>
                            <CardHeader>
                              <CardTitle>{product.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-gray-600 mb-4">{product.description}</p>
                              <div className="flex justify-between items-center">
                                {/* <div className="flex items-center gap-2">
                                {product.size && (
                                  <span className="text-sm bg-cream-100 px-2 py-1 rounded-full">{product.size}</span>
                                )}
                                {product.material && (
                                  <span className="text-sm bg-cream-100 px-2 py-1 rounded-full">{product.material}</span>
                                )}
                              </div> */}
                              </div>
                            </CardContent>
                            <CardFooter>
                              <div className="flex gap-2 w-full">
                                <Link href={`/products/${product.slug || product.id}`} className="w-full">
                                  <Button className="w-full bg-teal-600 hover:bg-teal-700" variant="default">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12"
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                  >
                    <p className="text-lg text-gray-600">No products match your filters.</p>
                    <Button
                      variant="outline"
                      className="mt-4 border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedCategories([])
                        setSelectedSizes([])
                        setSelectedMaterials([])
                        setSortBy("featured")
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-12 bg-cream-50">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-2xl font-bold mb-4"
                variants={fadeInUp}
              >
                Need Custom Paper Bags?
              </motion.h2>
              <motion.p 
                className="text-gray-600 mb-6"
                variants={staggerItem}
              >
                We offer custom printing, sizes, and designs to match your brand perfectly.
              </motion.p>
              <motion.div variants={staggerItem}>
                <Link href="/contact#enquiry-form">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    Request a Custom Quote
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}

export function ProductList() {
  const [productData, setProductData] = useState<any[]>([])

  useEffect(() => {
    getProductDataSafe().then((data: Product[]) => {
      setProductData(data ?? [])
    })
  }, [])

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {productData.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong>: {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
