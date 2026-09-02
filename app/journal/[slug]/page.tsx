import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import EmailSignup from "@/components/sections/EmailSignup";
import { getJournalPosts, getJournalPostBySlug } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import StoryblokPublishedStory, { getPublishedStory } from "@/components/storyblok/StoryblokPublishedStory";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getJournalPosts().map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const story = await getPublishedStory(`journal-${slug}`);
  if (story) return <StoryblokPublishedStory story={story} />;

  const post = getJournalPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageWrapper>
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/30 to-ink/60" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-3xl px-6 pb-16">
            <p className="mb-3 font-sans text-xs tracking-[0.2em] text-gold uppercase">{post.category} · {formatDate(post.date)} · {post.readTime} read</p>
            <h1 className="font-serif text-4xl font-bold italic leading-tight text-warm-white sm:text-5xl">{post.title}</h1>
          </div>
        </div>
      </div>
      <article className="bg-warm-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-8 font-sans text-xl italic leading-relaxed text-ink/70">{post.excerpt}</p>
          <div className="prose prose-lg max-w-none font-sans text-ink/70 leading-relaxed space-y-6">
            {post.body?.split("\n\n").filter(Boolean).map((para: string, i: number) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </article>
      <EmailSignup />
    </PageWrapper>
  );
}
