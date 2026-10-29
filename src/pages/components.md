---
title: daisyUI 5 Components Showcase
subtitle: A live preview of the daisyUI 5 component library styled across the 4 selectable themes.
permalink: /components/index.html
---

This project strictly utilizes the **daisyUI 5 component library**. All components automatically adapt their colors, borders, and typography to whichever of the 4 themes (**Ocean Sun**, **Electric Pop**, **Midnight Indigo**, or **Slate Mint**) is selected.

---

## 1. Alerts (`alert`)

Use the daisyUI `alert` component to give users feedback on operations or state.

{% alert "info", "soft" %}
**Info**: Here is an informational tip or message.
{% endalert %}

{% alert "success", "soft" %}
**Success**: Your action or operation completed successfully!
{% endalert %}

{% alert "warning", "soft" %}
**Warning**: Please be aware of this potential issue before continuing.
{% endalert %}

{% alert "error", "soft" %}
**Error**: Something went wrong. Please check your configuration.
{% endalert %}

---

## 2. Badges (`badge`)

Use the daisyUI `badge` component to highlight tags, categories, or status.

<div class="flex flex-wrap gap-2 my-4 items-center">
  {% badge "Primary", "primary", "soft" %}
  {% badge "Secondary", "secondary", "soft" %}
  {% badge "Accent", "accent", "soft" %}
  {% badge "Outline", "primary", "outline" %}
</div>

---

## 3. Buttons (`btn`)

Use the daisyUI `btn` component for calls-to-action and interactive elements.

<div class="flex flex-wrap gap-3 my-4 items-center">
  {% btn "Primary Button", "#", "primary" %}
  {% btn "Secondary Button", "#", "secondary" %}
  {% btn "Accent Button", "#", "accent" %}
  {% btn "Outline Button", "#", "primary", "outline" %}
</div>

---

## 4. Accordions & Collapses (`collapse`)

Use the daisyUI `collapse collapse-arrow` component for expandable disclosures and FAQs.

{% collapse "How do I switch themes?" %}
Click the theme toggle button in the top navbar to seamlessly switch between Light and Dark mode. The change is instant with zero reload and stored in localStorage.
{% endcollapse %}

{% collapse "How does daisyUI 5 theming work?" %}
Themes are defined natively using `@plugin "daisyui/theme"` in the CSS file. Every daisyUI component (`btn`, `card`, `navbar`, `alert`, `select`) automatically inherits semantic colors.
{% endcollapse %}

---

## 5. Cards (`card`)

In any `.njk` file, use the daisyUI `card` macro:

```jinja2
{% raw %}{% from "components/macros.njk" import card %}

{{ card({
  title: "daisyUI Card Component",
  description: "A clean, responsive card with image figure, title, body text, and actions.",
  badge: "Featured",
  href: "/about/"
}) }}{% endraw %}
```

---

## 6. Newsletter / CTA Banner

{% include "components/newsletter.njk" %}
