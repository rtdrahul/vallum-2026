import { notFound } from 'next/navigation';
import { cache } from 'react';
import DynamicPageClient from './DynamicPageClient';

// React cache() deduplicates identical calls within the same render pass.
// generateMetadata + DynamicPage both call this — it only hits the network ONCE.
const fetchPageData = cache(async (slug) => {
  try {
    const response = await fetch(
      `https://badmin.vallum.in/api/common-meta-data/${slug}`,
      {
        headers: { Accept: 'application/json' },
        // ISR: revalidate every 60s. Use 0 for fully dynamic, or false to cache forever.
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    return data.status === 'success' ? data : null;
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
});

async function getSlug(params) {
  const resolvedParams = await params;
  return resolvedParams.slug?.join('/') || 'home';
}

export async function generateMetadata({ params }) {
  const slug = await getSlug(params);
  const pageData = await fetchPageData(slug);

  if (!pageData || pageData?.message === 'Using default metadata') {
    return {
      title: 'Page Not Found - VALLUM',
      description: 'The requested page could not be found.',
    };
  }

  const BASE_URL = 'https://vallum.in';
  const DEFAULT_IMAGE = 'https://badmin.vallum.in/assets/images/logo/logo.webp';
  const DEFAULT_TITLE = 'VALLUM CAPITAL ADVISORS | SEBI Registered Investment Advisors';
  const DEFAULT_DESC = 'VALLUM CAPITAL ADVISORS | SEBI Registered Investment Advisors';

  const meta = pageData.metaData;
  const pageUrl = `${BASE_URL}/${slug}`;
  const title = meta.page_meta_title || meta.page_name || DEFAULT_TITLE;
  const description = meta.page_meta_desc || DEFAULT_DESC;
  const image = meta.page_header_image || DEFAULT_IMAGE;

  return {
    title,
    description,
    keywords: meta.page_meta_keyword || '',
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function DynamicPage({ params }) {
  const slug = await getSlug(params);
  const pageData = await fetchPageData(slug);

  if (!pageData || pageData?.message === 'Using default metadata') {
    notFound();
  }

  return <DynamicPageClient initialData={pageData} slug={slug} />;
}