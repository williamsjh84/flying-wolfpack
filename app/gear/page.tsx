import type { Metadata } from "next";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EmailSignup from "@/components/sections/EmailSignup";
import Badge from "@/components/ui/Badge";
import { getGearItems } from "@/lib/content";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";

export const metadata: Metadata = {
  title: "Gear",
  description:
    "The exact bags, tech, and travel gear we use on every trip. Tested on four continents, approved by two kids.",
};

const CATEGORIES = ["All", "Camera", "Bags", "Tech", "Connectivity", "Kids Gear"];

export default async function GearPage() {
  const story = await getPublishedStory("gear");
  if (story) return <StoryblokPublishedStory story={story} />;

  const gearItems = getGearItems();

  return (
    <PageWrapper>
      <Hero
        eyebrow="What We Actually Use"
        headline="Our Gear"
        subheadline="Tested on four continents, approved by two kids. This is every piece of gear that made the cut — and why."
        backgroundImage="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1600&h=900&fit=crop"
      />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Gear Guide"
            headline="Everything We Carry"
            subtext="Affiliate links help keep the lights on. We only list gear we've actually used and would buy again."
            className="mb-12"
          />

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`border px-4 py-2 font-sans text-sm tracking-wide transition-colors ${
                  i === 0
                    ? "border-ink bg-ink text-warm-white"
                    : "border-mist text-ink/60 hover:border-earth hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {gearItems.map((item: any) => (
              <div key={item.slug} className="group flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-1 flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    {item.category && <Badge variant="default">{item.category}</Badge>}
                    {item.rating && (
                      <span className="font-sans text-xs text-ink/40">{item.rating} ★</span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold italic text-ink">{item.name}</h3>
                  {item.summary && (
                    <p className="font-sans text-sm leading-relaxed text-ink/55">{item.summary}</p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-4">
                    {item.price && (
                      <span className="font-sans text-sm font-medium text-ocean">{item.price}</span>
                    )}
                    {item.affiliateUrl && item.affiliateUrl !== "#" && (
                      <a
                        href={item.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-xs tracking-widest text-earth uppercase hover:text-ink transition-colors"
                      >
                        Shop →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </PageWrapper>
  );
}
