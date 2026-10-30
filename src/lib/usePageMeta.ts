import { useEffect } from 'react';

type PageMeta = {
  title: string;
  description?: string;
};

function setMeta(attribute: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}

/**
 * Client-side document metadata.
 *
 * This is the lightweight SPA approach: it updates title and meta tags after
 * mount. It is not a substitute for server-rendered HTML — see
 * docs/02-architecture.md ("SEO trade-off") before choosing a deploy target.
 */
export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
    setMeta('property', 'og:title', title);
  }, [title, description]);
}
