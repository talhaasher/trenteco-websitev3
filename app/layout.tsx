import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedPage from "@/components/AnimatedPage"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TrentEco - UK-Made, Eco-Smart Bags",
  description: "UK-based eco paper bag manufacturing company",
  generator: 'v0.dev',
  icons: {
    icon: "/logo.svg"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html
        lang="en"
        className="light"
        suppressHydrationWarning
      >
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">
                <AnimatedPage>
                  {children}
                </AnimatedPage>
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>

  )
}
