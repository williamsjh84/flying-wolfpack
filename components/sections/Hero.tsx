"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface HeroProps {
  headline: string;
  subheadline: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImage?: string;
  videoUrl?: string;
  eyebrow?: string;
}

export default function Hero({
  headline,
  subheadline,
  ctaLabel,
  ctaHref = "/destinations",
  backgroundImage,
  eyebrow,
}: HeroProps) {
  return (
    <section className="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt={headline}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 font-sans text-xs tracking-[0.25em] text-gold uppercase"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="font-serif text-4xl font-bold italic leading-tight text-warm-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-warm-white/80"
        >
          {subheadline}
        </motion.p>

        {ctaLabel && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="mt-10"
          >
            <Link href={ctaHref}>
              <Button variant="primary" size="lg">
                {ctaLabel}
              </Button>
            </Link>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="h-8 w-px bg-warm-white/30" />
          <div className="h-1.5 w-1.5 rounded-full bg-warm-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
