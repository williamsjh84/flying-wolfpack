import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EmailSignup from "@/components/sections/EmailSignup";
import { getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "Long-form writing from the road.",
};

export default function JournalPage() {
  const posts = getJournalPosts();
  const [featured, ...rest] = posts;

  return (
    <PageWrapper>
      <Hero
        eyebrow="Long-Form Writing"
        headline="The Journal"
        subheadline="The stories that don't fit in a caption. Honest essays, destination deep-dives, and things we learned the hard way."
        backgroundImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1600&h=900&fit=crop"
      />
      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader eyebrow="Latest" headline="Recent Posts" className="mb-12" />
          {featured && (
            <Link href={`/journal/${featured.slug}`} className="group mb-12 block">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div className="relative aspect-[16/9] overflow-hidden bg-mist">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div>
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">{featured.category} · {formatDate(featured.date)} · {featured.readTime} read</p>
                  <h2 className="mt-3 font-serif text-3xl font-bold italic leading-tight text-ink transition-colors group-hover:text-ocean sm:text-4xl">{featured.title}</h2>
                  <p className="mt-4 font-sans text-base leading-relaxed text-ink/60">{featured.excerpt}</p>
                  <p className="mt-6 font-sans text-sm tracking-widest text-earth uppercase group-hover:text-ink transition-colors">Read →</p>
                </div>
              </div>
            </Link>
          )}
          <div className="grid gap-8 border-t border-mist pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post: any) => (
              <Link key={post.slug} href={`/journal/${post.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image src={post.image} alt={post.title} fill className="object-cover object-center transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="font-sans text-xs tracking-widest text-earth uppercase">{post.category} · {formatDate(post.date)}</p>
                  <h3 className="font-serif text-xl font-bold italic leading-snug text-ink transition-colors group-hover:text-ocean">{post.title}</h3>
                  <p className="line-clamp-2 font-sans text-sm leading-relaxed text-ink/55">{post.excerpt}</p>
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
