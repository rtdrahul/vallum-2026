"use client";

import { useEffect, useState } from "react";

export default function DynamicPageClient({ initialData, slug }) {
  const [pageData, setPageData] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState(false);

  // Optional: Refresh data on client side if needed

  return (
    <>      
      <div 
        dangerouslySetInnerHTML={{ __html: pageData.metaData.page_content }} 
      />
    </>
  );
}
