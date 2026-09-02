import { notFound } from "next/navigation";
import { StoryblokStory } from "@storyblok/react/rsc";
import PageWrapper from "@/components/layout/PageWrapper";
import { getStoryblokApi } from "@/lib/storyblok";

export const dynamic = "force-dynamic";

export default async function StoryblokPreviewPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  if (!process.env.STORYBLOK_DELIVERY_API_TOKEN) notFound();

  const { slug } = await params;
  const storySlug = slug?.join("/") || "home";
  const storyblokApi = getStoryblokApi();
  let story: Parameters<typeof StoryblokStory>[0]["story"];

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${storySlug}`, {
      version: "draft",
    });
    story = data.story;
  } catch {
    notFound();
  }

  return (
    <PageWrapper>
      <StoryblokStory story={story} />
    </PageWrapper>
  );
}
