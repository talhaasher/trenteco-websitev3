import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Factory, Leaf, Recycle } from "lucide-react"
import { getTeamMembers } from "../data/data"

export default async function AboutPage() {
  const teamMembers = await getTeamMembers() ?? [];
  const ourstory=
[                "TrentEco was founded in January 2025 as the specialist paper bag division of Imperial Packaging Solution — a trusted name in fast food packaging in the UK. While our parent company is known for rice bowls, food boxes, and trays, TrentEco focuses exclusively on UK-manufactured kraft paper bags for restaurants and takeaways.",
                "With local production facilities in Sutton Coldfield, we eliminate the need for bulk storage by offering flexible monthly ordering and paper bag bulk orders in the UK with rapid turnaround times."];
const profuction = [
  {
    title: "High-Volume Output:",
    description: "Over 2 million bags per month"
  },
  {
    title: "Custom Printing:",
    description: "High-resolution printing for branded paper bags"
  },
  {
    title: "Quality Control:",
    description: "Each batch is rigorously tested"
  },
  {
    title: "Materials:",
    description: "White and recycled kraft paper options available"
  }
];
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

              {/* Mapping over an array of paragraph texts */}
              {ourstory.map((text, idx) => (
                <p className="text-gray-600 mb-4" key={idx}>
                  {text}
                </p>
              ))}

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
To redefine fast food and custom takeaway packaging in the UK through flexible solutions, UK production, and unmatched customer care.
            </p>
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
                
Our modern facility is equipped to handle large volumes without compromising quality — ideal for businesses looking for where to buy custom takeaway paper bags in the UK.

              </p>

        <ul className="space-y-4">
          {profuction.map((feature, idx) => (
            <li className="flex items-start" key={idx}>
              <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                <span className="font-bold">{feature.title}</span> {feature.description}
              </span>
            </li>
          ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member: any) => (
              <div key={member.id} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name || "Team member"}
                      width={96}
                      height={96}
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-2xl">?</span>
                  )}
                </div>
                <div className="font-bold">{member.name}</div>
                <div className="text-gray-600">{member.role}</div>
              </div>
            ))}
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
