import { storyblokEditable } from "@storyblok/react/rsc";
import type { StoryblokBlok } from "@/lib/storyblok-types";

type ListItem = StoryblokBlok & { text?: string; title?: string; description?: string };
type ListBlok = StoryblokBlok & {
  eyebrow?: string;
  headline?: string;
  theme?: "light" | "dark";
  items?: ListItem[];
};

export default function ListBlock({ blok }: { blok: ListBlok }) {
  const dark = blok.theme === "dark";
  return (
    <section {...storyblokEditable(blok)} className={`${dark ? "bg-ocean" : "bg-warm-white"} py-20`}>
      <div className="mx-auto max-w-4xl px-6">
        {blok.eyebrow && <p className={`mb-3 font-sans text-xs tracking-[0.2em] uppercase ${dark ? "text-gold" : "text-earth"}`}>{blok.eyebrow}</p>}
        <h2 className={`mb-8 font-serif text-3xl font-bold italic ${dark ? "text-warm-white" : "text-ink"}`}>{blok.headline}</h2>
        <div className="space-y-5">
          {blok.items?.map((item, index) => (
            <div key={item._uid} {...storyblokEditable(item)} className="flex gap-4">
              <span className={`mt-0.5 h-6 w-6 shrink-0 rounded-full text-center font-sans text-xs font-medium leading-6 ${dark ? "bg-gold/20 text-gold" : "bg-mist text-earth"}`}>{index + 1}</span>
              <div>
                {item.title && <h3 className={`font-serif text-xl font-bold italic ${dark ? "text-warm-white" : "text-ink"}`}>{item.title}</h3>}
                <p className={`whitespace-pre-line font-sans text-base leading-relaxed ${dark ? "text-warm-white/75" : "text-ink/65"}`}>{item.text || item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
