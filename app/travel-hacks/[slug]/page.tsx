import { notFound } from "next/navigation";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";
import { getTravelHacks } from "@/lib/content";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTravelHacks().map((hack) => ({ slug: hack.slug }));
}

export default async function TravelHackPage({ params }: Props) {
  const { slug } = await params;
  const story = await getPublishedStory(`travel-hack-${slug}`);
  if (!story) notFound();
  return <StoryblokPublishedStory story={story} />;
}
