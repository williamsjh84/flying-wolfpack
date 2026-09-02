import { storyblokEditable } from "@storyblok/react/rsc";
import EmailSignup from "@/components/sections/EmailSignup";
import type { StoryblokBlok } from "@/lib/storyblok-types";

export default function EmailSignupBlock({ blok }: { blok: StoryblokBlok & { headline?: string; subheadline?: string; theme?: "dark" | "light" } }) {
  return (
    <div {...storyblokEditable(blok)}>
      <EmailSignup variant={blok.theme || "dark"} headline={blok.headline} subheadline={blok.subheadline} />
    </div>
  );
}
