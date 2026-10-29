# 11ty + Tailwind CSS v4 + daisyUI + Pages CMS

A modern, high-performance static website built with **Eleventy (11ty) v3**, **Tailwind CSS v4**, **daisyUI v5**, and configured for **Pages CMS** (Git-based content & media management).

---

## 📁 Layout & Directory Structure

```text
├── .gitignore
├── .pages.yml                  # Pages CMS admin configuration & media upload paths
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions build & GitHub Pages deploy workflow
├── eleventy.config.js          # ESM Eleventy v3 configuration + PostCSS hook + passthrough
├── package.json                # "type": "module"
├── postcss.config.js           # PostCSS config for Tailwind v4 IntelliSense
├── README.md
└── src/
    ├── _data/
    │   └── site.json           # Global site metadata (editable in Pages CMS)
    ├── _includes/
    │   ├── base.njk            # Master layout (HTML shell, navbar, main container, footer)
    │   ├── page.njk            # Content layout (extends base.njk for standard pages)
    │   ├── post.njk            # Article layout (extends base.njk with image & typography)
    │   └── components/         # Reusable template partials & macros
    │       ├── macros.njk      # Reusable daisyUI macros (card, badge, button, alert, stat, collapse, hero)
    │       ├── post-card.njk   # Reusable blog article card component
    │       ├── newsletter.njk  # Reusable newsletter subscription banner
    │       ├── head.njk        # SEO, OpenGraph/Twitter cards, theme script, CSS link
    │       ├── navbar.njk      # Responsive daisyUI navbar with light/dark theme toggle
    │       └── footer.njk      # Footer with dynamic year and social links
    ├── assets/
    │   └── images/             # Upload target for Pages CMS media manager & image fields
    ├── pages/
    │   ├── pages.json          # Sets layout: page.njk for all static pages
    │   └── about.md            # About page (editable in Pages CMS)
    ├── posts/
    │   ├── posts.json          # Sets layout: post.njk and tags: ["posts"]
    │   ├── index.njk           # Blog index listing page (/posts/)
    │   └── welcome-to-eleventy.md # Example markdown post (editable in Pages CMS)
    ├── styles/
    │   └── index.css           # Tailwind v4, Typography, and daisyUI imports
    └── index.njk               # Homepage (/)
```

---

## 🧩 Reusable Components Library

The project includes pre-built **daisyUI 5** components usable in two ways:

### 1. Nunjucks Macros (In `.njk` templates)
Import from `components/macros.njk`:
```jinja2
{% from "components/macros.njk" import card, badge, button, alert, stat, collapse, hero %}

{{ card({
  title: "Card Title",
  description: "Description text",
  badge: "Featured",
  href: "/about/"
}) }}
```

### 2. Shortcodes (Directly inside `.md` Markdown files & Pages CMS)
- **Alerts**: `{% alert "info" %}Helpful note text{% endalert %}`
- **Badges**: `{% badge "New", "primary", "soft" %}`
- **Buttons**: `{% btn "Read Article", "/posts/", "primary" %}`
- **Accordions**: `{% collapse "FAQ question" %}Answer details here{% endcollapse %}`

### 3. Reusable Partials
- `{% include "components/post-card.njk" %}` — Blog post card (expects `post` in loop).
- `{% include "components/newsletter.njk" %}` — Newsletter / Call-to-action banner.

Explore the live showcase at `/components/` (`src/pages/components.md`).

---

## 🖼️ Pages CMS Media & Image Uploads

When you connect your repository to [Pages CMS](https://pagescms.org/):

1. **Media Library**:
   - Access the **Media** tab in the Pages CMS admin dashboard.
   - Any uploaded file is saved to repository path `src/assets/images/` and served at public URL `/assets/images/`.
2. **Post Cover Images (`type: image`)**:
   - Each blog post has a **Featured Image** upload field that embeds the cover in the article and Open Graph / Twitter share cards.
3. **In-Body Rich Text Images**:
   - The WYSIWYG editor allows inserting uploaded images directly into the post/page Markdown body.
4. **Site Avatar / Logo**:
   - Editable under **Site Settings** (`src/_data/site.json`).
5. **Eleventy Passthrough**:
   - `eleventy.config.js` automatically copies `src/assets` to `dist/assets` during build and watches for new uploads.

---

## 🚀 Getting Started

### Development
Start the Eleventy development server with hot-reloading:
```bash
npm run dev
```
Open your browser at `http://localhost:8080`.

### Production Build
Build compiled HTML and Tailwind CSS into `dist/`:
```bash
npm run build
```

---

## 🚢 Continuous Deployment (GitHub Actions)

A workflow is configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
- **Pull Requests**: Automatically runs `npm ci` and `npm run build` to verify builds succeed before merging.
- **Push to `main`**: Builds the static files into `dist/` and deploys them to **GitHub Pages**.

> **Note**: To enable deployment on GitHub, go to your repository's **Settings** → **Pages** → under **Build and deployment / Source**, select **GitHub Actions**.
