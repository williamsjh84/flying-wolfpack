import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { StoryblokAsset, StoryblokBlok, StoryblokLink } from "@/lib/storyblok-types";
import { storyblokAssetAlt, storyblokAssetUrl, storyblokLinkHref } from "@/lib/storyblok-types";

type CardItem = StoryblokBlok & {
  eyebrow?: string;
  title?: string;
  summary?: string;
  meta?: string;
  image?: StoryblokAsset;
  link?: StoryblokLink;
};

type CardGridBlok = StoryblokBlok & {
  theme?: "light" | "mist" | "dark";
  eyebrow?: string;
  headline?: string;
  subtext?: string;
  cards?: CardItem[];
};

export default function CardGridBlock({ blok }: { blok: CardGridBlok }) {
  const dark = blok.theme === "dark";
  const background = dark ? "bg-ocean" : blok.theme === "mist" ? "bg-mist" : "bg-warm-white";

  return (
    <section {...storyblokEditable(blok)} className={`${background} py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          {blok.eyebrow && <p className={`mb-3 font-sans text-xs tracking-[0.2em] uppercase ${dark ? "text-gold" : "text-earth"}`}>{blok.eyebrow}</p>}
          <h2 className={`font-serif text-4xl font-bold italic sm:text-5xl ${dark ? "text-warm-white" : "text-ink"}`}>{blok.headline}</h2>
          {blok.subtext && <p className={`mt-4 font-sans text-base leading-relaxed ${dark ? "text-warm-white/60" : "text-ink/60"}`}>{blok.subtext}</p>}
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blok.cards?.map((card) => {
            const imageUrl = storyblokAssetUrl(card.image);
            return (
              <Link key={card._uid} {...storyblokEditable(card)} href={storyblokLinkHref(card.link)} className="group block">
                {imageUrl && (
                  <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                    <Image src={imageUrl} alt={storyblokAssetAlt(card.image, card.title || "Travel card")} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {card.eyebrow && <p className={`font-sans text-xs tracking-widest uppercase ${dark ? "text-gold" : "text-earth"}`}>{card.eyebrow}</p>}
                  <h3 className={`font-serif text-xl font-bold italic leading-snug transition-colors ${dark ? "text-warm-white group-hover:text-gold" : "text-ink group-hover:text-ocean"}`}>{card.title}</h3>
                  {card.summary && <p className={`line-clamp-3 font-sans text-sm leading-relaxed ${dark ? "text-warm-white/55" : "text-ink/55"}`}>{card.summary}</p>}
                  {card.meta && <p className={`font-sans text-xs ${dark ? "text-warm-white/35" : "text-ink/35"}`}>{card.meta}</p>}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
