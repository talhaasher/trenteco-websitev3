"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Phone, Mail } from "lucide-react";
import {  getFaqs as getFaqsRaw,submitEnquiry } from "@/app/data/data";
import { useCachedFetch } from "@/hooks/useCachedFetch"
import { Send, Clock } from "lucide-react";
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

function getFaqsSafe() {
  return getFaqsRaw().then(res => res ?? [])
}

const iconMap = {
  map: <MapPin className="h-6 w-6 text-teal-600" />,
  phone: <Phone className="h-6 w-6 text-teal-600" />,
  mail: <Mail className="h-6 w-6 text-teal-600" />,
};

export default function ContactPage() {
  const contactDetails = [
  {
    icon: "map", // Use a string or key for the icon
    title: "Visit Us",
    lines: [
      "TrentEco Packaging Ltd",
      "Unit 32 Reddicap Trading Estate, Sutton Coldfield",
      "B75 7BU, Birmingham, UK",
    ],
  },
  {
    icon: "phone",
    title: "Call Us",
    phone: "+44 7301 028484",
    note: "Mon-Fri: 9AM–5PM",
  },
  {
    icon: "mail",
    title: "Email Us",
    emails: [
      "info@trentecopackaging.co.uk",
      
    ],
  },
];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    enquiryType: "",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const { data } = useCachedFetch<any[]>("faqs", getFaqsSafe)
  const faqs = Array.isArray(data) ? data : []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    // Add this validation
    if (!formData.enquiryType) {
      setSubmitMessage("Please select an enquiry type.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitEnquiry({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        enquiry_type: formData.enquiryType,
        message: formData.message,
        newsletter_subscription: formData.newsletter,
      });

      if (result) {
        setSubmitMessage("Thank you for your enquiry! We'll get back to you within 24 hours.");
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          enquiryType: "",
          message: "",
          newsletter: false,
        });
      } else {
        throw new Error("Failed to submit enquiry");
      }
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      setSubmitMessage("Sorry, there was an error submitting your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
              Get in <span className="text-teal-600">Touch</span>
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={textReveal}
            >
              Ready to discuss your eco-friendly packaging needs? We're here to help you find the perfect sustainable
              solution for your business.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Information */}
      <ScrollReveal>
        <section className="py-12 bg-white">
          <div className="container">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {contactDetails.map((detail, idx) => (
                <motion.div key={idx} variants={staggerItem}>
                  <Card className="text-center">
                    <CardHeader>
                      <motion.div 
                        className="mx-auto w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4"
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                      >
                        {iconMap[detail.icon as keyof typeof iconMap]}
                      </motion.div>
                      <CardTitle className="text-lg">{detail.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600">
                        {detail.lines &&
                          detail.lines.map((line, i) => (
                            <div key={i}>{line}</div>
                          ))}
                        {detail.phone && (
                          <>
                            <a href={`tel:${detail.phone}`} className="hover:text-teal-600">
                              {detail.phone}
                            </a>
                            <br />
                            <span className="text-sm">{detail.note}</span>
                          </>
                        )}
                        {detail.emails &&
                          detail.emails.map((email, i) => (
                            <div key={i}>
                              <a href={`mailto:${email}`} className="hover:text-teal-600">
                                {email}
                              </a>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </ScrollReveal>

      {/* Contact Form and Map */}
      <ScrollReveal>
        <section className="py-12 bg-cream-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                variants={fadeInLeft}
                initial="initial"
                animate="animate"
              >
                <Card id="enquiry-form">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitMessage && (
                      <motion.div
                        className={`mb-6 p-4 rounded-lg ${
                          submitMessage.includes("Thank you")
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {submitMessage}
                      </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div variants={staggerItem}>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                            disabled={isSubmitting}
                          />
                        </motion.div>
                        <motion.div variants={staggerItem}>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                            disabled={isSubmitting}
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                      >
                        <motion.div variants={staggerItem}>
                          <Label htmlFor="company">Company Name</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            disabled={isSubmitting}
                          />
                        </motion.div>
                        <motion.div variants={staggerItem}>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            disabled={isSubmitting}
                          />
                        </motion.div>
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <Label htmlFor="enquiry-type">Enquiry Type *</Label>
                        <Select
                          value={formData.enquiryType}
                          onValueChange={(value) => handleInputChange("enquiryType", value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select enquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quote">Request a Quote</SelectItem>
                            <SelectItem value="custom-design">Custom Design</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your requirements, including quantities, sizes, and any specific needs..."
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          rows={5}
                          required
                          disabled={isSubmitting}
                        />
                      </motion.div>

                      <motion.div 
                        className="flex items-center space-x-2"
                        variants={staggerItem}
                      >
                        <Checkbox
                          id="newsletter"
                          checked={formData.newsletter}
                          onCheckedChange={(checked) => handleInputChange("newsletter", checked as boolean)}
                          disabled={isSubmitting}
                        />
                        <Label htmlFor="newsletter" className="text-sm">
                          Subscribe to our newsletter for industry insights and product updates
                        </Label>
                      </motion.div>

                      <motion.div variants={staggerItem}>
                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
                          <Send className="mr-2 h-4 w-4" />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Map and Additional Info */}
              <motion.div 
                className="space-y-6"
                variants={fadeInRight}
                initial="initial"
                animate="animate"
              >
                {/* Map Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Find Our Factory</CardTitle>
                    <CardDescription>Located in Unit 32 Reddicap Trading Estate, Sutton Coldfield</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full rounded-lg overflow-hidden mb-2 bg-gray-100 flex items-center justify-center" style={{ height: 256 }}>
        <a
          href="https://www.google.com/maps/place/32+Reddicap+Trading+Estate,+The+Royal+Town+of+Sutton+Coldfield,+Birmingham,+Sutton+Coldfield+B75+7BU/@52.56113007207206,-1.8109267234149606,15z"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full relative group"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-teal-50 group-hover:bg-teal-100 transition-colors">
            <MapPin className="h-12 w-12 text-teal-600 mb-2" />
            <p className="text-teal-700 font-medium">Click to View on Google Maps</p>
            <p className="text-sm text-gray-600 mt-1">Unit 32 Reddicap Trading Estate</p>
            <p className="text-sm text-gray-600">Sutton Coldfield, B75 7BU</p>
          </div>
        </a>
      </div>
      <p className="text-sm text-gray-400 text-center mb-2">
        Unit 32 Reddicap Trading Estate, Sutton Coldfield, B75 7BU, Birmingham, UK
      </p>
      <a
        href="https://www.google.com/maps?q=Unit+32+Reddicap+Trading+Estate,+Sutton+Coldfield+B75+7BU"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block"
      >
        <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">
          Get Directions
        </Button>
      </a>
                  </CardContent>
                </Card>

                {/* Business Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 5:00 PM</span>
                      </div>

                    </div>
                    <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                      <p className="text-sm text-teal-800">
                        <strong>Factory Tours:</strong> Available by appointment. Contact us to schedule a visit and see
                        our sustainable manufacturing process in action.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Response */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Response Guarantee</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div 
                      className="space-y-3"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      <motion.div 
                        className="flex items-center space-x-3"
                        variants={staggerItem}
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Email enquiries: Within 4 hours</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3"
                        variants={staggerItem}
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Quote requests: Within 24 hours</span>
                      </motion.div>
                      <motion.div 
                        className="flex items-center space-x-3"
                        variants={staggerItem}
                      >
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Sample requests: 2-3 business days</span>
                      </motion.div>

                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* FAQ Section */}
      <ScrollReveal>
        <section className="py-12 bg-white">
          <div className="container">
            <motion.div 
              className="max-w-3xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
              <motion.div 
                className="space-y-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {faqs.length === 0 ? (
                  <p className="text-center text-gray-500">Loading FAQs...</p>
                ) : (
                  faqs.map((faq, idx) => (
                    <motion.div key={idx} variants={staggerItem}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">{faq.question}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-gray-600">
                            {Array.isArray(faq.answer_list) && faq.answer_list.length > 0 ? (
                              <ul className="list-disc pl-5">
                                {faq.answer_list.map((item: string, i: number) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{faq.answer}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </motion.div>
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
                Ready to Get Started?
              </motion.h2>
              <motion.p 
                className="text-lg mb-8"
                variants={staggerItem}
              >
                Join hundreds of businesses who trust TrentEco for their sustainable packaging needs.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                <motion.div variants={staggerItem}>
                  <Button size="lg" variant="secondary">
                    Request a Quote
                  </Button>
                </motion.div>
                <motion.div variants={staggerItem}>
                  <a href="/catalog.pdf" download>
                    <Button size="lg" variant="outline" className="border-white text-black hover:bg-teal-700">
                      Download Catalog
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  )
}
