export interface SeoMetadata {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: string;
  siteName?: string;
  twitterCard?: string;
  twitterImageAlt?: string;
}

const DEFAULTS: Required<SeoMetadata> = {
  title: "Rise-Up Bible Church | Raising the Lord's Army for the End-Time Harvest",
  description:
    "Rise-Up Bible Church in Osizweni and Benoni equips believers for worship, teaching, discipleship, and community outreach.",
  url: "https://rubc-osizweni.netlify.app/",
  image: "/logo.jpg",
  type: "website",
  siteName: "Rise-Up Bible Church",
  twitterCard: "summary_large_image",
  twitterImageAlt: "Rise-Up Bible Church logo",
};

const ensureAbsoluteUrl = (value: string) => {
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://rubc-osizweni.netlify.app';
  return value.startsWith('/') ? `${origin}${value}` : `${origin}/${value}`;
};

const updateOrCreateMeta = (key: 'name' | 'property', attr: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}='${attr}']`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(key, attr);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setLinkCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
};

export const setSeoMetadata = (metadata: SeoMetadata = {}) => {
  const title = metadata.title ?? DEFAULTS.title;
  const description = metadata.description ?? DEFAULTS.description;
  const type = metadata.type ?? DEFAULTS.type;
  const siteName = metadata.siteName ?? DEFAULTS.siteName;
  const twitterCard = metadata.twitterCard ?? DEFAULTS.twitterCard;
  const twitterImageAlt = metadata.twitterImageAlt ?? DEFAULTS.twitterImageAlt;
  const url = metadata.url ? ensureAbsoluteUrl(metadata.url) : (typeof window !== 'undefined' ? window.location.href : DEFAULTS.url);
  const image = metadata.image ? ensureAbsoluteUrl(metadata.image) : ensureAbsoluteUrl(DEFAULTS.image);

  document.title = title;
  updateOrCreateMeta('name', 'description', description);
  updateOrCreateMeta('property', 'og:title', title);
  updateOrCreateMeta('property', 'og:description', description);
  updateOrCreateMeta('property', 'og:url', url);
  updateOrCreateMeta('property', 'og:image', image);
  updateOrCreateMeta('property', 'og:type', type);
  updateOrCreateMeta('property', 'og:site_name', siteName);
  updateOrCreateMeta('name', 'twitter:card', twitterCard);
  updateOrCreateMeta('name', 'twitter:title', title);
  updateOrCreateMeta('name', 'twitter:description', description);
  updateOrCreateMeta('name', 'twitter:image', image);
  updateOrCreateMeta('name', 'twitter:image:alt', twitterImageAlt);
  setLinkCanonical(url);
};
