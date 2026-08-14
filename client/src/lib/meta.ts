/**
 * Utility functions for managing page-level meta tags and structured data
 */

export interface MetaTagsConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  noindex?: boolean;
}

export function updateMetaTags(config: MetaTagsConfig) {
  // Update title
  document.title = config.title;
  updateMetaTag('og:title', config.ogTitle || config.title);
  updateMetaTag('twitter:title', config.twitterTitle || config.title);

  // Update description
  updateMetaTag('description', config.description);
  updateMetaTag('og:description', config.ogDescription || config.description);
  updateMetaTag('twitter:description', config.twitterDescription || config.description);

  // Update keywords
  if (config.keywords) {
    updateMetaTag('keywords', config.keywords);
  }

  // Update images
  if (config.ogImage) {
    updateMetaTag('og:image', config.ogImage);
  }
  if (config.twitterImage) {
    updateMetaTag('twitter:image', config.twitterImage);
  }

  // Update og:type
  if (config.ogType) {
    updateMetaTag('og:type', config.ogType);
  }

  // Update canonical URL
  if (config.canonicalUrl) {
    updateCanonicalUrl(config.canonicalUrl);
  }

  // Update robots meta tag for noindex
  if (config.noindex) {
    updateMetaTag('robots', 'noindex, nofollow');
  } else {
    updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
  }
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:') || name.startsWith('twitter:')) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.content = content;
}

function updateCanonicalUrl(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }

  link.href = url;
}

export function addJsonLdSchema(schema: Record<string, any>) {
  const schemaType = schema['@type'];
  if (schemaType) {
    const existing = document.querySelectorAll(`script[type="application/ld+json"][data-schema-type="${schemaType}"]`);
    existing.forEach((el) => el.remove());
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-dynamic', 'true');
  if (schemaType) {
    script.setAttribute('data-schema-type', schemaType);
  }
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

export function removeJsonLdSchemas() {
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  scripts.forEach((script) => {
    if (script.getAttribute('data-dynamic') === 'true') {
      script.remove();
    }
  });
}

/**
 * Create breadcrumb schema
 */
export function createBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Create article schema for blog posts
 */
export function createArticleSchema(config: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: config.headline,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    dateModified: config.dateModified || config.datePublished,
    author: {
      '@type': 'Person',
      name: config.author,
    },
    url: config.url,
    publisher: {
      '@type': 'Organization',
      name: 'Gift of Trading',
      logo: {
        '@type': 'ImageObject',
        url: '/images/gift-logo_e37ab5cd.png',
      },
    },
  };
}

/**
 * Create event schema for webinars
 */
export function createEventSchema(config: {
  name: string;
  description: string;
  image?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  url: string;
  organizer?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: config.name,
    description: config.description,
    image: config.image,
    startDate: config.startDate,
    endDate: config.endDate || config.startDate,
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'VirtualLocation',
      url: config.url,
    },
    organizer: {
      '@type': 'Organization',
      name: config.organizer || 'Gift of Trading',
      url: 'https://giftoftrading.com',
    },
  };
}
