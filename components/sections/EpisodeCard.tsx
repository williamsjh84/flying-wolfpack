"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface EpisodeCardProps {
  slug: string;
  title: string;
  country: string;
  flag: string;
  duration: string;
  description: string;
  image: string;
  episode: number;
  basePath?: string;
}

export default function EpisodeCard({
  slug,
  title,
  country,
  flag,
  duration,
  description,
  image,
  episode,
  basePath = "/europe",
}: EpisodeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`${basePath}/${slug}`} className="group block">
        {/* 16:9 thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-mist">
          <Image
            src={image}
            alt={`${title}, ${country}`}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-400 group-hover:bg-ink/20" />

          {/* Episode number */}
          <div className="absolute top-3 left-3">
            <span className="bg-ink/80 px-2 py-1 font-sans text-xs font-medium tracking-widest text-warm-white/80 uppercase backdrop-blur-sm">
              Ep. {String(episode).padStart(2, "0")}
            </span>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3">
            <span className="bg-ink/70 px-2 py-1 font-sans text-xs text-warm-white/80 backdrop-blur-sm">
              {duration}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{flag}</span>
            <Badge variant="default">{country}</Badge>
          </div>
          <h3 className="font-serif text-xl font-bold italic text-ink group-hover:text-ocean transition-colors duration-300">
            {title}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-ink/60 line-clamp-2">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
