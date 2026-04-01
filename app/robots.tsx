import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        // Blog restrictions
        '/blog/tag/*', 
        '/blog/category/*',
        
        // Broken / error PDF files
        '/img/uploads/pdfs/Frequently-Asked-Questions-(FAQ)-Portfolio-Managers.pdf',
        
        // Admin & backend paths
        '/admin/',
        '/dashboard/',
        '/login/',
        '/api/',
        '/config/',
        '/private/',
        '/tmp/',
      ],
    },
    // Updated to match the Vallum project instead of ApplyLynk
    sitemap: 'https://vallum.in/sitemap.xml', 
  };
}