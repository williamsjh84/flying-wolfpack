"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface EmailSignupProps {
  variant?: "dark" | "light";
  headline?: string;
  subheadline?: string;
}

export default function EmailSignup({
  variant = "dark",
  headline = "Join the Wolfpack",
  subheadline = "Real travel reports from the road — itineraries, honest lessons, and gear we actually use. No fluff.",
}: EmailSignupProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  const isDark = variant === "dark";

  return (
    <section className={cn("py-24", isDark ? "bg-ink" : "bg-mist")}>
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className={cn("mb-4 font-sans text-xs tracking-[0.2em] uppercase", isDark ? "text-gold" : "text-earth")}>
            Newsletter
          </p>

          <h2 className={cn("font-serif text-4xl font-bold italic sm:text-5xl", isDark ? "text-warm-white" : "text-ink")}>
            {headline}
          </h2>

          <p className={cn("mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed", isDark ? "text-warm-white/60" : "text-ink/60")}>
            {subheadline}
          </p>

          {submitted ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn("mt-10 font-sans text-lg", isDark ? "text-gold" : "text-ocean")}
            >
              You're in. We'll be in touch from the road. ✈️
            </motion.p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className={cn(
                  "flex-1 px-5 py-3.5 font-sans text-sm outline-none transition-colors",
                  isDark
                    ? "bg-warm-white/10 text-warm-white placeholder-warm-white/30 focus:bg-warm-white/15 border border-warm-white/20"
                    : "bg-warm-white text-ink placeholder-ink/30 focus:ring-1 focus:ring-earth border border-mist"
                )}
              />
              <Button
                type="submit"
                variant={isDark ? "primary" : "secondary"}
                size="md"
                className="sm:shrink-0"
              >
                Subscribe
              </Button>
            </form>
          )}

          <p className={cn("mt-4 font-sans text-xs", isDark ? "text-warm-white/30" : "text-ink/30")}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
