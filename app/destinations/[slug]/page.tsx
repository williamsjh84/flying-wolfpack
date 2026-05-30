import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import EmailSignup from "@/components/sections/EmailSignup";
import { FEATURED_DESTINATIONS } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = FEATURED_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return {};
  return {
    title: dest.name,
    description: dest.summary,
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const dest = FEATURED_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();

  return (
    <PageWrapper>
      <Hero
        eyebrow={`${dest.flag} ${dest.name}`}
        headline={dest.name}
        subheadline={dest.summary}
        backgroundImage={dest.image}
      />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-3xl px-6">
          <p className="font-sans text-lg leading-relaxed text-ink/60">
            Full destination guide coming soon. In the meantime, watch our episodes and check the journal for our most recent writing from {dest.name}.
          </p>
        </div>
      </section>

      <EmailSignup />
    </PageWrapper>
  );
}
