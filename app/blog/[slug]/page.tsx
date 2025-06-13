"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import type { BlogPost } from "@/lib/supabase/types"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)

        // Fetch all blog posts and find the one with matching slug
        const response = await fetch("/api/blog")
        if (!response.ok) {
          console.log("API response not ok")
          return
        }

        const posts: BlogPost[] = await response.json()
        const foundPost = posts.find((p) => p.slug === slug)

        if (foundPost) {
          setPost(foundPost)

          // Get related posts from the same category
          const related = posts.filter((p) => p.id !== foundPost.id && p.category === foundPost.category).slice(0, 3)
          setRelatedPosts(related)
        }
      } catch (error) {
        console.log("Error fetching blog post:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug])

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post?.title || ""

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="container py-12">
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
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {post.read_time}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <User className="mr-1 h-4 w-4" />
                {post.author}
              </div>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>

            {/* Article Excerpt */}
            {post.excerpt && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>}

            {/* Featured Image */}
            {post.image_url && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={post.image_url || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">{post.content}</div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t border-b py-6 mb-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Share this article</h3>
                <div className="flex items-center gap-3">
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
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-teal-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{post.author}</CardTitle>
                    <p className="text-gray-600">Content Writer at TrentEco</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {post.author} is passionate about sustainable packaging solutions and helping businesses make
                  environmentally conscious choices. With years of experience in the packaging industry, they provide
                  valuable insights into eco-friendly practices and trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-cream-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image_url || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{relatedPost.category}</Badge>
                        <span className="text-xs text-gray-500">{relatedPost.read_time}</span>
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
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-12 bg-teal-600 text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for more insights on sustainable packaging and industry trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-gray-900"
              />
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
