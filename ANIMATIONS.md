# Framer Motion Animations Guide

This document explains how to use the comprehensive animation system implemented across the TrentEco website using Framer Motion.

## 🚀 Quick Start

All animations are automatically applied to pages through the `AnimatedPage` wrapper in the root layout. Each page will have smooth fade-in transitions.

## 📁 Animation Files

### Core Animation Utilities (`lib/animations.ts`)
Contains all reusable animation variants and transitions:
- **Page transitions**: `pageVariants`, `pageTransition`
- **Stagger animations**: `staggerContainer`, `staggerItem`
- **Fade animations**: `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- **Scale animations**: `scaleIn`
- **Hover effects**: `hoverScale`, `hoverLift`
- **Text animations**: `textReveal`
- **Card animations**: `cardAnimation`
- **Button animations**: `buttonAnimation`
- **Hero animations**: `heroAnimation`
- **Icon animations**: `iconAnimation`
- **Scroll-triggered**: `scrollReveal`
- **Loading animations**: `loadingAnimation`

## 🎯 Components

### AnimatedPage
Wraps all pages with smooth transitions:
```tsx
import AnimatedPage from "@/components/AnimatedPage";

export default function MyPage() {
  return (
    <AnimatedPage>
      <div>Your page content</div>
    </AnimatedPage>
  );
}
```

### ScrollReveal
Triggers animations when elements come into view:
```tsx
import ScrollReveal from "@/components/ScrollReveal";

<ScrollReveal>
  <section className="py-16">
    <h2>This will animate when scrolled into view</h2>
  </section>
</ScrollReveal>
```

### AnimatedSection
Simple section animations with different effects:
```tsx
import AnimatedSection from "@/components/AnimatedSection";

<AnimatedSection animation="fadeInLeft" delay={0.2}>
  <div>Content with left-to-right animation</div>
</AnimatedSection>
```

### AnimatedCard
Enhanced cards with hover effects:
```tsx
import { AnimatedCard } from "@/components/ui/animated-card";

<AnimatedCard delay={0.1}>
  <Card>
    <CardContent>Your card content</CardContent>
  </Card>
</AnimatedCard>
```

### AnimatedButton
Buttons with scale and tap animations:
```tsx
import { AnimatedButton } from "@/components/ui/animated-button";

<AnimatedButton variant="default" delay={0.2}>
  Click Me
</AnimatedButton>
```

### AnimatedLoading
Smooth loading spinners:
```tsx
import { AnimatedLoading } from "@/components/ui/animated-loading";

<AnimatedLoading />
```

## 🎨 Usage Examples

### Staggered List Animations
```tsx
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";

<motion.div
  variants={staggerContainer}
  initial="initial"
  animate="animate"
>
  {items.map((item, idx) => (
    <motion.div key={idx} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hero Section with Text Reveal
```tsx
import { motion } from "framer-motion";
import { heroAnimation, textReveal } from "@/lib/animations";

<motion.div variants={heroAnimation} initial="initial" animate="animate">
  <motion.h1 variants={textReveal}>
    Your Hero Title
  </motion.h1>
  <motion.p variants={textReveal}>
    Your hero description
  </motion.p>
</motion.div>
```

### Scroll-Triggered Animations
```tsx
import { motion, useInView } from "framer-motion";
import { scrollReveal } from "@/lib/animations";

const ref = useRef(null);
const isInView = useInView(ref, { threshold: 0.1 });

<motion.div
  ref={ref}
  variants={scrollReveal}
  initial="initial"
  animate={isInView ? "animate" : "initial"}
>
  Content that animates when scrolled into view
</motion.div>
```

## 🎭 Animation Types

### Entrance Animations
- **fadeInUp**: Elements fade in while moving up
- **fadeInDown**: Elements fade in while moving down
- **fadeInLeft**: Elements fade in while moving from left
- **fadeInRight**: Elements fade in while moving from right
- **scaleIn**: Elements fade in while scaling up

### Interactive Animations
- **hoverScale**: Elements scale up on hover
- **hoverLift**: Elements lift up with shadow on hover
- **buttonAnimation**: Complete button interaction states

### Staggered Animations
- **staggerContainer**: Container that controls child timing
- **staggerItem**: Individual items that animate in sequence

### Special Effects
- **iconAnimation**: Icons that rotate and scale in
- **textReveal**: Text that reveals with smooth motion
- **cardAnimation**: Cards with hover lift effects

## ⚡ Performance Tips

1. **Use `useInView`** for scroll-triggered animations to avoid unnecessary renders
2. **Limit stagger delays** to 0.1-0.2 seconds for smooth sequences
3. **Combine animations** using variants for better performance
4. **Use `layout` prop** for layout animations when needed

## 🔧 Customization

### Custom Animation Variants
```tsx
const customAnimation = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};
```

### Custom Transitions
```tsx
const customTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20
};
```

## 📱 Mobile Considerations

- Animations automatically reduce motion on mobile devices
- Use `prefers-reduced-motion` media query for accessibility
- Keep animations subtle on smaller screens

## 🎯 Best Practices

1. **Consistency**: Use the same animation types across similar elements
2. **Timing**: Keep animations between 0.3-0.8 seconds for optimal feel
3. **Easing**: Use `easeOut` for entrance animations, `easeInOut` for interactions
4. **Accessibility**: Respect user motion preferences
5. **Performance**: Avoid animating too many elements simultaneously

## 🚀 Adding New Animations

To add new animations:

1. Add variants to `lib/animations.ts`
2. Create new components if needed
3. Import and use in your components
4. Test on different devices and screen sizes

## 📚 Resources

- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Animation Principles](https://motion.dev/)
- [Performance Best Practices](https://motion.dev/guides/performance)

---

This animation system provides a professional, engaging user experience while maintaining performance and accessibility standards.
