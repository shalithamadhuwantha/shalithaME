import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: 'https://shalitha.me/',
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://shalitha.me/about',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://shalitha.me/projects',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://shalitha.me/certificates',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
