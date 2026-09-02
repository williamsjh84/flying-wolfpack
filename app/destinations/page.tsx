import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import DestinationCard from "@/components/sections/DestinationCard";
import SectionHeader from "@/components/sections/SectionHeader";
import { getDestinations } from "@/lib/content";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Every country, city, and island we've explored as a family.",
};

export default async function DestinationsPage() {
  const story = await getPublishedStory("destinations");
  if (story) return <StoryblokPublishedStory story={story} />;

  const destinations = getDestinations();

  return (
    <PageWrapper>
      <Hero
        eyebrow="The World, Family-Sized"
        headline="Destinations"
        subheadline="Every place we've taken our family — honestly reviewed, practically documented, beautifully remembered."
        backgroundImage="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&h=900&fit=crop"
      />
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Explore" headline="All Destinations" className="mb-12" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest: any) => <DestinationCard key={dest.slug} {...dest} />)}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
