"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  light?: boolean;
  center?: boolean;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  subtext,
  light = false,
  center = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={cn(
            "mb-4 font-sans text-xs tracking-[0.2em] uppercase",
            light ? "text-gold" : "text-earth"
          )}
        >
          {eyebrow}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
        className={cn(
          "font-serif text-3xl font-bold italic leading-tight sm:text-4xl md:text-5xl",
          light ? "text-warm-white" : "text-ink"
        )}
      >
        {headline}
      </motion.h2>

      {subtext && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12, ease: "easeOut" }}
          className={cn(
            "mt-4 max-w-2xl font-sans text-base leading-relaxed",
            center && "mx-auto",
            light ? "text-warm-white/70" : "text-ink/60"
          )}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
}
