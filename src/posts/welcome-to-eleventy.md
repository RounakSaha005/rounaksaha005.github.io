---
title: Welcome to My New Digital Space
description: Architectural notes on building a minimal, high-performance
  developer portfolio with Eleventy v3, Tailwind CSS v4, and daisyUI.
date: 2026-10-29
image: /assets/images/20260120125709.jpg
tags:
  - eleventy
  - webdev
  - tailwindcss
  - architecture
---
Welcome to my new digital space! This site is statically generated using **Eleventy (11ty) v3**, styled with **Tailwind CSS v4**, and accented with **daisyUI** components.

## Context

As a developer and creator, my portfolio needs to reflect the same care, performance, and attention to detail that I put into production software. Many modern developer portfolios suffer from excessive client-side JavaScript, slow hydration times, and visual clutter.

My goal with this rebuild was to adopt a craftsmanship approach: clean editorial layout, clear architectural dotted gridlines, soft eye-friendly themes, and instant sub-second page delivery.

![Static Site Generation Pipeline Architecture with Eleventy v3 and Tailwind CSS v4](/assets/images/eleventy-architecture.svg)

Fig 01 // Pipeline flow: Markdown sources compiled by Eleventy v3 + PostCSS into pure static HTML in under 0.8 seconds.

## Architecture and Stack

The technical architecture is intentionally lightweight:

1. **Eleventy v3 Engine**: Generates pure static HTML with zero client-side JavaScript required for reading.
2. **Tailwind CSS v4**: Utilizes the modern CSS engine with OKLCH color palettes and dynamic `@theme` variables.
3. **daisyUI 5 Integration**: Provides semantic tokens and accessible UI primitives without framework lock-in.
4. **GSAP**: Drives fluid, hardware-accelerated marquee interactions for the tech stack track.

## Typography and Visual Design

Every visual element is designed for legibility and aesthetic balance:

- **Mona Sans**: Used for primary headlines and section titles, providing strong structural presence.
- **Archivo**: Used for editorial body copy, delivering crisp and modern typographic clarity across devices.
- **Geist Mono**: Applied to navigation links, action buttons, metadata chips, and code snippets for technical clarity.
- **Dotted Blueprint Rules**: All structural boundaries use 1px dotted lines (`border-dotted`), providing subtle architectural framing.

## Code Samples & Build Pipeline

Here is the PostCSS and Tailwind compilation hook configured in `eleventy.config.js`:

```javascript
// eleventy.config.js
export default function (eleventyConfig) {
  // Watch CSS directories for hot reloading
  eleventyConfig.addWatchTarget('./src/styles/');
  
  // Compile Tailwind CSS v4 via PostCSS before Eleventy builds
  eleventyConfig.on('eleventy.before', async () => {
    const css = fs.readFileSync('./src/styles/index.css', 'utf8');
    const result = await postcss([tailwindcss()]).process(css, {
      from: './src/styles/index.css',
      to: './dist/styles/index.css',
    });
    fs.writeFileSync('./dist/styles/index.css', result.css);
  });
  
  return { dir: { input: 'src', output: 'dist' } };
}
```

Terminal commands to run local development with live reloading and compile optimized production distributions:

```bash
# Start local development server with hot reload
npm run dev

# Compile static HTML and optimized CSS distribution
npm run build
```

The architectural CSS styles providing the dotted blueprint theme:

```css
/* Custom dotted blueprint styling */
.blueprint-card {
  border: 1px dotted var(--color-base-300);
  background-color: var(--color-base-100);
  border-radius: var(--radius-box, 0.75rem);
  transition: border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Performance Benchmarks

Building with static primitives yields remarkable performance characteristics:

![Google Lighthouse 100/100 Audit Scores across Performance, Accessibility, Best Practices, and SEO](/assets/images/lighthouse-score.svg)

Fig 02 // Production audit: Flawless 100/100 across all 4 Lighthouse audit categories with 0.2s First Contentful Paint.

- **First Contentful Paint (FCP)**: < 0.2s on mobile networks.
- **Cumulative Layout Shift (CLS)**: Exactly 0.000 across all viewports.
- **Build Time**: Compiles all 12+ pages and CSS assets in under **0.8 seconds**.

## Conclusion

By prioritizing semantic HTML, minimal CSS, and thoughtful typography, we achieve an experience that feels fast, timeless, and delightful to explore.