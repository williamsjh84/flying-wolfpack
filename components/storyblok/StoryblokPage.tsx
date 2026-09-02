import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";
import type { StoryblokBlok } from "@/lib/storyblok-types";

export default function StoryblokPage({ blok }: { blok: StoryblokBlok & { body?: StoryblokBlok[] } }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
