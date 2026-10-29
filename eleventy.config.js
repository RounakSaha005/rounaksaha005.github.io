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

  // Reusable Component Shortcodes using official daisyUI components
  eleventyConfig.addPairedShortcode('alert', (content, type = 'info', style = 'soft') => {
    const iconMap = {
      info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
      success: '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    };
    const icon = iconMap[type] || iconMap.info;
    const styleClass = style ? `alert-${style}` : 'alert-soft';
    return `<div role="alert" class="alert alert-${type} ${styleClass} my-4">
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

  return {
    dir: { input: 'src', output: 'dist' },
  };
}
