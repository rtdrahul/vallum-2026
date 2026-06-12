// No need for "use client" if there's zero interactivity.
// If you have NO click handlers or hooks, make this a pure server component:

export default function DynamicPageClient({ initialData }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: initialData.metaData.page_content }}
    />
  );
}