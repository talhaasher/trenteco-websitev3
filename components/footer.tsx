import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-cream-100 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TrentEco</h3>
            <p className="text-sm text-gray-600 mb-4">
              UK-based eco paper bag manufacturing company committed to sustainable packaging solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-600 hover:text-teal-600">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-teal-600">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-teal-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-teal-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products?category=retail" className="text-gray-600 hover:text-teal-600">
                  Retail Bags
                </Link>
              </li>
              <li>
                <Link href="/products?category=food" className="text-gray-600 hover:text-teal-600">
                  Food Packaging
                </Link>
              </li>
              <li>
                <Link href="/products?category=luxury" className="text-gray-600 hover:text-teal-600">
                  Luxury Bags
                </Link>
              </li>
              <li>
                <Link href="/products?category=custom" className="text-gray-600 hover:text-teal-600">
                  Custom Solutions
                </Link>
              </li>
              <li>
                <Link href="/products?category=wholesale" className="text-gray-600 hover:text-teal-600">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-md font-bold mb-4">Contact</h3>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p> Unit 32 Reddicap Trading Estate</p>
              <p>The Royal Town of Sutton Coldfield, \n Birmingham</p>
              <p>B75 7BU, United Kingdom</p>
              <p className="pt-2">
                <a href="tel:+441782123456" className="hover:text-teal-600">
                  +44 7301 028484
                </a>
              </p>
              <p>
                <a href="mailto:info@trenteco.co.uk" className="hover:text-teal-600">
                   info@trenteco.co.uk

                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} TrentEco Ltd. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-600">
            <Link href="/privacy-policy" className="hover:text-teal-600">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-teal-600">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-teal-600">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
