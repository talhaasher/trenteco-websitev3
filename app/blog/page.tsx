"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Calendar, User, Tag } from "lucide-react"
import { articles } from "@/public/data"
// const categories = ["All", "Industry Trends", "Manufacturing", "Branding", "Sustainability", "Small Business", "Design"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = articles.filter((post) => {
    const q = searchTerm.toLowerCase();
    // Check category (array or string)
    const categoryMatch =
      selectedCategory === "All" ||
      (Array.isArray(post.category)
        ? post.category.some((cat) => cat.toLowerCase() === selectedCategory.toLowerCase())
        : typeof post.category === "string" &&
          post.category.toLowerCase() === selectedCategory.toLowerCase());

    // Check search term in title, excerpt, tags, or
    return (
      categoryMatch &&
      (post.title.toLowerCase().includes(q) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(q)))
    );
  });

  const filteredArticles = articles.filter((article) => {
    const q = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  const featuredPost = filteredPosts[0]
  const otherPosts = filteredPosts.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cream-50 to-cream-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              TrentEco <span className="text-teal-600">Blog</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Insights, trends, and expert advice on sustainable packaging and eco-friendly business practices.
            </p>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>



      {/* Blog Posts Grid */}
      <section className="py-12 bg-cream-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          {otherPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs text-gray-500">{post.read_time}</span>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <User size={14} className="mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag size={10} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/blog/${post.slug}`} className="w-full">
                      <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for the latest insights on sustainable packaging and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-gray-900" />
              <Button variant="secondary" className="whitespace-nowrap">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-80">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
