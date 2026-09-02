import { storyblokEditable } from "@storyblok/react/rsc";
import Hero from "@/components/sections/Hero";
import type { StoryblokAsset, StoryblokBlok, StoryblokLink } from "@/lib/storyblok-types";
import { storyblokAssetUrl, storyblokLinkHref } from "@/lib/storyblok-types";

type HeroBlok = StoryblokBlok & {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  cta_label?: string;
  cta_link?: StoryblokLink;
  background_image?: StoryblokAsset;
};

export default function HeroBlock({ blok }: { blok: HeroBlok }) {
  return (
    <div {...storyblokEditable(blok)}>
      <Hero
        eyebrow={blok.eyebrow || ""}
        headline={blok.headline || ""}
        subheadline={blok.subheadline || ""}
        ctaLabel={blok.cta_label}
        ctaHref={storyblokLinkHref(blok.cta_link, "/destinations")}
        backgroundImage={storyblokAssetUrl(blok.background_image)}
      />
    </div>
  );
}
