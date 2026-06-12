import BlogListClient from "./BlogListClient";

const TYPES = ["blog", "media", "stakeholders-letters", "weekend-reading"];
const BASE_URL = "https://badmin.vallum.in/api";

async function fetchBlogs(type, page = 1) {
  try {
    const res = await fetch(`${BASE_URL}/blog-list/${type}?page=${page}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 }, // cache for 60s — adjust as needed
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.status === "success" ? data : null;
  } catch (err) {
    console.error(`Failed to fetch ${type}:`, err);
    return null;
  }
}

async function fetchPageData(slug) {
  try {
    const res = await fetch(`${BASE_URL}/common-meta-data/${slug}`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.status === "success" ? data : null;
  } catch (err) {
    console.error("Failed to fetch page meta:", err);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { type } = await params;
  const pageData = await fetchPageData("blog");

  const defaultMeta = {
    title: "VALLUM CAPITAL ADVISORS",
    description: "SEBI Registered Investment Advisors",
    image: "https://badmin.vallum.in/assets/images/logo/logo.webp",
    url: "https://vallum.in",
  };

  if (!pageData) return { title: defaultMeta.title };

  const meta = pageData.metaData;
  const displayTitle = `${meta.page_meta_title || meta.page_name} | ${type.toUpperCase()}`;

  return {
    title: displayTitle,
    description: meta.page_meta_desc || defaultMeta.description,
    keywords: meta.page_meta_keyword || "finance, investment, advisory",
    openGraph: {
      title: displayTitle,
      description: meta.page_meta_desc || defaultMeta.description,
      url: `${defaultMeta.url}/perspective/${type}`,
      type: "website",
      images: [{ url: meta.page_header_image || defaultMeta.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      images: [meta.page_header_image || defaultMeta.image],
    },
    alternates: {
      canonical: `${defaultMeta.url}/perspective/${type}`,
    },
  };
}

export default async function BlogPage({ params, searchParams }) {
  const { type } = await params;
  const { page } = await searchParams;
  const currentPage = page || 1;

  // Fetch the active type with pagination, and all other types page-1 in parallel
  const otherTypes = TYPES.filter((t) => t !== type);

  const [activeData, ...otherData] = await Promise.all([
    fetchBlogs(type, currentPage),
    ...otherTypes.map((t) => fetchBlogs(t, 1)),
  ]);

  // Build a map: { blog: data, media: data, ... }
  const allData = { [type]: activeData };
  otherTypes.forEach((t, i) => {
    allData[t] = otherData[i];
  });

  return (
    <BlogListClient
      allData={allData}
      initialType={type}
      initialPage={Number(currentPage)}
    />
  );
}
