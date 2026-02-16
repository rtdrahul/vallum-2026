import BlogListClient from "../../BlogListClient";
import { notFound } from "next/navigation";

// Fetch blogs filtered by both Type AND Category
async function fetchFilteredBlogs(type, categorySlug) {
  try {
    // Adjust this URL to match your backend's filtering logic
    const response = await fetch(`https://badmin.vallum.in/api/blog-list/${type}?category=${categorySlug}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.status === "success" ? data : null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { type, slug } = await params;
  return {
    title: `${slug.toUpperCase()} - ${type.toUpperCase()} | VALLUM CAPITAL`,
    description: `Browse ${slug} articles in our ${type} section.`,
  };
}

export default async function TypeCategoryPage({ params }) {
  const { type, slug } = await params; // slug is the category name
  const data = await fetchFilteredBlogs(type, slug);

  if (!data) notFound();

  return (
    <BlogListClient 
      initialData={data} 
      currentType={type} 
      currentCategory={slug} 
    />
  );
}