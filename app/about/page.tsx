import type { Metadata } from "next";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import EmailSignup from "@/components/sections/EmailSignup";
import { getPage } from "@/lib/content";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";

export const metadata: Metadata = {
  title: "About",
  description: "We're a family of four who got tired of just talking about travel. This is what happened when we finally went.",
};

export default async function AboutPage() {
  const story = await getPublishedStory("about");
  if (story) return <StoryblokPublishedStory story={story} />;

  const p = getPage("about");

  return (
    <PageWrapper>
      <Hero eyebrow={p.heroEyebrow} headline={p.heroHeadline} subheadline={p.heroSubheadline} backgroundImage={p.heroImage} />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-6 font-sans text-xs tracking-[0.2em] text-earth uppercase">{p.originEyebrow}</p>
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">{p.originHeadline}</h2>
          <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-ink/70">
            <p>{p.originParagraph1}</p>
            <p>{p.originParagraph2}</p>
            <p>{p.originParagraph3}</p>
            <p>{p.originParagraph4}</p>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={p.familyImage} alt="The Wolfpack" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">{p.familyEyebrow}</p>
              <h2 className="font-serif text-4xl font-bold italic text-ink">{p.familyHeadline}</h2>
              <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-ink/65">
                <p><strong className="font-medium text-ink">Dad</strong> — {p.dadBio}</p>
                <p><strong className="font-medium text-ink">Mom</strong> — {p.momBio}</p>
                <p><strong className="font-medium text-ink">The older one</strong> — {p.olderKidBio}</p>
                <p><strong className="font-medium text-ink">The younger one</strong> — {p.youngerKidBio}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] text-gold uppercase">{p.approachEyebrow}</p>
          <h2 className="font-serif text-4xl font-bold italic text-warm-white sm:text-5xl">{p.approachHeadline}</h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-warm-white/60">{p.approachBody}</p>
        </div>
      </section>

      <EmailSignup variant="light" headline={p.emailHeadline} subheadline={p.emailSubheadline} />
    </PageWrapper>
  );
}
