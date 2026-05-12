import BlogListClient from "../../BlogListClient";
import { notFound } from "next/navigation";

/**
 * Fetch blogs filtered by both Type AND Category
 */
async function fetchFilteredBlogs(type, categorySlug) {
  try {
    const response = await fetch(
      `https://badmin.vallum.in/api/blog-list/${type}?category=${categorySlug}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`API error: ${response.status} for type=${type} category=${categorySlug}`);
      return null;
    }

    const data = await response.json();

    // FIX: Don't treat a successful fetch with no articles as a 404.
    // Only return null (→ notFound) if the API itself reports failure.
    if (data.status !== "success") return null;

    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { type, slug } = await params;
  return {
    title: `${slug.replace(/-/g, " ").toUpperCase()} - ${type.toUpperCase()} | VALLUM CAPITAL`,
    description: `Browse ${slug} articles in our ${type} section.`,
  };
}

export default async function TypeCategoryPage({ params }) {
  // FIX: params.slug is the CATEGORY slug (the [slug] segment under category/).
  // Rename to categorySlug for clarity so it's never confused with a blog slug.
  const { type, slug: categorySlug } = await params;

  const data = await fetchFilteredBlogs(type, categorySlug);

  // Only 404 when the API itself fails — not when it returns 0 articles.
  if (!data) notFound();

  return (
    <BlogListClient
      initialData={data}
      currentType={type}          // tells BlogListClient which top-level tab is active
      currentCategory={categorySlug}  // tells BlogListClient which sidebar item to highlight
    />
  );
}