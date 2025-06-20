"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { useCart } from "./cart-provider"
import { productData } from '../public/data'; // Make sure the path is correct

interface ProductSuggestionsProps {
  currentProductId?: number
  category?: string
  limit?: number
  title?: string
}

export default function ProductSuggestions({
  currentProductId,
  category,
  limit = 3,
  title = "You Might Also Like",
}: ProductSuggestionsProps) {
  const { dispatch } = useCart()
  const [suggestions, setSuggestions] = useState(productData);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()

        if (category) {
          params.append("category", category)
        }

        params.append("limit", (limit * 2).toString()) // Fetch more to filter out current product

        const response = await fetch(`/api/products?${params}`)
        if (!response.ok) {
          console.log("API response not ok, but continuing with empty data")
          setSuggestions([])
          return
        }


        // Filter out the current product and shuffle
        const filteredProducts = currentProductId
          ? productData.filter((product) => product.id !== currentProductId)
          : productData

        // Shuffle the array for randomness
        const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random())

        // Take only the number of products specified by limit
        setSuggestions(shuffled.slice(0, limit))
      } catch (error) {
        console.log("Error fetching product suggestions, using empty data:", error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }

    fetchSuggestions()
  }, [currentProductId, category, limit])

  

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: limit }).map((_, index) => (
            <Card key={index} className="overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
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
    )
  }

  if (suggestions.length === 0) {
    return null
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image src={product.image_url || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-cream-100 px-2 py-1 rounded-full">{product.size}</span>
                  <span className="text-xs bg-cream-100 px-2 py-1 rounded-full">{product.material}</span>
                </div>
              </div>
            </CardContent>

          </Card>
        ))}
      </div>
    </div>
  )
}
