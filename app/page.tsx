"use client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Leaf, Package, Recycle, TrendingUp } from "lucide-react"
import ProductSuggestions from "@/components/product-suggestions"
import { productData,features,articles } from './data/data';

export default function Home() {
  const router = useRouter()
  const iconMap = {
  Leaf,
  Package,
  TrendingUp,
  Recycle,
};

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
            <source src="/videos/vid1.mp4" type="video/mp4" />
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
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white drop-shadow-lg">
Eco-Friendly Bags That Deliver — Fast, Custom & UK-Made for Food and Retail Businesses</h1>
            <p className="text-lg text-cream-100 mb-8 drop-shadow">
Smart, sustainable packaging solutions — proudly manufactured in the UK and tailored to your business. </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 shadow-lg"
                onClick={() => router.push("/products")}
              >
                View Products
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-teal-600 shadow-lg backdrop-blur-sm"
                onClick={() => router.push("/contact")}
              >
                Request a Quote
              </Button>
            </div>
          </div>
          {/* <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Eco-friendly paper bags"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TrentEco - A Leading UK Paper Bag Manufacturer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
At TrentEco, we deliver fast food packaging in the UK that combines speed, quality, and customisation with the convenience of UK-based production. As a trusted name in sustainable packaging in the UK, our eco-conscious approach ensures that your packaging supports both your brand and the planet.            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="bg-cream-100 p-4 rounded-full mb-4">
                  {feature.icon}
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
            {productData.slice(0, 3).map((product) => (
              <Card className="overflow-hidden" key={product.id}>
                <div className="relative h-48">
                  <Image
                    src={product.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                    onClick={() => router.push("/products")}
                  >
                    View Collection
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => router.push("/products")}>
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container">
          <ProductSuggestions title="Featured Products" limit={3} />
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
      {articles.slice(0, 3).map((article) => (
        <Card key={article.id}>
          <CardHeader>
            <div className="relative h-48 -mx-6 -mt-6 mb-4">
              <Image
                src={article.image_url || "/placeholder.svg?height=200&width=400"}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardTitle>{article.title}</CardTitle>
            <CardDescription>
              {/* Format date if needed */}
              {new Date(article.created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
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
      ))}
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
      <section className="py-16 bg-teal-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Make the Switch to Eco-Friendly Packaging?</h2>
            <p className="text-lg mb-8">Contact our team today to discuss your requirements and get a custom quote.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" onClick={() => router.push("/contact")}>
                Contact Us
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-teal-700"
                onClick={() => router.push("/contact")}
              >
                Request a Sample
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
