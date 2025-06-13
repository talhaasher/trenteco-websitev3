import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Factory, Leaf, Recycle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-cream-50 to-cream-100 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About <span className="text-teal-600">TrentEco</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're on a mission to revolutionize packaging with sustainable, eco-friendly paper bags manufactured right
              here in the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="TrentEco factory"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2015 in Stoke-on-Trent, TrentEco began with a simple mission: to provide businesses with
                sustainable packaging alternatives without compromising on quality or aesthetics.
              </p>
              <p className="text-gray-600 mb-4">
                What started as a small operation has grown into one of the UK's leading manufacturers of eco-friendly
                paper bags, serving clients across retail, food service, and luxury sectors.
              </p>
              <p className="text-gray-600">
                Today, we continue to innovate and expand our product range, always staying true to our core values of
                sustainability, quality, and exceptional service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-cream-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At TrentEco, we're committed to creating a more sustainable future through innovative packaging solutions
              that reduce environmental impact without sacrificing functionality or design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-cream-100 p-4 rounded-full inline-flex mb-4">
                <Leaf className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We use responsibly sourced materials and sustainable manufacturing processes to minimize our
                environmental footprint.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-cream-100 p-4 rounded-full inline-flex mb-4">
                <Factory className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">UK Manufacturing</h3>
              <p className="text-gray-600">
                By manufacturing in the UK, we support local jobs, reduce transportation emissions, and ensure the
                highest quality standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-cream-100 p-4 rounded-full inline-flex mb-4">
                <Recycle className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously research and develop new materials and techniques to improve the sustainability and
                performance of our products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Capabilities */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Production Capabilities</h2>
              <p className="text-gray-600 mb-6">
                Our state-of-the-art manufacturing facility in Stoke-on-Trent is equipped with the latest technology to
                produce high-quality paper bags at scale.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">High-Volume Production:</span> Capacity to produce over 1 million bags
                    per month
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">Custom Printing:</span> Advanced printing capabilities for high-quality
                    branding
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">Diverse Sizes:</span> From small jewelry bags to large shopping bags
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">Quality Control:</span> Rigorous testing to ensure durability and
                    consistency
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-bold">Sustainable Materials:</span> FSC-certified papers and water-based inks
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="TrentEco production facility"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-cream-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600">
              Meet the passionate individuals behind TrentEco who are dedicated to creating sustainable packaging
              solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src="/images/team-sarah.png" alt="Sarah Johnson" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Sarah Johnson</h3>
              <p className="text-teal-600">CEO & Founder</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src="/images/team-david.png" alt="David Chen" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">David Chen</h3>
              <p className="text-teal-600">Head of Production</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=300" alt="Emma Williams" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">Emma Williams</h3>
              <p className="text-teal-600">Sustainability Director</p>
            </div>

            <div className="text-center">
              <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                <Image src="/placeholder.svg?height=300&width=300" alt="James Taylor" fill className="object-cover" />
              </div>
              <h3 className="text-xl font-bold">James Taylor</h3>
              <p className="text-teal-600">Design Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Sustainability Journey</h2>
            <p className="text-lg mb-8">
              Partner with TrentEco for eco-friendly packaging solutions that align with your brand values.
            </p>
            <Button size="lg" variant="secondary">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
