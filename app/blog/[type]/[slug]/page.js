import BlogDetailClient from "./BlogDetailClient";
import { notFound } from "next/navigation";

// SERVER-SIDE: Fetch blog data
async function getBlogData(slug) {
  try {
    const response = await fetch(`https://www.viblo.in/api/blog-details/${slug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.status === "success" ? result : null;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null;
  }
}

// SERVER-SIDE: Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const res = await getBlogData(slug);

  const defaultMeta = {
    title: "VALLUM CAPITAL ADVISORS",
    description: "SEBI Registered Investment Advisors",
    image: "https://www.viblo.in/assets/images/logo/logo.webp",
  };

  if (!res || !res.data) {
    return { title: defaultMeta.title };
  }

  const blog = res.data;

  return {
    title: blog.blog_meta_title || blog.blog_name,
    description: blog.blog_meta_desc || blog.blog_short_description,
    keywords: blog.blog_meta_keyword,
    openGraph: {
      title: blog.blog_meta_title || blog.blog_name,
      description: blog.blog_meta_desc || blog.blog_short_description,
      type: "article",
      publishedTime: blog.created_at,
      images: [
        {
          url: blog.blog_image || defaultMeta.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.blog_meta_title || blog.blog_name,
      images: [blog.blog_image || defaultMeta.image],
    },
  };
}

// SERVER-SIDE: Main page component
export default async function BlogDetail({ params }) {
  const { slug, type } = await params;
  const res = await getBlogData(slug);

  // If no blog found, trigger Next.js 404 page
  if (!res || !res.data) {
    notFound();
  }

  return (
    <BlogDetailClient 
      blogData={res.data} 
      relatedBlogs={res.relatedblogs} 
      type={type} 
    />
  );
}