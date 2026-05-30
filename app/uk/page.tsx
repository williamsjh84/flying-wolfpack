import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EpisodeCard from "@/components/sections/EpisodeCard";
import EmailSignup from "@/components/sections/EmailSignup";

export const metadata: Metadata = {
  title: "The United Kingdom Series",
  description:
    "London, the Cotswolds, and Scotland — three very different corners of the UK explored as a family.",
};

const UK_EPISODES = [
  {
    slug: "london",
    title: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    episode: 1,
    duration: "",
    description:
      "The city that needs no introduction — but still managed to surprise us. Museums, markets, and the Underground with two kids who thought it was the best thing they'd ever seen.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=450&fit=crop",
  },
  {
    slug: "cotswolds",
    title: "The Cotswolds",
    country: "United Kingdom",
    flag: "🇬🇧",
    episode: 2,
    duration: "",
    description:
      "Honey-stone villages, rolling green hills, and the England that looks exactly like a postcard — because it is one.",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=450&fit=crop",
  },
  {
    slug: "scotland",
    title: "Scotland",
    country: "United Kingdom",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    episode: 3,
    duration: "",
    description:
      "Lochs, castles, and highlands that make you feel very small in the best possible way. Scotland was wilder than we expected and the kids loved every minute of it.",
    image: "https://images.unsplash.com/photo-1506377585622-bedcbb5a8e95?w=800&h=450&fit=crop",
  },
];

export default function UKPage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="Season Two"
        headline="The United Kingdom Series"
        subheadline="London streets, Cotswolds countryside, and Scottish highlands. Three destinations, one unforgettable family trip."
        ctaLabel="Start with London"
        ctaHref="/uk/london"
        backgroundImage="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&h=900&fit=crop"
      />

      {/* Series overview */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">
            About the Series
          </p>
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
            Britain through fresh eyes
          </h2>
          <div className="mt-8 space-y-5 font-sans text-lg leading-relaxed text-ink/65">
            <p>
              We&apos;ve been meaning to do the UK properly for years. Not just a long weekend in London —
              but actually slow down and see what makes Britain extraordinary for families: the history
              you can touch, the countryside that goes on forever, and the accents our kids kept
              trying to copy.
            </p>
            <p>
              Three destinations. Very different pace. All worth it.
            </p>
          </div>
        </div>
      </section>

      {/* Episode grid */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="All Episodes"
            headline="The Full Series"
            subtext="3 destinations across the United Kingdom"
            className="mb-12"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {UK_EPISODES.map((episode) => (
              <EpisodeCard key={episode.slug} {...episode} basePath="/uk" />
            ))}
          </div>
        </div>
      </section>

      <EmailSignup
        headline="More Series Coming"
        subheadline="Subscribe to be the first to know where we're headed next."
      />
    </PageWrapper>
  );
}
