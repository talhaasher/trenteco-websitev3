"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Tag, ShoppingCart } from "lucide-react";
import { getProductData } from "../../data/data";

export default function ProductSlugPage({ params }: { params: { slug: string } }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const slug = params?.slug;

  useEffect(() => {
    getProductData().then((data) => {
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, []);

  const product = products.find((p: any) => p.slug === slug || String(p.id) === slug) || null;
  const relatedProducts = product
    ? products.filter((p: any) => p.id !== product.id && p.category && product.category && p.category === product.category).slice(0, 3)
    : [];

  if (loading) return <div>Loading...</div>;
  if (!product) return (
    <div className="flex flex-col min-h-screen">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been moved.</p>
          <Link href="/products">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <article className="flex-1 flex items-center justify-center">
        <div className="container-fluid py-12 px-0">
          <div className="w-full max-w-none">
            {/* Back Button */}
            <Link href="/products" className="inline-flex items-center text-teal-600 hover:text-teal-700 mb-8 ml-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-center">{product.name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-center w-full px-8">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-4 justify-center items-center w-full">
                {(product.images || [product.image_url]).slice(0, 4).map((img: string, idx: number) => (
                  <button
                    key={idx}
                    className={`border rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-teal-600 ${selectedIdx === idx ? 'ring-2 ring-teal-600' : ''}`}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    <Image src={img || "/placeholder.svg"} alt={product.name + ' thumbnail'} width={100} height={100} className="object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image */}
              <div className="flex justify-center items-center w-full">
                <Image
                  src={(product.images && product.images[selectedIdx]) || product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="rounded-lg object-contain max-h-[32rem] w-full bg-gray-50"
                  priority
                />
              </div>
              {/* Details */}
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Description</h2>
                  <p className="text-gray-700 mb-4">{product.description}</p>
                  <ul className="mb-4 space-y-1">
                    {product.size && <li><b>Size:</b> {product.size}</li>}
                    {product.material && <li><b>Material:</b> {product.material}</li>}
                    {product.price && <li><b>Price:</b> £{product.price.toFixed(2)}</li>}
                    {product.stock_quantity !== undefined && <li><b>Stock:</b> {product.stock_quantity}</li>}
                    {product.sku && <li><b>SKU:</b> {product.sku}</li>}
                  </ul>
                </div>
                <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-4" size="lg">
                  Request a Sample
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-cream-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((related: any) => (
                  <Card key={related.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={related.image_url || "/placeholder.svg"}
                        alt={related.name || "Related product image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg line-clamp-2">{related.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm line-clamp-3">{related.description}</p>
                      <Link href={`/products/${related.slug || related.id}`} className="mt-4 inline-block">
                        <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                          View Details
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
    </div>
  );
}
