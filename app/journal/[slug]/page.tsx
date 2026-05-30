import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import EmailSignup from "@/components/sections/EmailSignup";
import { JOURNAL_POSTS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return JOURNAL_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-3xl px-6 pb-16">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">
              {post.category} · {formatDate(post.date)} · {post.readTime} read
            </p>
            <h1 className="font-serif text-4xl font-bold italic leading-tight text-warm-white sm:text-5xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="bg-warm-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-8 font-sans text-xl leading-relaxed text-ink/70 italic">
            {post.excerpt}
          </p>
          <div className="space-y-6 font-sans text-base leading-relaxed text-ink/65">
            <p>
              Full article content coming soon. This is a placeholder for the MDX content that will live in{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 font-mono text-sm text-ocean">
                /content/journal/{post.slug}.mdx
              </code>
            </p>
            <p>
              Journal posts are written in MDX, which means they can include rich components like photo galleries, pullquotes, maps, and budget breakdowns — all inline with the prose.
            </p>
          </div>
        </div>
      </article>

      <EmailSignup />
    </PageWrapper>
  );
}
