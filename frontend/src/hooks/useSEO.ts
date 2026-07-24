import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
}

export function useSEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    // 1. Update Title
    document.title = title;

    // 2. Update or Create Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // 3. Update or Create Meta Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", keywords);
  }, [title, description, keywords]);
}

