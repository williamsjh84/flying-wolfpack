import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EmailSignup from "@/components/sections/EmailSignup";
import { TRAVEL_HACKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Travel Hacks",
  description: "Hard-won lessons from 200+ travel days as a family. Points, packing, flying, and everything in between.",
};

const CATEGORIES = ["All", "Points", "Flying", "Gear", "Logistics", "Budget"];

export default function TravelHacksPage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="Hard-Won Knowledge"
        headline="Travel Hacks"
        subheadline="We made the mistakes so you don't have to. Two hundred travel days. One very organized spreadsheet. Everything we know."
        backgroundImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop"
      />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Tips & Tactics"
            headline="All Travel Hacks"
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

          {/* Tips grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TRAVEL_HACKS.map((hack) => (
              <Link key={hack.slug} href={`/travel-hacks/${hack.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image
                    src={hack.image}
                    alt={hack.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">
                    {hack.category} · {hack.readTime} read
                  </p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">
                    {hack.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </PageWrapper>
  );
}
