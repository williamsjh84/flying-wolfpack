export type StoryblokAsset = {
  filename?: string;
  alt?: string;
  title?: string;
};

export type StoryblokLink = {
  cached_url?: string;
  url?: string;
  linktype?: string;
};

export type StoryblokBlok = {
  _uid: string;
  _editable?: string;
  component: string;
  [key: string]: unknown;
};

export function storyblokAssetUrl(asset?: StoryblokAsset | string): string {
  if (!asset) return "";
  if (typeof asset === "string") return asset;
  return asset.filename || "";
}

export function storyblokAssetAlt(asset: StoryblokAsset | string | undefined, fallback: string): string {
  if (!asset || typeof asset === "string") return fallback;
  return asset.alt || asset.title || fallback;
}

export function storyblokLinkHref(link?: StoryblokLink | string, fallback = "#"): string {
  if (!link) return fallback;
  if (typeof link === "string") return link;
  const href = link.cached_url || link.url || fallback;
  if (link.linktype === "email" && !href.startsWith("mailto:")) return `mailto:${href}`;
  return href.startsWith("/") || href.startsWith("http") || href.startsWith("mailto:")
    ? href
    : `/${href}`;
}
