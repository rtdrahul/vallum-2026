import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import DynamicPageClient from './DynamicPageClient';

// SERVER-SIDE: Fetch data and generate metadata
async function fetchPageData(slug) {
  try {
    const response = await fetch(`https://badmin.vallum.in/api/common-meta-data/${slug}`, {
      headers: { Accept: "application/json" }
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.status === "success" ? data : null;
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
}

// SERVER-SIDE: Generate metadata for SEO
export async function generateMetadata({ params }){
  // In Next.js 15, 'params' is a Promise, so it must be awaited before use.
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join('/') || 'home';

  const pageData = await fetchPageData(slug);
  console.log('pageData',pageData?.message);
  if (pageData?.message == "Using default metadata") {
    notFound();
    // redirect('https://www.applylynk.com/404');
  }
  if (!pageData) {
    return {
      title: 'Page Not Found - VALLUM',
      description: 'The requested page could not be found.',
    };
  }

  const defaultMetadata = {
    title: "VALLUM CAPITAL ADVISORS | SEBI Registered Investment Advisors",
    description: "VALLUM CAPITAL ADVISORS | SEBI Registered Investment Advisors",
    image: "https://badmin.vallum.in/assets/images/logo/logo.webp",
    url: "https://vallum.in",
  };

  const meta = pageData.metaData;
  // Use resolvedParams to construct the URL
  const pageUrl = `${defaultMetadata.url}/${resolvedParams.slug?.join('/') || 'home'}`;

  return {
    title: meta.page_meta_title || meta.page_name || defaultMetadata.title,
    description: meta.page_meta_desc || defaultMetadata.description,
    keywords: meta.page_meta_keyword || "ApplyLynk, education, courses, learning",
    openGraph: {
      title: meta.page_meta_title || meta.page_name || defaultMetadata.title,
      description: meta.page_meta_desc || defaultMetadata.description,
      url: pageUrl,
      type: "website",
      images: [
        {
          url: meta.page_header_image || defaultMetadata.image,
          width: 1200,
          height: 630,
          alt: meta.page_meta_title || meta.page_name || defaultMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.page_meta_title || meta.page_name || defaultMetadata.title,
      description: meta.page_meta_desc || defaultMetadata.description,
      images: [meta.page_header_image || defaultMetadata.image],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

// SERVER-SIDE: Main page component
export default async function DynamicPage({ params }) {
  // In Next.js 15, 'params' is a Promise, so it must be awaited before use.
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join('/') || 'home';

  const pageData = await fetchPageData(slug);

  if (!pageData) {
    notFound();
  }

  // Pass data to client component for interactivity
  return <DynamicPageClient initialData={pageData} slug={slug} />;
}