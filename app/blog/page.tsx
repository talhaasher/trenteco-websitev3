"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Calendar, User, Tag } from "lucide-react"
import { getArticles as getArticlesRaw, subscribeNewsletter } from "@/app/data/data"
import { useCachedFetch } from "@/hooks/useCachedFetch"

type Article = {
  id: string | number
  title: string | null
  excerpt: string | null
  content: string | null
  tags: string[] | null
  category: string | null
  author: string | null
  created_at: string | null
  read_time: string | null
  image_url?: string | null
  image_urls?: string[] | string | null
  slug: string | null
}

function getArticlesSafe() {
  return getArticlesRaw().then(res => res ?? [])
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle"|"loading"|"success"|"error">("idle")

  const { data: articles = [], loading } = useCachedFetch<Article[]>("articles", getArticlesSafe)
  const [searchedArticles, setSearchedArticles] = useState<Article[]>([])

  useEffect(() => {
    setSearchedArticles(articles ?? [])
  }, [articles])

  useEffect(() => {
    if (!searchTerm) {
      setSearchedArticles(articles ?? [])
      return
    }
    const q = searchTerm.toLowerCase()
    setSearchedArticles(
      (articles ?? []).filter(article =>
        (article.title?.toLowerCase().includes(q) ?? false) ||
        (article.tags?.some(tag => tag.toLowerCase().includes(q)) ?? false) ||
        (article.excerpt?.toLowerCase().includes(q) ?? false) ||
        (article.category?.toLowerCase().includes(q) ?? false)
      )
    )
  }, [searchTerm, articles])

  const postsToShow = Array.isArray(searchedArticles) ? searchedArticles : []

  const filteredPosts = postsToShow.filter((post) => {
    if (selectedCategory === "All") return true
    if (typeof post.category === "string") {
      return post.category.toLowerCase() === selectedCategory.toLowerCase()
    }
    return false
  })

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setNewsletterStatus("loading")
    const result = await subscribeNewsletter(newsletterEmail)
    if (result) {
      setNewsletterStatus("success")
      setNewsletterEmail("")
    } else {
      setNewsletterStatus("error")
    }
  }

  // Helper to get public URL for Supabase storage images
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const getBlogImageUrl = (path: string) =>
    path && /^https?:\/\//.test(path) ? path : path ? `${supabaseUrl}/storage/v1/object/public/blog/${path}` : "/placeholder.svg";

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
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                // Robust image parsing for blog posts
                let images: string[] = [];
                const rawImages = post.image_urls;
                if (typeof rawImages === 'string') {
                  try {
                    const parsed = JSON.parse(rawImages);
                    if (Array.isArray(parsed)) {
                      images = parsed;
                    } else {
                      images = rawImages.split(',').map((s: string) => s.trim()).filter(Boolean);
                    }
                  } catch {
                    images = rawImages.split(',').map((s: string) => s.trim()).filter(Boolean);
                  }
                } else if (Array.isArray(rawImages)) {
                  images = rawImages;
                } else if (post.image_url) {
                  images = [post.image_url];
                }
                const mainImage = images[0] || post.image_url || "/placeholder.svg";
                return (
                  <Card key={post.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={getBlogImageUrl(mainImage)} alt={post.title || "Article image"} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.read_time && (
                          <span className="text-xs text-gray-500">{post.read_time}</span>
                        )}
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
                          {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
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
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      {/* <section className="py-16 bg-teal-600 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for the latest insights on sustainable packaging and industry trends.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={handleNewsletterSubmit}
            >
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                type="email"
                required
              />
              <Button
                variant="secondary"
                className="whitespace-nowrap"
                type="submit"
                disabled={newsletterStatus === "loading"}
              >
                {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
            {newsletterStatus === "success" && (
              <p className="text-green-200 mt-2">Thank you for subscribing!</p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-red-200 mt-2">There was an error. Please try again.</p>
            )}
            <p className="text-sm mt-4 opacity-80">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section> */}
    </div>
  )
}
