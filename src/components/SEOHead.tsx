import React, { useEffect } from 'react';
import { CONFIG } from '../config';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object | object[];
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  jsonLd,
}) => {
  const fullTitle = title.includes(CONFIG.SITE_NAME) ? title : `${title} | ${CONFIG.SITE_NAME}`;
  const canonicalUrl = `${CONFIG.SITE_URL}${canonicalPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update Open Graph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // Canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Inject JSON-LD
    let scriptTag = document.getElementById('page-jsonld') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [fullTitle, description, canonicalUrl, jsonLd]);

  return null;
};
