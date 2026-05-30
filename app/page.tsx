import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EpisodeCard from "@/components/sections/EpisodeCard";
import DestinationCard from "@/components/sections/DestinationCard";
import EmailSignup from "@/components/sections/EmailSignup";
import Button from "@/components/ui/Button";
import {
  EUROPE_EPISODES,
  FEATURED_DESTINATIONS,
  TRAVEL_HACKS,
  JOURNAL_POSTS,
} from "@/lib/constants";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Flying Wolfpack — Family Travel",
};

export default function HomePage() {
  const latestEpisodes = EUROPE_EPISODES.slice(0, 3);

  return (
    <PageWrapper>
      {/* 1. Hero */}
      <Hero
        eyebrow="Season One — Europe"
        headline="Exploring the World as a Family of Four"
        subheadline="Real family travel. Honest moments. Practical adventure. We flew 47,000 miles last year — here's everything we learned."
        ctaLabel="Watch the Europe Series"
        ctaHref="/europe"
        backgroundImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=900&fit=crop"
      />

      {/* 2. Current Journey */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">
                Current Journey
              </p>
              <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
                The Europe Summer Series
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-ink/60">
                Eleven destinations. Ninety-four days. Two kids who initially said they&apos;d rather
                stay home. We dragged them across six countries and watched something quietly
                extraordinary happen.
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-ink/50">
                From Prague&apos;s medieval alleyways to the Santorini caldera at sunset — this
                series is our most ambitious project yet. Every episode is part travel film, part
                honest family documentary.
              </p>
              <div className="mt-8">
                <Link href="/europe">
                  <Button variant="secondary" size="md">
                    Watch All Episodes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&h=600&fit=crop"
                alt="Family travel in Europe"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Latest Episodes */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow="Europe Series" headline="Latest Episodes" />
            <Link
              href="/europe"
              className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.slug} {...episode} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link href="/europe">
              <Button variant="ghost" size="md">
                View All Episodes →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Destinations */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow="Explore" headline="Featured Destinations" />
            <Link
              href="/destinations"
              className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block"
            >
              All Destinations →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DESTINATIONS.map((dest) => (
              <DestinationCard key={dest.slug} {...dest} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Europe Documentary — dark cinematic */}
      <section className="bg-ocean py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader
                eyebrow="Documentary Series"
                headline="The Europe Summer Series"
                subtext="Eleven countries. One family. Zero regrets. This is the series that launched Flying Wolfpack — a cinematic record of our first big adventure."
                light
              />
              <div className="mt-8">
                <Link href="/europe">
                  <Button variant="outline" size="md">
                    Watch the Series
                  </Button>
                </Link>
              </div>
            </div>

            {/* Episode list teaser */}
            <div className="space-y-4">
              {EUROPE_EPISODES.slice(0, 5).map((ep) => (
                <Link
                  key={ep.slug}
                  href={`/europe/${ep.slug}`}
                  className="group flex items-center gap-4 border-b border-warm-white/10 pb-4 last:border-0 hover:border-warm-white/30 transition-colors"
                >
                  <span className="w-8 shrink-0 font-sans text-xs font-medium text-warm-white/30">
                    {String(ep.episode).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm font-medium text-warm-white group-hover:text-gold transition-colors">
                      {ep.title}
                    </p>
                    <p className="font-sans text-xs text-warm-white/40">
                      {ep.country} · {ep.duration}
                    </p>
                  </div>
                  <span className="text-warm-white/20 transition-colors group-hover:text-gold">
                    →
                  </span>
                </Link>
              ))}
              <Link
                href="/europe"
                className="block pt-2 font-sans text-xs tracking-widest text-gold uppercase hover:text-warm-white transition-colors"
              >
                + 6 more episodes
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Travel Hacks */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader
              eyebrow="Tips & Tactics"
              headline="Travel Hacks"
              subtext="The hard-won lessons from 200+ travel days as a family."
            />
            <Link
              href="/travel-hacks"
              className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block"
            >
              All Tips →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TRAVEL_HACKS.map((hack) => (
              <Link key={hack.slug} href={`/travel-hacks/${hack.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image
                    src={hack.image}
                    alt={hack.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">
                    {hack.category} · {hack.readTime} read
                  </p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">
                    {hack.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Email Signup */}
      <EmailSignup />

      {/* 8. From the Journal */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow="Writing" headline="From the Journal" />
            <Link
              href="/journal"
              className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block"
            >
              All Posts →
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {JOURNAL_POSTS.map((post) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">
                    {post.category} · {formatDate(post.date)}
                  </p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 font-sans text-sm leading-relaxed text-ink/55">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
