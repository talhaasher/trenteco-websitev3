# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` - Starts Next.js development server
- **Build**: `npm run build` - Builds the application for production
- **Start production**: `npm run start` - Starts the production server
- **Lint**: `npm run lint` - Runs ESLint to check code quality

Quick setup: `npm install & npm run build & npm run dev`

## Project Architecture

This is a **Next.js 15.2.4** application with **TypeScript** built for TrentEco, a UK-based eco paper bag manufacturing company.

### Core Technologies
- **Frontend**: Next.js (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom TrentEco brand colors (cream and teal palettes)
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Animations**: Framer Motion with comprehensive animation system
- **Backend Integration**: Supabase for data and authentication
- **Forms**: React Hook Form with Zod validation

### Key Features
- **Comprehensive Animation System**: All pages use `AnimatedPage` wrapper for smooth transitions
- **Responsive Design**: Mobile-first with sticky navigation and mobile menu
- **Theme Support**: Light theme default with theme provider setup
- **Modern UI**: Complete shadcn/ui component library integration

### Directory Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
  - `/ui` - shadcn/ui components including animated variants
- `/lib` - Utility functions and configurations
  - `animations.ts` - Comprehensive Framer Motion animation variants
  - `utils.ts` - Tailwind utilities (cn function)
  - `/supabase` - Database client and server configurations
- `/public` - Static assets including logo.svg
- `/styles` - Global stylesheets

### Animation System
The project features a sophisticated animation system using Framer Motion:
- **Page Transitions**: Automatic fade-in/out transitions for all pages
- **Component Animations**: AnimatedCard, AnimatedButton, AnimatedLoading components
- **Scroll Animations**: ScrollReveal component for scroll-triggered animations
- **Animation Library**: Comprehensive set of reusable animation variants in `lib/animations.ts`

Refer to `ANIMATIONS.md` for detailed usage examples and best practices.

### Brand Configuration
- **Colors**: Custom cream and teal color palettes defined in `tailwind.config.ts`
- **Typography**: Inter font family
- **Logo**: TrentEco logo at `/logo.svg`

### Next.js Configuration
- ESLint and TypeScript errors ignored during builds for faster development
- Image optimization disabled
- Path aliases configured with `@/` prefix for clean imports

### Component Development
- Follow shadcn/ui patterns for new UI components
- Use Framer Motion animations through the established animation system
- Implement responsive design with Tailwind's mobile-first approach
- Maintain consistency with existing TrentEco brand colors

### Pages
- **Home**: Main landing page
- **About**: Company information
- **Products**: Product catalog with dynamic slug-based routing
- **Blog**: Blog system with dynamic slug-based routing
- **Contact**: Contact page with enquiry form

All pages include loading states and are wrapped with the AnimatedPage component for consistent transitions.