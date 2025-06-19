"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import CartSidebar from "./cart-sidebar"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.svg" alt="TrentEco Logo" width={40} height={40} className="h-10 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">
            About
          </Link>
          <Link href="/products" className="text-sm font-medium hover:text-teal-600 transition-colors">
            Products
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-teal-600 transition-colors">
            Blog
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-teal-600 transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
        
          <Button className="bg-teal-600 hover:bg-teal-700">Request Quote</Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
          <div className="container py-4 flex flex-col gap-4">
            <Link href="/" className="px-4 py-2 hover:bg-cream-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 hover:bg-cream-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/products"
              className="px-4 py-2 hover:bg-cream-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link href="/blog" className="px-4 py-2 hover:bg-cream-100 rounded-md" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 hover:bg-cream-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Button className="bg-teal-600 hover:bg-teal-700 w-full">Request Quote</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
