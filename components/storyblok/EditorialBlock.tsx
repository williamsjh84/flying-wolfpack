import Image from "next/image";
import Link from "next/link";
import { storyblokEditable } from "@storyblok/react/rsc";
import Button from "@/components/ui/Button";
import type { StoryblokAsset, StoryblokBlok, StoryblokLink } from "@/lib/storyblok-types";
import { storyblokAssetAlt, storyblokAssetUrl, storyblokLinkHref } from "@/lib/storyblok-types";

type EditorialBlok = StoryblokBlok & {
  theme?: "light" | "dark" | "mist";
  eyebrow?: string;
  headline?: string;
  text?: string;
  secondary_text?: string;
  image?: StoryblokAsset;
  image_position?: "left" | "right";
  cta_label?: string;
  cta_link?: StoryblokLink;
};

export default function EditorialBlock({ blok }: { blok: EditorialBlok }) {
  const dark = blok.theme === "dark";
  const background = dark ? "bg-ocean" : blok.theme === "mist" ? "bg-mist" : "bg-warm-white";
  const imageUrl = storyblokAssetUrl(blok.image);
  const copy = (
    <div className={blok.image_position === "left" ? "lg:order-2" : ""}>
      {blok.eyebrow && <p className={`mb-4 font-sans text-xs tracking-[0.2em] uppercase ${dark ? "text-gold" : "text-earth"}`}>{blok.eyebrow}</p>}
      <h2 className={`font-serif text-4xl font-bold italic leading-tight sm:text-5xl ${dark ? "text-warm-white" : "text-ink"}`}>{blok.headline}</h2>
      {blok.text && <p className={`mt-6 whitespace-pre-line font-sans text-lg leading-relaxed ${dark ? "text-warm-white/70" : "text-ink/60"}`}>{blok.text}</p>}
      {blok.secondary_text && <p className={`mt-4 whitespace-pre-line font-sans text-base leading-relaxed ${dark ? "text-warm-white/55" : "text-ink/50"}`}>{blok.secondary_text}</p>}
      {blok.cta_label && (
        <div className="mt-8">
          <Link href={storyblokLinkHref(blok.cta_link)}><Button variant={dark ? "outline" : "secondary"}>{blok.cta_label}</Button></Link>
        </div>
      )}
    </div>
  );

  return (
    <section {...storyblokEditable(blok)} className={`${background} py-24`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {imageUrl ? (
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {copy}
            <div className={`relative aspect-[4/3] overflow-hidden ${blok.image_position === "left" ? "lg:order-1" : ""}`}>
              <Image src={imageUrl} alt={storyblokAssetAlt(blok.image, blok.headline || "Travel story")} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        ) : <div className="mx-auto max-w-3xl">{copy}</div>}
      </div>
    </section>
  );
}
