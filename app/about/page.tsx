"use client"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { getTeamMembers as getTeamMembersRaw } from "../data/data"
import { useCachedFetch } from "@/hooks/useCachedFetch"
import Link from "next/link"
import ScrollReveal from "@/components/ScrollReveal"
import { 
  fadeInUp, 
  fadeInLeft, 
  fadeInRight, 
  staggerContainer, 
  staggerItem, 
  textReveal,
  scaleIn 
} from "@/lib/animations"

function getTeamMembersSafe() {
  return getTeamMembersRaw().then(res => res ?? [])
}

export default function AboutPage() {
  const { data } = useCachedFetch<any[]>("team_members", getTeamMembersSafe)
  const teamMembers = Array.isArray(data) ? data : []
  const ourstory = [
    "TrentEco was founded in January 2025 as the specialist paper bag division of Imperial Packaging Solution — a trusted name in fast food packaging in the UK. While our parent company is known for rice bowls, food boxes, and trays, TrentEco focuses exclusively on UK-manufactured kraft paper bags for restaurants and takeaways.",
    "With local production facilities in Sutton Coldfield, we eliminate the need for bulk storage by offering flexible monthly ordering and paper bag bulk orders in the UK with rapid turnaround times."
  ];
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
  // Helper to get public URL for Supabase storage images
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const getImageUrl = (path: string) =>
    path?.startsWith("http") ? path : `${supabaseUrl}/storage/v1/object/public/team/${path}`;

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
              About <span className="text-teal-600">TrentEco</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={textReveal}
            >
              We're on a mission to revolutionize packaging with sustainable, eco-friendly paper bags manufactured right
              here in the UK.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story */}
      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="relative h-[400px]"
                variants={fadeInLeft}
                initial="initial"
                animate="animate"
              >
                <Image
                  src="/images/story.jpg"
                  alt="TrentEco factory"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.h2 
                  className="text-3xl font-bold mb-6"
                  variants={fadeInUp}
                >
                  Our Story
                </motion.h2>
                {/* Mapping over an array of paragraph texts */}
                {ourstory.map((text, idx) => (
                  <motion.p 
                    className="text-gray-600 mb-4" 
                    key={idx}
                    variants={staggerItem}
                  >
                    {text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Our Mission */}
      <ScrollReveal>
        <section className="py-16 bg-cream-50">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To redefine fast food and custom takeaway packaging in the UK through flexible solutions, UK production, and unmatched customer care.
              </p>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Production Capabilities */}
      <ScrollReveal>
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.h2 
                  className="text-3xl font-bold mb-6"
                  variants={fadeInUp}
                >
                  Production Capabilities
                </motion.h2>
                <motion.p 
                  className="text-gray-600 mb-6"
                  variants={staggerItem}
                >
                  Our modern facility is equipped to handle large volumes without compromising quality — ideal for businesses looking for where to buy custom takeaway paper bags in the UK.
                </motion.p>
                <motion.ul 
                  className="space-y-4"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {profuction.map((feature, idx) => (
                    <motion.li 
                      className="flex items-start" 
                      key={idx}
                      variants={staggerItem}
                    >
                      <CheckCircle className="h-6 w-6 text-teal-600 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        <span className="font-bold">{feature.title}</span> {feature.description}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
              <motion.div 
                className="relative h-[400px]"
                variants={fadeInRight}
                initial="initial"
                animate="animate"
              >
                <Image
                  src="/images/production.jpg"
                  alt="TrentEco production facility"
                  fill
                  className="object-cover rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Our Team */}
      <ScrollReveal>
        <section className="py-16 bg-cream-50 flex justify-center items-center">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-gray-600">
                Meet the passionate individuals behind TrentEco who are dedicated to creating sustainable packaging
                solutions.
              </p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 place-items-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {teamMembers.map((member: any, idx: number) => (
                <motion.div 
                  key={member.id} 
                  className="flex flex-col items-center text-center"
                  variants={staggerItem}
                >
                  {/* <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden"> */}
                    {/* {member.image ? (
                      <Image
                        src={getImageUrl(member.image)}
                        alt={member.name || "Team member"}
                        width={96}
                        height={96}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-2xl">?</span>
                    )} */}
                  {/* </div> */}
                  <div className="font-bold">
                      {member.name}
                    
                  </div>
                  <div className="text-gray-600">{member.role}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal>
        <section className="py-16 bg-teal-600 text-white">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h2 
                className="text-3xl font-bold mb-4"
                variants={fadeInUp}
              >
                Join Our Sustainability Journey
              </motion.h2>
              <motion.p 
                className="text-lg mb-8"
                variants={staggerItem}
              >
                Partner with TrentEco for eco-friendly packaging solutions that align with your brand values.
              </motion.p>
              <motion.div variants={staggerItem}>
                <Link href="/contact">
                  <Button size="lg" variant="secondary">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
