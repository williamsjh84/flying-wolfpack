import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import EmailSignup from "@/components/sections/EmailSignup";
import Badge from "@/components/ui/Badge";
import { getEpisodes, getEpisodeBySlug } from "@/lib/content";

interface Props {
  params: Promise<{ episode: string }>;
}

export async function generateStaticParams() {
  return getEpisodes("uk").map((ep: any) => ({ episode: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { episode: slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  return {
    title: `${ep.title} — UK Series Ep. ${String(ep.episode).padStart(2, "0")}`,
    description: ep.description,
  };
}

export default async function UKEpisodePage({ params }: Props) {
  const { episode: slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep || ep.series !== "uk") notFound();

  const allUK = getEpisodes("uk");
  const prevEp = allUK.find((e: any) => e.episode === ep.episode - 1);
  const nextEp = allUK.find((e: any) => e.episode === ep.episode + 1);

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <Image src={ep.heroImage || ep.image} alt={ep.title} fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="mb-3 font-sans text-xs tracking-[0.25em] text-gold uppercase">
            Episode {String(ep.episode).padStart(2, "0")} · The United Kingdom Series
          </p>
          <h1 className="font-serif text-5xl font-bold italic text-warm-white sm:text-7xl">{ep.title}</h1>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-2xl">{ep.flag}</span>
            <Badge variant="gold">{ep.country}</Badge>
            {ep.duration && <span className="font-sans text-sm text-warm-white/60">{ep.duration}</span>}
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-sans text-xl italic leading-relaxed text-ink/70">{ep.description}</p>
        </div>
      </section>

      {/* YouTube */}
      {ep.youtubeId ? (
        <section className="bg-mist py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ep.youtubeId}`}
                title={ep.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* Coming soon + photo grid */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Full guide</p>
          <h2 className="mb-6 font-serif text-4xl font-bold italic text-ink">{ep.title} — Coming Soon</h2>
          <p className="font-sans text-lg leading-relaxed text-ink/60">{ep.comingSoonText}</p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex aspect-[4/3] items-center justify-center bg-mist">
                <p className="font-sans text-xs text-ink/30">/uploads/uk/{slug}/photo-{i + 1}.jpg</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      {ep.highlights && ep.highlights.length > 0 && (
        <section className="bg-ocean py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">Highlights</p>
            <h2 className="mb-8 font-serif text-3xl font-bold italic text-warm-white">Don&apos;t Miss in {ep.title}</h2>
            <ul className="space-y-4">
              {ep.highlights.map((tip: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gold/20 text-center font-sans text-xs font-medium leading-5 text-gold">{i + 1}</span>
                  <p className="font-sans text-base leading-relaxed text-warm-white/75">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Episode nav */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prevEp ? (
              <Link href={`/uk/${prevEp.slug}`} className="flex items-center gap-3 text-ink/60 hover:text-ink transition-colors">
                <span className="text-lg">←</span>
                <div>
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">Previous</p>
                  <p className="font-serif text-lg font-bold italic">{prevEp.title}</p>
                </div>
              </Link>
            ) : <div />}
            {nextEp && (
              <Link href={`/uk/${nextEp.slug}`} className="flex items-center gap-3 text-right text-ink/60 hover:text-ink transition-colors">
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
