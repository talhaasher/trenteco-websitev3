"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Calendar, User, Tag } from "lucide-react"
import { getArticles as getArticlesRaw, subscribeNewsletter } from "@/app/data/data"
import { useCachedFetch } from "@/hooks/useCachedFetch"
import ScrollReveal from "@/components/ScrollReveal"
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem, 
  textReveal,
  scaleIn,
  hoverLift
} from "@/lib/animations"

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
      <motion.section 
        className="bg-gradient-to-r from-cream-50 to-cream-100 py-16 md:py-24"
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
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              variants={textReveal}
            >
              TrentEco <span className="text-teal-600">Blog</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-black font-semibold mb-8"
              variants={textReveal}
            >
              Insights, trends, and expert advice on sustainable packaging and eco-friendly business practices.
            </motion.p>
            <motion.div 
              className="relative max-w-md mx-auto"
              variants={scaleIn}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" size={18} />
              <Input
                placeholder="Search articles..."
                className="pl-10 shadow-lg border-2 border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-300 placeholder:text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Grid */}
      <ScrollReveal>
        <section className="py-12 bg-cream-50">
          <div className="container">
            <motion.h2 
              className="text-2xl font-bold mb-8 text-black"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              Latest Articles
            </motion.h2>
            {filteredPosts.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {filteredPosts.map((post, idx) => {
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
                    <motion.div 
                      key={post.id} 
                      variants={staggerItem}
                      whileHover={{ 
                        y: -8,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                    >
                      <Card className="overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-teal-200">
                        <motion.div 
                          className="relative h-48 overflow-hidden"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image src={getBlogImageUrl(mainImage)} alt={post.title || "Article image"} fill className="object-cover" />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
                          />
                        </motion.div>
                        <CardHeader className="bg-gradient-to-br from-white to-gray-50" style={{backgroundColor: 'white'}}>
                          <motion.div 
                            className="flex items-center gap-2 mb-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            {post.read_time && (
                              <span className="text-xs bg-teal-300 px-3 py-1 rounded-full border border-teal-500 font-black" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2)'}}>
                                {post.read_time}
                              </span>
                            )}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <CardTitle className="line-clamp-2 text-lg font-black" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.1)', WebkitTextStroke: '0.5px black'}}>{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2 font-black leading-relaxed" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2), 0 0 4px rgba(0,0,0,0.1)', WebkitTextStroke: '0.5px black'}}>{post.excerpt}</CardDescription>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="bg-white" style={{backgroundColor: 'white'}}>
                                                     <motion.div 
                             className="flex items-center space-x-4 text-sm mb-4 font-black"
                             style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2)'}}
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.4 }}
                           >
                             <div className="flex items-center" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2)'}}>
                               <User size={14} className="mr-1" style={{color: 'black !important'}} />
                               {post.author}
                             </div>
                             <div className="flex items-center" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2)'}}>
                               <Calendar size={14} className="mr-1" style={{color: 'black !important'}} />
                               {post.created_at ? new Date(post.created_at).toLocaleDateString() : ""}
                             </div>
                           </motion.div>
                          <motion.div 
                            className="flex flex-wrap gap-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                          >
                            {post.tags?.slice(0, 2).map((tag, tagIdx) => (
                              <motion.div
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.6 + tagIdx * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                              >
                                <Badge variant="secondary" className="text-xs bg-teal-300 border-teal-500 hover:bg-teal-400 transition-colors font-black" style={{color: 'black !important', fontWeight: '900', textShadow: '0 0 2px rgba(0,0,0,0.2)'}}>
                                  <Tag size={10} className="mr-1" style={{color: 'black !important'}} />
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                          </motion.div>
                        </CardContent>
                        <CardFooter className="bg-gradient-to-t from-gray-50 to-white border-t border-gray-100">
                          <Link href={`/blog/${post.slug}`} className="w-full">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                                                             <Button 
                                 variant="outline" 
                                 className="w-full border-2 border-black hover:bg-black hover:text-white transition-all duration-300 shadow-md hover:shadow-lg font-black"
                                 style={{color: 'black !important', fontWeight: '900'}}
                               >
                                 Read More <ArrowRight className="ml-2 h-4 w-4" />
                               </Button>
                            </motion.div>
                          </Link>
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
                                 <p className="text-lg text-black font-bold">No articles found matching your search.</p>
              </motion.div>
            )}
          </div>
        </section>
      </ScrollReveal>

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
