import { StoryblokStory, type ISbStoryData } from "@storyblok/react/rsc";
import { connection } from "next/server";
import PageWrapper from "@/components/layout/PageWrapper";
import { getStoryblokApi } from "@/lib/storyblok";

export async function getPublishedStory(slug: string): Promise<ISbStoryData | null> {
  await connection();
  if (!process.env.STORYBLOK_DELIVERY_API_TOKEN) return null;

  try {
    const { data } = await getStoryblokApi().get(`cdn/stories/${slug}`, {
      version: "published",
      cv: Date.now(),
    });
    return data.story || null;
  } catch {
    return null;
  }
}

export default function StoryblokPublishedStory({ story }: { story: ISbStoryData }) {
  return (
    <PageWrapper>
      <StoryblokStory story={story} />
    </PageWrapper>
  );
}
