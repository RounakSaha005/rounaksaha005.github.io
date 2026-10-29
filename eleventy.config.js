import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

export default function (eleventyConfig) {
  // Watch CSS and assets directory for changes
  eleventyConfig.addWatchTarget('./src/styles/');
  eleventyConfig.addWatchTarget('./src/assets/');

  // Passthrough copy for media uploads and static assets
  eleventyConfig.addPassthroughCopy({ './src/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ './me.jpeg': 'me.jpeg' });
  eleventyConfig.addPassthroughCopy({ './node_modules/@phosphor-icons/web/src/regular': 'assets/phosphor' });
  eleventyConfig.addPassthroughCopy({ './node_modules/gsap/dist/gsap.min.js': 'assets/js/gsap.min.js' });

  // PostCSS compilation hook before Eleventy builds
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/styles/index.css');
    const tailwindOutputPath = './dist/styles/index.css';
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    const outputDir = path.dirname(tailwindOutputPath);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await postcss([tailwindcss()]).process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  // Shortcode for dynamic copyright year
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Reusable Component Shortcodes using official daisyUI components and Phosphor Icons
  eleventyConfig.addPairedShortcode('alert', (content, type = 'info', style = 'soft') => {
    const iconMap = {
      info: '<i class="ph ph-info shrink-0 text-xl"></i>',
      success: '<i class="ph ph-check-circle shrink-0 text-xl"></i>',
      warning: '<i class="ph ph-warning shrink-0 text-xl"></i>',
      error: '<i class="ph ph-warning-octagon shrink-0 text-xl"></i>',
    };
    const icon = iconMap[type] || iconMap.info;
    const styleClass = style ? `alert-${style}` : 'alert-soft';
    return `<div role="alert" class="alert alert-${type} ${styleClass} my-4 flex items-start gap-3">
      ${icon}
      <div>${content.trim()}</div>
    </div>`;
  });

  eleventyConfig.addShortcode('badge', (text, color = 'primary', style = 'soft') => {
    return `<span class="badge badge-${color} badge-${style} font-medium">${text}</span>`;
  });

  eleventyConfig.addShortcode('btn', (text, href = '#', color = 'primary', style = '') => {
    const styleClass = style ? `btn-${style}` : '';
    return `<a href="${href}" class="btn btn-${color} ${styleClass} btn-sm">${text}</a>`;
  });

  eleventyConfig.addPairedShortcode('collapse', (content, title = 'Details') => {
    return `<details class="collapse collapse-arrow bg-base-200 border border-base-300 my-3">
      <summary class="collapse-title font-semibold text-base py-4 px-6">${title}</summary>
      <div class="collapse-content px-6 pb-4 text-sm opacity-80 leading-relaxed">${content.trim()}</div>
    </details>`;
  });

  // Date filters using native JavaScript Intl
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    const d = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(d);
  });

  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    const d = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
    return d.toISOString().split('T')[0];
  });

  eleventyConfig.addFilter('limit', (array, count) => {
    if (!Array.isArray(array)) return [];
    return array.slice(0, count);
  });

  eleventyConfig.addFilter('filterTagList', (tags) => {
    return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1);
  });

  // SEO & Feed Filters
  eleventyConfig.addFilter('absoluteUrl', (url, base) => {
    if (!url) return base || '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const cleanBase = (base || '').replace(/\/+$/, '');
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${cleanBase}${cleanUrl}`;
  });

  eleventyConfig.addFilter('isoDateString', (dateObj) => {
    if (!dateObj) return new Date().toISOString();
    const d = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  });

  eleventyConfig.addFilter('xmlEscape', (str) => {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  });

  return {
    dir: { input: 'src', output: 'dist' },
  };
}
