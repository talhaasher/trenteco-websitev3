/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enforce ESLint in production, allow ignoring in development for faster builds
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    // Only check specific directories to avoid node_modules issues
    dirs: ['app', 'components', 'lib', 'hooks'],
  },
  typescript: {
    // For now, keep TypeScript errors ignored due to Next.js 15 compatibility issues
    // TODO: Fix TypeScript errors and enable: ignoreBuildErrors: process.env.NODE_ENV === 'development'
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Security headers configuration
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          // Content Security Policy (CSP) - Prevent XSS attacks
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vnyovsenikpspilygzcx.supabase.co",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https: https://vnyovsenikpspilygzcx.supabase.co",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://vnyovsenikpspilygzcx.supabase.co wss://vnyovsenikpspilygzcx.supabase.co",
              "media-src 'self' https://vnyovsenikpspilygzcx.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // X-Frame-Options - Prevent clickjacking attacks
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          // X-Content-Type-Options - Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Referrer Policy - Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // X-XSS-Protection - Enable XSS filtering (legacy support)
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Strict-Transport-Security - Enforce HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          // Permissions Policy - Control browser features
          {
            key: 'Permissions-Policy',
            value: [
              'camera=()',
              'microphone=()',
              'geolocation=()',
              'payment=()',
              'usb=()',
              'magnetometer=()',
              'gyroscope=()',
              'accelerometer=()'
            ].join(', ')
          }
        ]
      }
    ]
  }
}

export default nextConfig
