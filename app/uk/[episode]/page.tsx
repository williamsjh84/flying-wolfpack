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
  const ep = getEpisodeBySlug(slug, "uk");
  if (!ep) notFound();

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

      {/* Episode Notes (body content from Tina) */}
      {ep.body && ep.body.trim() && (
        <section className="bg-warm-white py-16">
          <div className="mx-auto max-w-3xl px-6 space-y-5">
            {ep.body.trim().split("\n\n").filter(Boolean).map((para: string, i: number) => (
              <p key={i} className="font-sans text-lg leading-relaxed text-ink/65">{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Coming soon text */}
      {ep.comingSoonText && (
        <section className="bg-warm-white py-16">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Full guide</p>
            <h2 className="mb-6 font-serif text-4xl font-bold italic text-ink">{ep.title} — Coming Soon</h2>
            <p className="font-sans text-lg leading-relaxed text-ink/60">{ep.comingSoonText}</p>
          </div>
        </section>
      )}

      {/* Photo gallery — real photos from Tina, or placeholders */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Gallery</p>
          <h2 className="mb-8 font-serif text-3xl font-bold italic text-ink">{ep.title} in Frame</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ep.photos && ep.photos.length > 0 ? (
              ep.photos.map((photo: string, i: number) => (
                <div key={i} className={`relative overflow-hidden ${i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Image
                    src={photo}
                    alt={`${ep.title} photo ${i + 1}`}
                    fill
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))
            ) : (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex aspect-[4/3] items-center justify-center border border-mist bg-warm-white/80">
                  <p className="font-sans text-xs text-ink/30">Add photos in Tina → UK Episodes → {slug} → Photo Gallery</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Itinerary */}
      {ep.itinerary && ep.itinerary.length > 0 && (
        <section className="bg-warm-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Day by Day</p>
            <h2 className="mb-12 font-serif text-4xl font-bold italic text-ink">{ep.itinerary.length}-Day {ep.title} Itinerary</h2>
            <div className="space-y-10">
              {ep.itinerary.map((day: any) => (
                <div key={day.day} className="grid gap-4 border-l-2 border-mist pl-6 sm:grid-cols-[120px_1fr]">
                  <span className="font-sans text-xs font-medium tracking-widest text-earth uppercase">{day.day}</span>
                  <div>
                    <h3 className="font-serif text-xl font-bold italic text-ink">{day.title}</h3>
                    <p className="mt-2 font-sans text-base leading-relaxed text-ink/60">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Family Tips */}
      {ep.familyTips && ep.familyTips.length > 0 && (
        <section className="bg-ocean py-24">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">Practical Knowledge</p>
            <h2 className="mb-10 font-serif text-4xl font-bold italic text-warm-white">Family Tips for {ep.title}</h2>
            <ul className="space-y-4">
              {ep.familyTips.map((tip: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gold/20 text-center font-sans text-xs font-medium leading-5 text-gold">{i + 1}</span>
                  <p className="font-sans text-base leading-relaxed text-warm-white/75">{tip}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Budget */}
      {ep.budget && ep.budget.length > 0 && (
        <section className="bg-warm-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Full Transparency</p>
            <h2 className="mb-10 font-serif text-4xl font-bold italic text-ink">What We Actually Spent</h2>
            <div className="overflow-hidden border border-mist">
              <table className="w-full font-sans text-sm">
                <thead className="bg-mist">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium tracking-widest text-ink/50 uppercase">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-widest text-ink/50 uppercase">Total</th>
                    <th className="px-6 py-3 text-right text-xs font-medium tracking-widest text-ink/50 uppercase">Per Day</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist">
                  {ep.budget.map((row: any, i: number) => (
                    <tr key={row.item} className={i === ep.budget.length - 1 ? "bg-mist/50 font-semibold" : ""}>
                      <td className="px-6 py-4 text-ink">{row.item}</td>
                      <td className="px-6 py-4 text-right text-ocean">{row.cost}</td>
                      <td className="px-6 py-4 text-right text-ink/50">{row.perDay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 font-sans text-xs text-ink/40">Family of 4. All prices in USD. Excludes flights.</p>
          </div>
        </section>
      )}

      {/* Chaos Moment */}
      {ep.chaosMoment && (
        <section className="bg-mist py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="border-l-4 border-gold pl-8">
              <p className="mb-3 font-sans text-xs font-medium tracking-widest text-gold uppercase">Chaos Moment</p>
              <p className="font-serif text-xl italic leading-relaxed text-ink">&ldquo;{ep.chaosMoment}&rdquo;</p>
            </div>
          </div>
        </section>
      )}

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
