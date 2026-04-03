import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ✅ Specific bots (fully allowed)
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'Slurp',
          'DuckDuckBot',
          'facebot',
          'Twitterbot',
          'LinkedInBot',
        ],
        allow: '/',
      },

      // ✅ Default rules
      {
        userAgent: '*',

        allow: [
          '/',
          '/about-us',
          '/contact-us',
          '/blog/',
          '/vallum-india-discovery',
          '/vallum-multi-activa',
          '/vallum-jan-principle',
          '/pms-calculator',
          '/terms-conditions',
          '/privacy-policy',
          '/disclaimer',
          '/assets/',
          '/*?utm_', // allow UTM queries
        ],

        disallow: [
          // Blog restrictions
          '/blog/tag/',
          '/blog/category/',

          // Admin & backend
          '/admin/',
          '/admin-panel/',
          '/wp-admin/',
          '/dashboard/',
          '/login/',
          '/api/',
          '/cgi-bin/',
          '/tmp/',
          '/config/',
          '/private/',
          '/internal/',

          // Query params block
          '/*?*',
        ],
      },
    ],

    sitemap: 'https://vallum.in/sitemap.xml',
  };
}