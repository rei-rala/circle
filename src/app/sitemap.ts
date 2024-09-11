import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://thecircle.com.ar',
      lastModified: new Date(2024, 9, 11),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
        url: 'https://thecircle.com.ar/events',
        lastModified: new Date(2024, 9, 11),
        changeFrequency: 'daily',
        priority: 0.9,
    },
    // {
    //   url: 'https://thecircle.com.ar/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://thecircle.com.ar/photos',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.7,
    // },
  ]
}