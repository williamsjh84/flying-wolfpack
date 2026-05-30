import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import EmailSignup from "@/components/sections/EmailSignup";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { getEpisodes, getEpisodeBySlug } from "@/lib/content";

interface Props {
  params: Promise<{ episode: string }>;
}

export async function generateStaticParams() {
  return getEpisodes().map((ep: any) => ({ episode: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { episode: slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  return {
    title: `${ep.title}, ${ep.country} — Ep. ${String(ep.episode).padStart(2, "0")}`,
    description: ep.description,
  };
}

/* Prague-specific content */
const PRAGUE_CONTENT = {
  summary: `Prague was supposed to be a three-day warm-up before the real trip began. It turned into five days and the city that set the tone for everything that followed. Medieval, walkable, impossibly photogenic — and genuinely one of the most family-friendly cities we've ever visited.`,
  itinerary: [
    {
      day: "Day 1",
      title: "Old Town & the Charles Bridge at Dawn",
      description:
        "We woke up at 6am to beat the crowds to Charles Bridge. It worked. For forty minutes we had one of Europe's most famous landmarks almost entirely to ourselves. By 9am it was shoulder-to-shoulder — so the early alarm was 100% worth it.",
    },
    {
      day: "Day 2",
      title: "Prague Castle & Malá Strana",
      description:
        "The castle complex is enormous — budget the full morning. We did the basic circuit with kids: St. Vitus Cathedral, the Golden Lane, and the Old Royal Palace. Then lunch in Malá Strana before the meltdown that didn't make the final cut.",
    },
    {
      day: "Day 3",
      title: "Žižkov & the TV Tower",
      description:
        "The TV Tower is either hideous or brilliant depending on your taste — the babies crawling up the outside sealed it as brilliant for us. Žižkov is Prague's most lived-in neighborhood and where we found the best food of the trip.",
    },
    {
      day: "Day 4",
      title: "Day trip to Kutná Hora",
      description:
        "The Sedlec Ossuary (Bone Church) is genuinely one of the strangest places we've ever taken our kids — and they absolutely loved it. The cathedral of St. Barbara is stunning. Day trip from Prague takes about an hour each way.",
    },
    {
      day: "Day 5",
      title: "Slow morning, afternoon markets",
      description:
        "Farmer's market on Náměstí Míru, chimney cakes on the square, and the world's most relaxed final afternoon. We didn't plan anything and it was perfect.",
    },
  ],
  familyTips: [
    "Book Prague Castle tickets online — the queues are genuinely brutal without them",
    "The tram system is excellent and kids under 6 ride free",
    "Trdelník (chimney cake) is a tourist trap but your kids won't care — just buy one",
    "Stay west of the river in Malá Strana or Hradčany for a quieter base",
    "The astronomical clock show is anticlimactic — watch it once, move on",
  ],
  budget: [
    { item: "5 nights accommodation (apartment)", cost: "$620", perDay: "$124" },
    { item: "Food & drink (family of 4)", cost: "$380", perDay: "$76" },
    { item: "Attractions & entry fees", cost: "$90", perDay: "$18" },
    { item: "Transport (trams + day trip)", cost: "$85", perDay: "$17" },
    { item: "Total", cost: "$1,175", perDay: "$235" },
  ],
  chaosMoment: `On day two, our five-year-old decided halfway up the castle hill that she would not take another step. We had a full audience. A kind Czech grandmother appeared from nowhere, handed her a biscuit, said something we couldn't understand, and the crisis was over. The grandmother disappeared before we could thank her. We think about her often.`,
  photos: [
    "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1592906209472-a36b1f3782ef?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1519491050282-cf00c82424b5?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  ],
};

export default async function EpisodePage({ params }: Props) {
  const { episode: slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) notFound();

  const allEpisodes = getEpisodes();
  const isPrague = slug === "prague";
  const nextEp = allEpisodes.find((e: any) => e.episode === ep.episode + 1);
  const prevEp = allEpisodes.find((e: any) => e.episode === ep.episode - 1);

  return (
    <PageWrapper>
      {/* Cinematic hero */}
      <div className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src={ep.image}
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
              Episode {String(ep.episode).padStart(2, "0")} · The Europe Summer Series
            </p>
            <h1 className="font-serif text-5xl font-bold italic text-warm-white sm:text-7xl">
              {ep.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-2xl">{ep.flag}</span>
              <Badge variant="gold">{ep.country}</Badge>
              <span className="font-sans text-sm text-warm-white/60">{ep.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Episode summary */}
      <section className="bg-warm-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-sans text-xl leading-relaxed text-ink/70 italic">
            {isPrague ? PRAGUE_CONTENT.summary : ep.description}
          </p>
        </div>
      </section>

      {/* YouTube embed — skip for photo-only episodes */}
      {!ep.photoOnly && (
        <section className="bg-mist py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="relative aspect-video bg-ink flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warm-white/10 backdrop-blur">
                  <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7 ml-1" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-warm-white/50">
                  Episode {ep.episode}: {ep.title}
                </p>
                <p className="mt-1 font-sans text-xs text-warm-white/30">YouTube embed goes here</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Prague-specific rich content */}
      {isPrague && (
        <>
          {/* Itinerary */}
          <section className="bg-warm-white py-24">
            <div className="mx-auto max-w-4xl px-6">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Day by Day</p>
              <h2 className="mb-12 font-serif text-4xl font-bold italic text-ink">
                5-Day Prague Itinerary
              </h2>
              <div className="space-y-10">
                {PRAGUE_CONTENT.itinerary.map((day) => (
                  <div key={day.day} className="grid gap-4 border-l-2 border-mist pl-6 sm:grid-cols-[120px_1fr]">
                    <div>
                      <span className="font-sans text-xs font-medium tracking-widest text-earth uppercase">
                        {day.day}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold italic text-ink">{day.title}</h3>
                      <p className="mt-2 font-sans text-base leading-relaxed text-ink/60">
                        {day.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Family tips */}
          <section className="bg-ocean py-24">
            <div className="mx-auto max-w-4xl px-6">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">
                Practical Knowledge
              </p>
              <h2 className="mb-10 font-serif text-4xl font-bold italic text-warm-white">
                Family Tips for Prague
              </h2>
              <ul className="space-y-4">
                {PRAGUE_CONTENT.familyTips.map((tip, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gold/20 text-center font-sans text-xs font-medium leading-5 text-gold">
                      {i + 1}
                    </span>
                    <p className="font-sans text-base leading-relaxed text-warm-white/75">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Budget breakdown */}
          <section className="bg-warm-white py-24">
            <div className="mx-auto max-w-4xl px-6">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">
                Full Transparency
              </p>
              <h2 className="mb-10 font-serif text-4xl font-bold italic text-ink">
                What We Actually Spent
              </h2>
              <div className="overflow-hidden border border-mist">
                <table className="w-full font-sans text-sm">
                  <thead className="bg-mist">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-widest text-ink/50 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium tracking-widest text-ink/50 uppercase">
                        Total
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium tracking-widest text-ink/50 uppercase">
                        Per Day
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mist">
                    {PRAGUE_CONTENT.budget.map((row, i) => (
                      <tr
                        key={row.item}
                        className={i === PRAGUE_CONTENT.budget.length - 1 ? "bg-mist/50 font-semibold" : ""}
                      >
                        <td className="px-6 py-4 text-ink">{row.item}</td>
                        <td className="px-6 py-4 text-right text-ocean">{row.cost}</td>
                        <td className="px-6 py-4 text-right text-ink/50">{row.perDay}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 font-sans text-xs text-ink/40">
                Family of 4 · 5 nights · June 2023. All prices in USD. Excludes flights (used points).
              </p>
            </div>
          </section>

          {/* Chaos moment */}
          <section className="bg-mist py-16">
            <div className="mx-auto max-w-3xl px-6">
              <div className="border-l-4 border-gold pl-8">
                <p className="mb-3 font-sans text-xs font-medium tracking-widest text-gold uppercase">
                  Chaos Moment
                </p>
                <p className="font-serif text-xl italic leading-relaxed text-ink">
                  &ldquo;{PRAGUE_CONTENT.chaosMoment}&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* Photo gallery */}
          <section className="bg-warm-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">
                Photo Gallery
              </p>
              <h2 className="mb-10 font-serif text-4xl font-bold italic text-ink">Prague in Frame</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {PRAGUE_CONTENT.photos.map((photo, i) => (
                  <div key={i} className={`relative overflow-hidden ${i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                      src={photo}
                      alt={`Prague photo ${i + 1}`}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Photo-only episodes (Belgium, Netherlands, etc.) */}
      {!isPrague && ep.photoOnly && (
        <>
          {/* Story intro */}
          <section className="bg-warm-white py-20">
            <div className="mx-auto max-w-3xl px-6">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">In pictures</p>
              <h2 className="mb-6 font-serif text-4xl font-bold italic text-ink">
                {ep.title} Through the Lens
              </h2>
              <p className="font-sans text-lg leading-relaxed text-ink/65">
                {ep.storyText || ep.description}
              </p>
            </div>
          </section>

          {/* Photo gallery — populated from uploads folder */}
          <section className="bg-mist py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">Gallery</p>
              <h2 className="mb-8 font-serif text-3xl font-bold italic text-ink">
                {ep.title} in Frame
              </h2>

              {/* Upload placeholder grid — replace src with /uploads/europe/{slug}/photo.jpg */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden bg-warm-white/80 border border-mist flex items-center justify-center ${
                      i === 0 ? "sm:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                    }`}
                  >
                    <div className="text-center px-4">
                      <p className="font-sans text-xs text-ink/30 leading-relaxed">
                        /uploads/europe/{ep.slug}/photo-{i + 1}.jpg
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-sans text-xs text-ink/40">
                Drop your photos in{" "}
                <code className="bg-warm-white px-1.5 py-0.5 text-ocean">
                  public/uploads/europe/{ep.slug}/
                </code>{" "}
                and they&apos;ll appear here.
              </p>
            </div>
          </section>

          {/* Highlights */}
          <section className="bg-ocean py-20">
            <div className="mx-auto max-w-4xl px-6">
              <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">Highlights</p>
              <h2 className="mb-8 font-serif text-3xl font-bold italic text-warm-white">
                Don&apos;t Miss in {ep.title}
              </h2>
              <ul className="space-y-4">
                {(ep.highlights || []).map((tip: string, i: number) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-gold/20 text-center font-sans text-xs font-medium leading-5 text-gold">
                      {i + 1}
                    </span>
                    <p className="font-sans text-base leading-relaxed text-warm-white/75">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* Standard non-video, non-photo-only placeholder */}
      {!isPrague && !ep.photoOnly && (
        <section className="bg-warm-white py-24">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-sans text-lg leading-relaxed text-ink/60">
              Full episode guide coming soon. Subscribe to be notified when new episodes drop.
            </p>
          </div>
        </section>
      )}

      {/* Episode navigation */}
      <section className="bg-mist py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            {prevEp ? (
              <Link
                href={`/europe/${prevEp.slug}`}
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
                href={`/europe/${nextEp.slug}`}
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
