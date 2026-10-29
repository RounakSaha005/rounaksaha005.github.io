---
layout: project.njk
title: AuraUI Component Toolkit
description: An accessible, themeable UI component toolkit built with modern CSS, Tailwind, and Web Components.
role: Creator & Core Maintainer
timeline: 2025 — 2026
year: 2026
tags:
  - TypeScript
  - Tailwind CSS
  - Web Components
link: https://example.com/auraui
github: https://github.com/rounaksaha/auraui
permalink: /projects/auraui/index.html
---

## Context

Modern design systems frequently suffer from framework lock-in. Engineering teams migrating between React, Vue, Svelte, or vanilla server-rendered HTML frameworks typically spend months re-implementing identical buttons, dialogs, and navigation primitives.

AuraUI was architected to eliminate this fragmentation by delivering standard Web Components with seamless Tailwind CSS integration and zero runtime dependencies.

## Problem and opportunity

Before AuraUI, component implementations faced severe hurdles:

1. **Hydration Lag**: Heavy JavaScript bundles caused high First Input Delay (FID) on content-heavy pages.
2. **Accessibility Gaps**: Complex widgets like multi-comboboxes and dialogs frequently missed essential ARIA roles and keyboard management.
3. **Styling Clashes**: Shadow DOM boundaries made it difficult to apply utility-first CSS frameworks like Tailwind without messy CSS adoptable stylesheets.

## Goal

- **Framework Agnostic**: Run uniformly across Astro, Next.js, Nuxt, Eleventy, and plain HTML.
- **Micro Bundle Footprint**: Under **2.5kB gzipped** per core component.
- **100% WCAG 2.2 AA Compliance**: Built-in screen reader announcements, focus traps, and keyboard navigation.

## Scope

The initial v1 release encompassed 24 core primitives:

- Modals, Drawers, and Popovers with standard HTML `<dialog>` polyfills.
- Data tables with sorting, sticky headers, and accessible ARIA attributes.
- Dynamic theme switching powered by CSS Custom Properties and OKLCH color palettes.

## Architecture

AuraUI utilizes native Custom Elements with light-DOM attachment option:

```typescript
import { AuraButton } from '@auraui/core';

// Registers custom element with automated accessible focus delegation
customElements.define('aura-button', AuraButton);
```

By allowing light-DOM mode, developers can style every component using standard Tailwind utility classes directly in their JSX, Nunjucks, or HTML files without needing shadow root hacks.

## Benchmarks

Benchmarked against popular component libraries:

- **Initial Load Time**: 4.2x faster cold start than conventional React UI libraries.
- **Memory Footprint**: Less than 1.4MB allocated on 500 simultaneous rendered interactive elements.
- **Build Times**: Instantaneous tree-shaking with ES modules.

## Conclusion

AuraUI has been deployed across 14 production websites, achieving over 18,000 monthly downloads and serving millions of accessible user interactions every month.
