import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { StoryblokAsset, StoryblokBlok } from "@/lib/storyblok-types";
import { storyblokAssetAlt, storyblokAssetUrl } from "@/lib/storyblok-types";

type GalleryBlok = StoryblokBlok & {
  eyebrow?: string;
  headline?: string;
  images?: StoryblokAsset[];
};

export default function GalleryBlock({ blok }: { blok: GalleryBlok }) {
  return (
    <section {...storyblokEditable(blok)} className="bg-warm-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {blok.eyebrow && <p className="mb-3 font-sans text-xs tracking-[0.2em] text-earth uppercase">{blok.eyebrow}</p>}
        <h2 className="mb-10 font-serif text-4xl font-bold italic text-ink">{blok.headline}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {blok.images?.map((asset, index) => {
            const src = storyblokAssetUrl(asset);
            if (!src) return null;
            return (
              <div key={`${src}-${index}`} className={`relative overflow-hidden bg-mist ${index === 0 ? "aspect-[16/9] sm:col-span-2" : "aspect-[4/3]"}`}>
                <Image src={src} alt={storyblokAssetAlt(asset, `${blok.headline || "Gallery"} photo ${index + 1}`)} fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
