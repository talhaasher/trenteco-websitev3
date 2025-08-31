"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { getArticles } from "../../data/data"
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
  author_image?: string | null
}

export default function BlogPostPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const params = useParams()
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params?.slug[0] : ""

  useEffect(() => {
    getArticles().then((data) => setArticles(Array.isArray(data) ? data : []))
  }, [])

  const post = articles.find((p: Article) => p.slug === slug) || null
  const relatedPosts = post
    ? articles.filter(
        (p: Article) =>
          p.id !== post.id &&
          p.category &&
          post.category &&
          p.category === post.category
      ).slice(0, 3)
    : []

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post?.title || ""

  // Robust image parsing for blog post (null-safe)
  let images: string[] = [];
  const rawImages = post?.image_urls;
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
  } else if (post?.image_url) {
    images = [post.image_url];
  }
  const mainImage = images[0] || post?.image_url || "/placeholder.svg"

  // Helper to get public URL for Supabase storage images
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const getBlogImageUrl = (path: string) =>
    path && /^https?:\/\//.test(path) ? path : path ? `${supabaseUrl}/storage/v1/object/public/blog/${path}` : "/placeholder.svg";

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <motion.div 
          className="container py-12"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Article Header */}
      <motion.article 
        className="py-12 bg-white"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              variants={fadeInLeft}
              initial="initial"
              animate="animate"
            >
              <Link href="/blog" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Article Meta */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 mb-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {post.category && (
                <motion.div variants={staggerItem}>
                  <Badge variant="secondary">{post.category}</Badge>
                </motion.div>
              )}
              {post.read_time && (
                <motion.div 
                  className="flex items-center text-sm text-gray-500"
                  variants={staggerItem}
                >
                  <Clock className="mr-1 h-4 w-4" />
                  {post.read_time}
                </motion.div>
              )}
              {post.created_at && (
                <motion.div 
                  className="flex items-center text-sm text-gray-500"
                  variants={staggerItem}
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </motion.div>
              )}
              {post.author && (
                <motion.div 
                  className="flex items-center text-sm text-gray-500"
                  variants={staggerItem}
                >
                  <User className="mr-1 h-4 w-4" />
                  {post.author}
                </motion.div>
              )}
            </motion.div>

            {/* Article Title */}
            <motion.h1 
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
              variants={textReveal}
            >
              {post.title}
            </motion.h1>

            {/* Article Excerpt */}
            {post.excerpt && (
              <motion.p 
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                variants={textReveal}
              >
                {post.excerpt}
              </motion.p>
            )}

            {/* Featured Image */}
            {(mainImage) && (
              <motion.div 
                className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden"
                variants={scaleIn}
                initial="initial"
                animate="animate"
              >
                <Image
                  src={getBlogImageUrl(mainImage)}
                  alt={post?.title || "Article image"}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            )}

            {/* Article Content */}
            <motion.div 
              className="prose prose-lg max-w-none mb-8"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              {/* Render HTML content safely */}
              <div
                className="text-gray-700 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </motion.div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2 mb-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {post.tags.map((tag: string, idx: number) => (
                  <motion.div key={tag} variants={staggerItem}>
                    <Badge variant="outline" className="text-sm">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Share Buttons */}
            <ScrollReveal>
              <div className="border-t border-b py-6 mb-8">
                <motion.div 
                  className="flex items-center justify-between"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.h3 
                    className="text-lg font-semibold"
                    variants={fadeInUp}
                  >
                    Share this article
                  </motion.h3>
                  <motion.div 
                    className="flex items-center gap-3"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={staggerItem}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                            "_blank",
                          )
                        }
                      >
                        <Facebook className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
                            "_blank",
                          )
                        }
                      >
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                            "_blank",
                          )
                        }
                      >
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div variants={staggerItem}>
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Author Bio */}
            <ScrollReveal>
              <motion.div variants={fadeInUp}>
                <Card className="mb-8">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <motion.div 
                        className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center overflow-hidden"
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                      >
                        {post.author_image ? (
                          <Image
                            src={getBlogImageUrl(post.author_image)}
                            alt={post.author || "Author"}
                            width={64}
                            height={64}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-teal-600">{post.author?.charAt(0) || "A"}</span>
                        )}
                      </motion.div>
                      <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div variants={staggerItem}>
                          <CardTitle className="text-xl">{post.author}</CardTitle>
                        </motion.div>
                        <motion.p 
                          className="text-gray-600"
                          variants={staggerItem}
                        >
                          Content Writer at TrentEco
                        </motion.p>
                      </motion.div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            </ScrollReveal>
          </div>
        </div>
      </motion.article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <ScrollReveal>
          <section className="py-12 bg-cream-50">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <motion.h2 
                  className="text-3xl font-bold mb-8"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  Related Articles
                </motion.h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {relatedPosts.map((relatedPost: Article, idx: number) => (
                    <motion.div key={relatedPost.id} variants={staggerItem}>
                      <Card className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={relatedPost.image_url || "/placeholder.svg"}
                            alt={relatedPost.title || "Related article image"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            {relatedPost.category && <Badge variant="outline">{relatedPost.category}</Badge>}
                            {relatedPost.read_time && (
                              <span className="text-xs text-gray-500">{relatedPost.read_time}</span>
                            )}
                          </div>
                          <CardTitle className="text-lg line-clamp-2">{relatedPost.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm line-clamp-3">{relatedPost.excerpt}</p>
                          <Link href={`/blog/${relatedPost.slug}`} className="mt-4 inline-block">
                            <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                              Read More
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* Newsletter CTA */}
      <ScrollReveal>
        <section className="py-12 bg-teal-600 text-white">
          <div className="container">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Stay Updated
              </motion.h2>
              <motion.p 
                className="text-lg mb-8"
                variants={staggerItem}
              >
                Subscribe to our newsletter for more insights on sustainable packaging and industry trends.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={staggerItem} className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-md text-gray-900"
                  />
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Button variant="secondary" className="whitespace-nowrap">
                    Subscribe
                  </Button>
                </motion.div>
              </motion.div>
              <motion.p 
                className="text-sm mt-4 opacity-80"
                variants={staggerItem}
              >
                We respect your privacy. Unsubscribe at any time.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
