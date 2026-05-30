import type { Metadata } from "next";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import DestinationCard from "@/components/sections/DestinationCard";
import SectionHeader from "@/components/sections/SectionHeader";
import { FEATURED_DESTINATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Every country, city, and island we've explored as a family — with honest reviews and practical itineraries.",
};

export default function DestinationsPage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="The World, Family-Sized"
        headline="Destinations"
        subheadline="Every place we've taken our family — honestly reviewed, practically documented, beautifully remembered."
        backgroundImage="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&h=900&fit=crop"
      />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Explore"
            headline="All Destinations"
            subtext="Filtered by region, family-friendliness, and how many times we had to apologize in a different language."
            className="mb-12"
          />

          {/* Filter pills — placeholder */}
          <div className="mb-10 flex flex-wrap gap-2">
            {["All", "Europe", "Asia", "Americas", "Coming Soon"].map((filter) => (
              <button
                key={filter}
                className="border border-mist px-4 py-2 font-sans text-sm tracking-wide text-ink/60 hover:border-earth hover:text-ink transition-colors first:bg-ink first:text-warm-white first:border-ink"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DESTINATIONS.map((dest) => (
              <DestinationCard key={dest.slug} {...dest} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
