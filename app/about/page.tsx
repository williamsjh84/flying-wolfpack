import type { Metadata } from "next";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import EmailSignup from "@/components/sections/EmailSignup";

export const metadata: Metadata = {
  title: "About",
  description:
    "We're a family of four who got tired of just talking about travel. This is what happened when we finally went.",
};

export default function AboutPage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="Our Story"
        headline="We're the Wolfpack"
        subheadline="Two parents, two kids, and a running argument about whether we overpack. Here's how we got here."
        backgroundImage="https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?w=1600&h=900&fit=crop"
      />

      {/* Origin story */}
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-6 font-sans text-xs tracking-[0.2em] text-earth uppercase">How it started</p>
          <h2 className="font-serif text-4xl font-bold italic leading-tight text-ink sm:text-5xl">
            We almost didn&apos;t go
          </h2>
          <div className="mt-8 space-y-6 font-sans text-lg leading-relaxed text-ink/70">
            <p>
              In 2022, we sat across from each other at the kitchen table with a Europe itinerary, two kids who were 7 and 5, and a spreadsheet that had become genuinely terrifying. Three months. Six countries. One carry-on each.
            </p>
            <p>
              The smart decision was to wait. Wait until they were older, easier, more appreciative. Wait until flights were cheaper. Wait until we had more money, more time, more certainty. We nearly listened to that voice.
            </p>
            <p>
              We didn&apos;t. And it was the best decision we&apos;ve made as a family.
            </p>
            <p>
              Flying Wolfpack started as a way to document that trip — partly for ourselves, partly for the handful of families who emailed asking &quot;how did you do that?&quot; It grew into something we didn&apos;t expect: a real community of families who are done waiting.
            </p>
          </div>
        </div>
      </section>

      {/* The family */}
      <section className="bg-mist py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&h=600&fit=crop"
                alt="Family travel"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="mb-4 font-sans text-xs tracking-[0.2em] text-earth uppercase">The Team</p>
              <h2 className="font-serif text-4xl font-bold italic text-ink">Meet the Wolfpack</h2>
              <div className="mt-6 space-y-5 font-sans text-base leading-relaxed text-ink/65">
                <p>
                  <strong className="font-medium text-ink">Dad</strong> handles the points strategy, the camera work, and the very detailed spreadsheets that nobody else reads. Former IT consultant who now spends most of his professional life in airport lounges.
                </p>
                <p>
                  <strong className="font-medium text-ink">Mom</strong> runs the logistics, speaks better Italian than the rest of us combined, and has an uncanny ability to find the best local restaurant within ten minutes of landing.
                </p>
                <p>
                  <strong className="font-medium text-ink">The older one</strong> is nine now, has strong opinions about gelato flavors, and can read a transit map better than most adults.
                </p>
                <p>
                  <strong className="font-medium text-ink">The younger one</strong> is seven, asks &quot;are we there yet?&quot; exactly once per flight, and has already declared Athens her favorite city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What this is */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 font-sans text-xs tracking-[0.2em] text-gold uppercase">Our approach</p>
          <h2 className="font-serif text-4xl font-bold italic text-warm-white sm:text-5xl">
            No pretending. No perfection.
          </h2>
          <p className="mt-6 font-sans text-lg leading-relaxed text-warm-white/60">
            Every episode includes at least one moment we almost cut — a meltdown, a wrong turn, a hotel that didn&apos;t look like the photos. We keep them in because that&apos;s what real family travel looks like, and you deserve honesty more than you deserve a highlight reel.
          </p>
        </div>
      </section>

      <EmailSignup variant="light" />
    </PageWrapper>
  );
}
