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
import { getPage, getEpisodes, getDestinations, getTravelHacks, getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Flying Wolfpack — Family Travel" };

export default function HomePage() {
  const p = getPage("home");
  const episodes = getEpisodes().slice(0, 3);
  const destinations = getDestinations();
  const hacks = getTravelHacks();
  const posts = getJournalPosts();

  return (
    <PageWrapper>
      <Hero
        eyebrow={p.heroEyebrow}
        headline={p.heroHeadline}
        subheadline={p.heroSubheadline}
        ctaLabel={p.heroCtaLabel}
        ctaHref={p.heroCtaHref}
        backgroundImage={p.heroImage}
      />

      {/* Current Journey */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">
                {p.currentJourneyEyebrow}
              </p>
              <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
                {p.currentJourneyHeadline}
              </h2>
              <p className="mt-6 font-sans text-lg leading-relaxed text-ink/60">{p.currentJourneyBody}</p>
              <p className="mt-4 font-sans text-base leading-relaxed text-ink/50">{p.currentJourneyBody2}</p>
              <div className="mt-8">
                <Link href={p.currentJourneyCtaHref || "/europe"}>
                  <Button variant="secondary" size="md">{p.currentJourneyCtaLabel}</Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={p.currentJourneyImage} alt="Family travel" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Episodes */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow={p.episodesEyebrow} headline={p.episodesHeadline} />
            <Link href="/europe" className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block">View All →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {episodes.map((ep: any) => <EpisodeCard key={ep.slug} {...ep} />)}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow={p.destinationsEyebrow} headline={p.destinationsHeadline} />
            <Link href="/destinations" className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block">All Destinations →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest: any) => <DestinationCard key={dest.slug} {...dest} />)}
          </div>
        </div>
      </section>

      {/* Europe Documentary */}
      <section className="bg-ocean py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeader eyebrow={p.europeEyebrow} headline={p.europeHeadline} subtext={p.europeSubtext} light />
              <div className="mt-8">
                <Link href={p.europeCtaHref || "/europe"}>
                  <Button variant="outline" size="md">{p.europeCtaLabel}</Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {getEpisodes().slice(0, 5).map((ep: any) => (
                <Link key={ep.slug} href={`/europe/${ep.slug}`} className="group flex items-center gap-4 border-b border-warm-white/10 pb-4 last:border-0 hover:border-warm-white/30 transition-colors">
                  <span className="w-8 shrink-0 font-sans text-xs font-medium text-warm-white/30">{String(ep.episode).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-sm font-medium text-warm-white group-hover:text-gold transition-colors">{ep.title}</p>
                    <p className="font-sans text-xs text-warm-white/40">{ep.country}{ep.duration ? ` · ${ep.duration}` : ""}</p>
                  </div>
                  <span className="text-warm-white/20 transition-colors group-hover:text-gold">→</span>
                </Link>
              ))}
              <Link href="/europe" className="block pt-2 font-sans text-xs tracking-widest text-gold uppercase hover:text-warm-white transition-colors">+ more episodes</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Hacks */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow={p.hacksEyebrow} headline={p.hacksHeadline} subtext={p.hacksSubtext} />
            <Link href="/travel-hacks" className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block">All Tips →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {hacks.map((hack: any) => (
              <Link key={hack.slug} href={`/travel-hacks/${hack.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image src={hack.image} alt={hack.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">{hack.category} · {hack.readTime} read</p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">{hack.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup headline={p.emailHeadline} subheadline={p.emailSubheadline} />

      {/* Journal */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <SectionHeader eyebrow={p.journalEyebrow} headline={p.journalHeadline} />
            <Link href="/journal" className="hidden font-sans text-sm tracking-widest text-earth uppercase hover:text-ink transition-colors md:block">All Posts →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((post: any) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image src={post.image} alt={post.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">{post.category} · {formatDate(post.date)}</p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">{post.title}</h3>
                  <p className="line-clamp-2 font-sans text-sm leading-relaxed text-ink/55">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
