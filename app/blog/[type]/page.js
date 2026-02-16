import BlogListClient from "./BlogListClient";

/**
 * SERVER-SIDE: Fetch blogs based on the dynamic type
 */
async function fetchBlogs(type) {
  try {
    // Dynamically inserting the 'type' into your API endpoint
    const response = await fetch(`https://badmin.vallum.in/api/blog-list/${type}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) return [];

    const data = await response.json();
    // Assuming the API returns an object with a 'blogs' array or similar
    return data.status === "success" ? data : []; 
  } catch (error) {
    console.error(`Failed to fetch ${type} blogs:`, error);
    return [];
  }
}

/**
 * SERVER-SIDE: Fetch metadata for SEO
 */
async function fetchPageData(slug) {
  try {
    const response = await fetch(`https://badmin.vallum.in/api/common-meta-data/${slug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return data.status === "success" ? data : null;
  } catch (error) {
    console.error('Failed to fetch page data:', error);
    return null;
  }
}

/**
 * SERVER-SIDE: Generate metadata
 */
export async function generateMetadata({ params }) {
  const { type } = await params;
  const pageData = await fetchPageData('blog');
  
  const defaultMetadata = {
    title: "VALLUM CAPITAL ADVISORS",
    description: "SEBI Registered Investment Advisors",
    image: "https://badmin.vallum.in/assets/images/logo/logo.webp",
    url: "https://www.viblo.in",
  };

  if (!pageData) return { title: defaultMetadata.title };

  const meta = pageData.metaData;
  // Make the title dynamic based on the category type
  const displayTitle = `${meta.page_meta_title || meta.page_name} | ${type.toUpperCase()}`;

  return {
    title: displayTitle,
    description: meta.page_meta_desc || defaultMetadata.description,
    keywords: meta.page_meta_keyword || "finance, investment, advisory",
    openGraph: {
      title: displayTitle,
      description: meta.page_meta_desc || defaultMetadata.description,
      url: `${defaultMetadata.url}/blog/${type}`,
      type: "website",
      images: [{ url: meta.page_header_image || defaultMetadata.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      images: [meta.page_header_image || defaultMetadata.image],
    },
    alternates: {
      canonical: `${defaultMetadata.url}/blog/${type}`,
    },
  };
}

/**
 * MAIN PAGE COMPONENT
 */
export default async function BlogPage({ params, searchParams }) {
  const { type } = await params;
  const { page } = await searchParams; // Get ?page= from URL
  const currentPage = page || 1;

  // Update fetch to include the page number
  const response = await fetch(`https://badmin.vallum.in/api/blog-list/${type}?page=${currentPage}`, {
    next: { revalidate: 3600 }
  });
  const blogData = await response.json();

  return <BlogListClient initialData={blogData} />;
}