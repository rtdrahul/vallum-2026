import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiUrl = 'https://badmin.vallum.in/api/custom-sitemap-data';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`Failed to fetch sitemap data: ${response.status}`);
      return new NextResponse(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, 
        {
          status: response.status,
          headers: { 'Content-Type': 'application/xml; charset=utf-8' },
        }
      );
    }

    const blogData = await response.json();
    
    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
    
    blogData.forEach((item: any) => {
      const date = item.lastModified ? new Date(item.lastModified) : new Date();
      const isoDate = isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
      
      // Extract the new fields, providing safe defaults if they are missing
      const frequency = item.changeFrequency || 'weekly';
      const priority = item.priority || 0.5;

      sitemapXml += `
    <url>
        <loc>${item.url}</loc>
        <lastmod>${isoDate}</lastmod>
        <changefreq>${frequency}</changefreq>
        <priority>${priority}</priority>
    </url>`;
    });

    sitemapXml += `\n</urlset>`;

    return new NextResponse(sitemapXml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  } catch (error: any) {
    console.error('Error generating sitemap:', error);
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`, 
      {
        status: 500,
        headers: { 'Content-Type': 'application/xml; charset=utf-8' },
      }
    );
  }
}