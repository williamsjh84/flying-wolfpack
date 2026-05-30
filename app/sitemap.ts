import type { MetadataRoute } from "next";
import { EUROPE_EPISODES, FEATURED_DESTINATIONS, JOURNAL_POSTS } from "@/lib/constants";

const BASE_URL = "https://flyingwolfpack.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/europe`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/destinations`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE_URL}/travel-hacks`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/gear`, lastModified: new Date(), priority: 0.7 },
    { url: `${BASE_URL}/journal`, lastModified: new Date(), priority: 0.8 },
  ];

  const episodeRoutes = EUROPE_EPISODES.map((ep) => ({
    url: `${BASE_URL}/europe/${ep.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const destinationRoutes = FEATURED_DESTINATIONS.map((dest) => ({
    url: `${BASE_URL}/destinations/${dest.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const journalRoutes = JOURNAL_POSTS.map((post) => ({
    url: `${BASE_URL}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...episodeRoutes, ...destinationRoutes, ...journalRoutes];
}
