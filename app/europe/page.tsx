import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EpisodeCard from "@/components/sections/EpisodeCard";
import EmailSignup from "@/components/sections/EmailSignup";
import { EUROPE_EPISODES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "The Europe Summer Series",
  description:
    "Eleven destinations across six countries in ninety-four days. This is our most cinematic family travel series yet.",
};

export default function EuropePage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="Season One"
        headline="The Europe Summer Series"
        subheadline="Eleven destinations. Six countries. Ninety-four days. Two kids who said they'd rather stay home — and one summer that changed everything."
        ctaLabel="Start with Episode One"
        ctaHref="/europe/prague"
        backgroundImage="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&h=900&fit=crop"
      />

      {/* Series overview */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">About the Series</p>
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
            How it happened
          </h2>
          <div className="mt-8 space-y-5 font-sans text-lg leading-relaxed text-ink/65">
            <p>
              We planned six weeks. It turned into three months. That&apos;s the kind of trip this was — the kind where the original plan becomes irrelevant somewhere over the Atlantic and you stop caring.
            </p>
            <p>
              We started in Prague in June, chased summer south through Poland, crossed into Italy via Lake Garda, got lost in Venice, ate our way through Tuscany, survived Rome, and spent our final weeks island-hopping the Greek Cyclades.
            </p>
            <p>
              Every episode is real. The meltdowns, the wrong trains, the hotels that looked nothing like the photos. We kept them all in because that&apos;s what family travel actually looks like — and you deserve the honest version.
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
            subtext={`${EUROPE_EPISODES.length} episodes across 6 countries`}
            className="mb-12"
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {EUROPE_EPISODES.map((episode) => (
              <EpisodeCard key={episode.slug} {...episode} />
            ))}
          </div>
        </div>
      </section>

      <EmailSignup
        headline="Don't Miss Season Two"
        subheadline="We're planning our next big series. Subscribe and you'll be the first to know where we're headed."
      />
    </PageWrapper>
  );
}
