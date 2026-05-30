"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface DestinationCardProps {
  slug: string;
  name: string;
  flag: string;
  summary: string;
  image: string;
  episodeCount?: number;
}

export default function DestinationCard({
  slug,
  name,
  flag,
  summary,
  image,
  episodeCount,
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`/destinations/${slug}`} className="group block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-mist">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

          {/* Flag + name overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{flag}</span>
              <h3 className="font-serif text-2xl font-bold italic text-warm-white">
                {name}
              </h3>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 space-y-2">
          <p className="font-sans text-sm leading-relaxed text-ink/60 line-clamp-2">
            {summary}
          </p>
          {episodeCount !== undefined && (
            <p className="font-sans text-xs tracking-widest text-earth uppercase">
              {episodeCount > 0 ? `${episodeCount} episode${episodeCount !== 1 ? "s" : ""}` : "Coming soon"}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
