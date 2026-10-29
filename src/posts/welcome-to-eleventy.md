---
title: Welcome to My New Eleventy Website
description: An introduction to this project built with Eleventy v3, Tailwind CSS v4, and daisyUI.
date: 2026-10-29
tags:
  - eleventy
  - webdev
  - tailwindcss
---

Welcome to my new digital space! This site is statically generated using **Eleventy (11ty) v3**, styled with **Tailwind CSS v4**, and accented with **daisyUI** components.

{% alert "info" %}
**Pro tip**: You can use reusable shortcodes directly inside your markdown posts like alerts, badges, buttons, and collapsible accordions!
{% endalert %}

## Why Eleventy?

Eleventy is a simpler static site generator:

1. **Zero Client-Side JavaScript overhead by default**: Fast performance and small footprint.
2. **Flexible Templating**: Mix and match Markdown, Nunjucks, Liquid, and more.
3. **Great Developer Experience**: Fast incremental builds and hot-reloading with Eleventy Dev Server.

### Code Sample

Here is an example of an Eleventy configuration snippet:

```javascript
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    }
  };
};
```

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
> — Antoine de Saint-Exupéry

Feel free to browse around and check out the layout structure!
