"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, User, Tag, Clock, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { getArticles } from "../../data/data"

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
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
              {post.read_time && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  {post.read_time}
                </div>
              )}
              {post.created_at && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-1 h-4 w-4" />
                  {new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              )}
              {post.author && (
                <div className="flex items-center text-sm text-gray-500">
                  <User className="mr-1 h-4 w-4" />
                  {post.author}
                </div>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>

            {/* Article Excerpt */}
            {post.excerpt && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>}

            {/* Featured Image */}
            {(mainImage) && (
              <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={getBlogImageUrl(mainImage)}
                  alt={post?.title || "Article image"}
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
                {post.tags.map((tag: string) => (
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
                {relatedPosts.map((relatedPost: Article) => (
                  <Card key={relatedPost.id} className="overflow-hidden">
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
