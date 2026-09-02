import { getStoryblokApi } from "@/lib/storyblok";

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  if (process.env.STORYBLOK_DELIVERY_API_TOKEN) getStoryblokApi();
  return children;
}
