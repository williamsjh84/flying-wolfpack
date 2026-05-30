import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import EmailSignup from "@/components/sections/EmailSignup";
import Badge from "@/components/ui/Badge";

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
    heroImage: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=1600&h=900&fit=crop",
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
    heroImage: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1600&h=900&fit=crop",
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
    heroImage: "https://images.unsplash.com/photo-1589458782169-c8b5bf7e9a91?w=1600&h=900&fit=crop",
  },
];

interface Props {
  params: Promise<{ episode: string }>;
}

export async function generateStaticParams() {
  return UK_EPISODES.map((ep) => ({ episode: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { episode: slug } = await params;
  const ep = UK_EPISODES.find((e) => e.slug === slug);
  if (!ep) return {};
  return {
    title: `${ep.title} — UK Series Ep. ${String(ep.episode).padStart(2, "0")}`,
    description: ep.description,
  };
}

export default async function UKEpisodePage({ params }: Props) {
  const { episode: slug } = await params;
  const ep = UK_EPISODES.find((e) => e.slug === slug);
  if (!ep) notFound();

  const prevEp = UK_EPISODES.find((e) => e.episode === ep.episode - 1);
  const nextEp = UK_EPISODES.find((e) => e.episode === ep.episode + 1);

  return (
    <PageWrapper>
      {/* Cinematic hero */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src={ep.heroImage}
          alt={ep.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="mb-3 font-sans text-xs tracking-[0.25em] text-gold uppercase">
              Episode {String(ep.episode).padStart(2, "0")} · The United Kingdom Series
            </p>
            <h1 className="font-serif text-5xl font-bold italic text-warm-white sm:text-7xl">
              {ep.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-2xl">{ep.flag}</span>
              <Badge variant="gold">{ep.country}</Badge>
              {ep.duration && (
                <span className="font-sans text-sm text-warm-white/60">{ep.duration}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-sans text-xl italic leading-relaxed text-ink/70">
            {ep.description}
          </p>
        </div>
      </section>

      {/* YouTube placeholder */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative flex aspect-video items-center justify-center bg-ink">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warm-white/10 backdrop-blur">
                <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-7 w-7" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-sans text-sm text-warm-white/50">
                Episode {ep.episode}: {ep.title}
              </p>
              <p className="mt-1 font-sans text-xs text-warm-white/30">Video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content placeholder */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">
            Full guide
          </p>
          <h2 className="mb-6 font-serif text-4xl font-bold italic text-ink">
            {ep.title} — Coming Soon
          </h2>
          <p className="font-sans text-lg leading-relaxed text-ink/60">
            Full itinerary, family tips, budget breakdown and photo gallery coming once we&apos;ve
            finished editing. Subscribe below to be notified when it drops.
          </p>

          {/* Photo gallery placeholder — ready for real uploads */}
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] bg-mist flex items-center justify-center"
              >
                <p className="font-sans text-xs text-ink/30">
                  /uploads/uk/{ep.slug}/photo-{i + 1}.jpg
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Episode navigation */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prevEp ? (
              <Link
                href={`/uk/${prevEp.slug}`}
                className="group flex items-center gap-3 text-ink/60 hover:text-ink transition-colors"
              >
                <span className="text-lg">←</span>
                <div>
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">Previous</p>
                  <p className="font-serif text-lg font-bold italic">{prevEp.title}</p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextEp && (
              <Link
                href={`/uk/${nextEp.slug}`}
                className="group flex items-center gap-3 text-right text-ink/60 hover:text-ink transition-colors"
              >
                <div>
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">Next Episode</p>
                  <p className="font-serif text-lg font-bold italic">{nextEp.title}</p>
                </div>
                <span className="text-lg">→</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <EmailSignup />
    </PageWrapper>
  );
}
