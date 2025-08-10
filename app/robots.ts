import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/Admin/',  // change or remove this if you don't have /private/
    },
    sitemap: 'https://shalitha.me/sitemap.xml',
  };
}
