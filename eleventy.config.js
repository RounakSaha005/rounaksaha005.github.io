import fs from 'fs';
import path from 'path';
import https from 'https';
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

    // Auto-resolve YouTube Channel ID & Initial Subscribers from Channel Link
    try {
      const sitePath = path.resolve('./src/_data/site.json');
      if (fs.existsSync(sitePath)) {
        const siteData = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
        const yt = siteData.youtubeChannel;
        if (yt && yt.url && (!yt.channelId || !yt.subscribers)) {
          const directMatch = yt.url.match(/UC[\w-]{21,23}/);
          if (directMatch) {
            yt.channelId = directMatch[0];
            fs.writeFileSync(sitePath, JSON.stringify(siteData, null, 2), 'utf8');
          } else {
            const resolved = await new Promise((resolve) => {
              const req = https.get(yt.url, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                timeout: 3000
              }, (r) => {
                let d = '';
                r.on('data', c => {
                  d += c;
                  const mId = d.match(/externalId["\s:]+(UC[\w-]+)/);
                  const mSub = d.match(/"content":"([0-9\.]+[KMBkmb]?\s+subscribers?)"/);
                  if (mId && mSub) {
                    r.destroy();
                    resolve({ id: mId[1], subs: mSub[1] });
                  }
                });
                r.on('end', () => {
                  const mId = d.match(/externalId["\s:]+(UC[\w-]+)/);
                  const mSub = d.match(/"content":"([0-9\.]+[KMBkmb]?\s+subscribers?)"/);
                  resolve({ id: mId ? mId[1] : null, subs: mSub ? mSub[1] : null });
                });
              });
              req.on('error', () => resolve({ id: null, subs: null }));
              req.on('timeout', () => { req.destroy(); resolve({ id: null, subs: null }); });
            });

            let changed = false;
            if (resolved.id && !yt.channelId) {
              yt.channelId = resolved.id;
              changed = true;
            }
            if (resolved.subs && (!yt.subscribers || yt.subscribers === '45K+')) {
              yt.subscribers = resolved.subs;
              changed = true;
            }
            if (changed) {
              fs.writeFileSync(sitePath, JSON.stringify(siteData, null, 2), 'utf8');
            }
          }
        }
      }
    } catch (_) {}
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
    return (tags || []).filter(tag => ['all', 'nav', 'post', 'posts', 'project', 'projects'].indexOf(tag) === -1);
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

  // Filter to auto-detect or resolve Phosphor icon class for social and contact links
  eleventyConfig.addFilter('socialIcon', (item) => {
    if (!item) return 'ph-link';
    if (typeof item === 'object' && item.icon && item.icon.trim()) {
      let icon = item.icon.trim();
      if (!icon.startsWith('ph-') && !icon.startsWith('ph ')) {
        icon = 'ph-' + icon;
      }
      return icon;
    }

    const platform = (typeof item === 'object' ? (item.platform || '') : '').toLowerCase();
    const url = (typeof item === 'object' ? (item.url || '') : (item || '')).toLowerCase();
    const target = `${platform} ${url}`;

    if (target.includes('mail') || url.startsWith('mailto:')) return 'ph-envelope';
    if (target.includes('github')) return 'ph-github-logo';
    if (target.includes('twitter') || target.includes('x.com') || target.includes('x-logo') || platform === 'x') return 'ph-x-logo';
    if (target.includes('linkedin')) return 'ph-linkedin-logo';
    if (target.includes('youtube') || target.includes('youtu.be')) return 'ph-youtube-logo';
    if (target.includes('discord')) return 'ph-discord-logo';
    if (target.includes('instagram')) return 'ph-instagram-logo';
    if (target.includes('twitch')) return 'ph-twitch-logo';
    if (target.includes('reddit')) return 'ph-reddit-logo';
    if (target.includes('telegram') || target.includes('t.me')) return 'ph-telegram-logo';
    if (target.includes('tiktok')) return 'ph-tiktok-logo';
    if (target.includes('threads')) return 'ph-threads-logo';
    if (target.includes('mastodon')) return 'ph-mastodon-logo';
    if (target.includes('bluesky') || target.includes('bsky')) return 'ph-butterfly';
    if (target.includes('steam')) return 'ph-steam-logo';
    if (target.includes('spotify')) return 'ph-spotify-logo';
    if (target.includes('figma')) return 'ph-figma-logo';
    if (target.includes('dribbble')) return 'ph-dribbble-logo';
    if (target.includes('stackoverflow') || target.includes('stack-overflow')) return 'ph-stack-overflow-logo';
    if (target.includes('codepen')) return 'ph-codepen-logo';
    if (target.includes('medium')) return 'ph-medium-logo';
    if (target.includes('sub')) return 'ph-newspaper';
    if (target.includes('resume') || target.includes('cv')) return 'ph-file-text';
    if (target.includes('phone') || target.includes('tel:')) return 'ph-phone';
    if (target.includes('web') || target.includes('site') || target.includes('blog')) return 'ph-globe';

    return 'ph-link';
  });

  // Helper filter to detect external links for target="_blank"
  eleventyConfig.addFilter('isExternalUrl', (url) => {
    if (!url || typeof url !== 'string') return false;
    return !url.startsWith('mailto:') && !url.startsWith('tel:') && !url.startsWith('/') && !url.startsWith('#');
  });

  // Automatic Collections based on directories
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => {
      const yearA = parseInt(a.data.year, 10) || (a.date ? a.date.getFullYear() : 0);
      const yearB = parseInt(b.data.year, 10) || (b.date ? b.date.getFullYear() : 0);
      if (yearB !== yearA) return yearB - yearA;
      return b.date - a.date;
    });
  });

  return {
    dir: { input: 'src', output: 'dist' },
  };
}
