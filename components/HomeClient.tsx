"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Leaf, Package, Recycle, TrendingUp } from "lucide-react";
import { getProductData, getArticles } from '../app/data/data';
import ScrollReveal from "@/components/ScrollReveal";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  iconAnimation,
  heroAnimation,
  textReveal
} from "@/lib/animations";

export default function HomeClient() {
  const router = useRouter();

  const iconMap = {
    Leaf,
    Package,
    TrendingUp,
    Recycle,
  };

  const features = [
    {
      icon: "Leaf",
      title: "Eco-Friendly",
      description: "Our recyclable kraft paper bags are strong, high-quality, and sustainably sourced.",
    },
    {
      icon: "Package",
      title: "UK Manufactured",
      description: "Made locally in Sutton Coldfield, Birmingham — cutting lead times and carbon emissions.",
    },
    {
      icon: "TrendingUp",
      title: "Custom Solutions",
      description: "Get printed food packaging in the UK that's branded to reflect your identity.",
    },
    {
      icon: "Recycle",
      title: "Sustainable",
      description: "We use eco-friendly materials and methods — ideal for brands seeking eco-friendly paper bags in the UK.",
    },
  ];

  const [productData, setProductData] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  useEffect(() => {
    Promise.all([getProductData(), getArticles()]).then(
      ([products, articles]) => {
        setProductData(Array.isArray(products) ? products : []);
        setArticles(Array.isArray(articles) ? articles : []);
      }
    );
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative bg-gradient-to-r from-cream-50 to-cream-100 py-16 md:py-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/placeholder.svg?height=800&width=1200"
          >
            <source src="/videos/vid.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <Image
              src="/placeholder.svg?height=600&width=1200"
              alt="TrentEco manufacturing background"
              fill
              className="object-cover"
              priority
            />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            variants={heroAnimation}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg"
              variants={textReveal}
            >
              Custom Eco-Friendly Paper Bags — Fast & UK-Made
            </motion.h1>
            <motion.p
              className="text-lg text-cream-100 mb-8 drop-shadow"
              variants={textReveal}
            >
              Sustainable food & retail packaging, proudly manufactured in the UK with rapid turnaround and tailored branding.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem}>
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 shadow-lg"
                  onClick={() => router.push("/products")}
                >
                  View Products
                </Button>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-black hover:bg-white hover:text-teal-600 shadow-lg backdrop-blur-sm"
                  onClick={() => router.push("/contact")}
                >
                  Request a Quote
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TrentEco?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              UK paper bag specialists delivering fast, sustainable packaging with custom options and local production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, idx: number) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-cream-100 p-4 rounded-full mb-4">
                  {iconMap[feature.icon as keyof typeof iconMap] &&
                    React.createElement(iconMap[feature.icon as keyof typeof iconMap], {
                      className: "h-8 w-8 text-teal-600",
                    })
                  }
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-cream-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Product Range</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of eco-friendly paper bags for various industries and uses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.slice(0, 3).map((product: any, idx: number) => {
              // Robust image parsing for home page
              let images: string[] = [];
              const rawImages = product.image_urls;
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
              } else if (product.image_url) {
                images = [product.image_url];
              }
              const mainImage = images[0] || product.image_url || "/placeholder.svg";
              return (
                <div key={product.id}>
                  <Card className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={/^https?:\/\//.test(mainImage) ? mainImage : "/placeholder.svg"}
                        alt={product.name || "Product"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Link href={`/products/${product.slug || product.id}`} className="w-full">
                        <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
                          View Details
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/products")}>
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-16 bg-cream-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest from Our Blog</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends and insights in sustainable packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article: any, idx: number) => {
              // Robust image parsing for articles
              let images: string[] = [];
              const rawImages = article.image_urls;
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
              } else if (article.image_url) {
                images = [article.image_url];
              }
              const mainImage = images[0] || article.image_url || "/placeholder.svg?height=200&width=400";
              return (
                <div key={article.id}>
                  <Card>
                    <CardHeader>
                      <div className="relative h-48 -mx-6 -mt-6 mb-4">
                        <Image
                          src={/^https?:\/\//.test(mainImage) ? mainImage : "/placeholder.svg?height=200&width=400"}
                          alt={article.title || "Article"}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      <CardTitle>{article.title}</CardTitle>
                      <CardDescription>
                        {article.created_at
                          ? new Date(article.created_at).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                          : ""}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{article.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={`/blog/${article.slug}`}
                        className="text-teal-600 hover:underline flex items-center"
                      >
                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
              onClick={() => router.push("/blog")}
            >
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-16 bg-teal-600 text-white">
          <div className="container">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl font-bold mb-4">Ready to Make the Switch to Eco-Friendly Packaging?</h2>
              <p className="text-lg mb-8">Contact our team today to discuss your requirements and get a custom quote.</p>
              <motion.div
                className="flex flex-col sm:flex-row justify-center gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={staggerItem}>
                  <Button size="lg" variant="secondary" onClick={() => router.push("/contact")}>
                    Contact Us
                  </Button>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-black hover:bg-teal-700"
                    onClick={() => router.push("/contact")}
                  >
                    Request a Sample
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}