"use client"

import React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Filter, Search } from "lucide-react"
import { productData } from '../data/data';

export default function ProductsPage() {
  
  const [allProducts, setAllProducts] = useState(() => [...productData])
  const [filteredProducts, setFilteredProducts] = useState(() => [...productData])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  // Remove fetchProducts and useEffect for fetching

  // Handle filter changes
  const applyFilters = () => {
    let result = [...allProducts]

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }


    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category))
      setSelectedCategory(selectedCategories[0])
    } else {
      setSelectedCategory(undefined)
    }

    // Apply size filter
    if (selectedSizes.length > 0) {
      result = result.filter((product) => selectedSizes.includes(product.size))
    }

    // Apply material filter
    if (selectedMaterials.length > 0) {
      result = result.filter((product) => selectedMaterials.includes(product.material))
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
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  // Handle size checkbox changes
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size)
      } else {
        return [...prev, size]
      }
    })
  }

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
  React.useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters()
    }
  }, [searchTerm, priceRange, selectedCategories, selectedSizes, selectedMaterials, sortBy, allProducts])

  // Get unique values for filter options
  const categories = [...new Set(allProducts.map((p) => p.category))]
  const sizes = [...new Set(allProducts.map((p) => p.size))]
  const materials = [...new Set(allProducts.map((p) => p.material))]

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="bg-gradient-to-r from-cream-50 to-cream-100 py-12">
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
        </section>

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
      <section className="bg-gradient-to-r from-cream-50 to-cream-100 py-12">
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
      </section>

      {/* Products Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-20">
                <h2 className="text-xl font-bold mb-6">Filters</h2>


                {/* <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
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
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Size</h3>
                  <div className="space-y-2">
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
                  </div>
                </div> */}

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Material</h3>
                  <div className="space-y-2">
                    {materials.map((material) => (
                      <div key={material} className="flex items-center">
                        <Checkbox
                          id={material}
                          checked={selectedMaterials.includes(material)}
                          onCheckedChange={() => handleMaterialChange(material)}
                        />
                        <Label htmlFor={material} className="ml-2 capitalize">
                          {material}
                        </Label>
                      </div>
                    ))}
                  </div>
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
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Search and Sort */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
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
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <div className="relative h-64">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
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
                          <div className="flex items-center gap-2">
                            <span className="text-sm bg-cream-100 px-2 py-1 rounded-full">{product.size}</span>
                            <span className="text-sm bg-cream-100 px-2 py-1 rounded-full">{product.material}</span>
                          </div>
                        </div>
                      </CardContent>

                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
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
                </div>
              )}

   
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-cream-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Custom Paper Bags?</h2>
            <p className="text-gray-600 mb-6">
              We offer custom printing, sizes, and designs to match your brand perfectly.
            </p>
            <Button className="bg-teal-600 hover:bg-teal-700">Request a Custom Quote</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export function ProductList() {
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
