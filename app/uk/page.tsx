import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EpisodeCard from "@/components/sections/EpisodeCard";
import EmailSignup from "@/components/sections/EmailSignup";
import { getPage, getEpisodes } from "@/lib/content";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";

export const metadata: Metadata = {
  title: "The United Kingdom Series",
  description: "London, the Cotswolds, and Scotland — three very different corners of the UK explored as a family.",
};

export default async function UKPage() {
  const story = await getPublishedStory("uk");
  if (story) return <StoryblokPublishedStory story={story} />;

  const p = getPage("uk");
  const episodes = getEpisodes("uk");

  return (
    <PageWrapper>
      <Hero eyebrow={p.heroEyebrow} headline={p.heroHeadline} subheadline={p.heroSubheadline} ctaLabel={p.heroCtaLabel} ctaHref={p.heroCtaHref} backgroundImage={p.heroImage} />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">{p.overviewEyebrow}</p>
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">{p.overviewHeadline}</h2>
          <div className="mt-8 space-y-5 font-sans text-lg leading-relaxed text-ink/65">
            <p>{p.overviewParagraph1}</p>
            <p>{p.overviewParagraph2}</p>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow={p.episodesEyebrow} headline={p.episodesHeadline} subtext={p.episodesSubtext} className="mb-12" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep: any) => <EpisodeCard key={ep.slug} {...ep} basePath="/uk" />)}
          </div>
        </div>
      </section>

      <EmailSignup headline={p.emailHeadline} subheadline={p.emailSubheadline} />
    </PageWrapper>
  );
}
