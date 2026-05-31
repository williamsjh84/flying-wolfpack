// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "master",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ── Pages ──────────────────────────────────────────────────
      {
        name: "pages",
        label: "Pages",
        path: "content/pages",
        format: "md",
        fields: [
          // Homepage
          { type: "string", name: "heroEyebrow", label: "Hero \u2014 Eyebrow" },
          { type: "string", name: "heroHeadline", label: "Hero \u2014 Headline" },
          { type: "string", name: "heroSubheadline", label: "Hero \u2014 Subheadline", ui: { component: "textarea" } },
          { type: "string", name: "heroCtaLabel", label: "Hero \u2014 Button Label" },
          { type: "string", name: "heroCtaHref", label: "Hero \u2014 Button Link" },
          { type: "image", name: "heroImage", label: "Hero \u2014 Background Image" },
          { type: "string", name: "currentJourneyEyebrow", label: "Current Journey \u2014 Eyebrow" },
          { type: "string", name: "currentJourneyHeadline", label: "Current Journey \u2014 Headline" },
          { type: "string", name: "currentJourneyBody", label: "Current Journey \u2014 Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "currentJourneyBody2", label: "Current Journey \u2014 Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "currentJourneyCtaLabel", label: "Current Journey \u2014 Button Label" },
          { type: "string", name: "currentJourneyCtaHref", label: "Current Journey \u2014 Button Link" },
          { type: "image", name: "currentJourneyImage", label: "Current Journey \u2014 Image" },
          { type: "string", name: "episodesEyebrow", label: "Episodes Section \u2014 Eyebrow" },
          { type: "string", name: "episodesHeadline", label: "Episodes Section \u2014 Headline" },
          { type: "string", name: "destinationsEyebrow", label: "Destinations Section \u2014 Eyebrow" },
          { type: "string", name: "destinationsHeadline", label: "Destinations Section \u2014 Headline" },
          { type: "string", name: "europeEyebrow", label: "Europe Section \u2014 Eyebrow" },
          { type: "string", name: "europeHeadline", label: "Europe Section \u2014 Headline" },
          { type: "string", name: "europeSubtext", label: "Europe Section \u2014 Subtext", ui: { component: "textarea" } },
          { type: "string", name: "europeCtaLabel", label: "Europe Section \u2014 Button Label" },
          { type: "string", name: "europeCtaHref", label: "Europe Section \u2014 Button Link" },
          { type: "string", name: "hacksEyebrow", label: "Travel Hacks \u2014 Eyebrow" },
          { type: "string", name: "hacksHeadline", label: "Travel Hacks \u2014 Headline" },
          { type: "string", name: "hacksSubtext", label: "Travel Hacks \u2014 Subtext", ui: { component: "textarea" } },
          { type: "string", name: "emailHeadline", label: "Email Signup \u2014 Headline" },
          { type: "string", name: "emailSubheadline", label: "Email Signup \u2014 Subheadline", ui: { component: "textarea" } },
          { type: "string", name: "journalEyebrow", label: "Journal Section \u2014 Eyebrow" },
          { type: "string", name: "journalHeadline", label: "Journal Section \u2014 Headline" },
          // About page
          { type: "string", name: "originEyebrow", label: "Origin \u2014 Eyebrow" },
          { type: "string", name: "originHeadline", label: "Origin \u2014 Headline" },
          { type: "string", name: "originParagraph1", label: "Origin \u2014 Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "originParagraph2", label: "Origin \u2014 Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "originParagraph3", label: "Origin \u2014 Paragraph 3", ui: { component: "textarea" } },
          { type: "string", name: "originParagraph4", label: "Origin \u2014 Paragraph 4", ui: { component: "textarea" } },
          { type: "string", name: "familyEyebrow", label: "Family \u2014 Eyebrow" },
          { type: "string", name: "familyHeadline", label: "Family \u2014 Headline" },
          { type: "image", name: "familyImage", label: "Family \u2014 Image" },
          { type: "string", name: "dadBio", label: "Dad \u2014 Bio", ui: { component: "textarea" } },
          { type: "string", name: "momBio", label: "Mom \u2014 Bio", ui: { component: "textarea" } },
          { type: "string", name: "olderKidBio", label: "Older Kid \u2014 Bio", ui: { component: "textarea" } },
          { type: "string", name: "youngerKidBio", label: "Younger Kid \u2014 Bio", ui: { component: "textarea" } },
          { type: "string", name: "approachEyebrow", label: "Approach \u2014 Eyebrow" },
          { type: "string", name: "approachHeadline", label: "Approach \u2014 Headline" },
          { type: "string", name: "approachBody", label: "Approach \u2014 Body", ui: { component: "textarea" } },
          // Series pages (Europe / UK)
          { type: "string", name: "overviewEyebrow", label: "Overview \u2014 Eyebrow" },
          { type: "string", name: "overviewHeadline", label: "Overview \u2014 Headline" },
          { type: "string", name: "overviewParagraph1", label: "Overview \u2014 Paragraph 1", ui: { component: "textarea" } },
          { type: "string", name: "overviewParagraph2", label: "Overview \u2014 Paragraph 2", ui: { component: "textarea" } },
          { type: "string", name: "overviewParagraph3", label: "Overview \u2014 Paragraph 3", ui: { component: "textarea" } },
          { type: "string", name: "episodesSubtext", label: "Episodes \u2014 Subtext" }
        ]
      },
      // ── Site Settings ──────────────────────────────────────────
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "md",
        fields: [
          { type: "string", name: "siteName", label: "Site Name" },
          { type: "string", name: "siteTagline", label: "Tagline", ui: { component: "textarea" } },
          { type: "string", name: "youtube", label: "YouTube URL" },
          { type: "string", name: "instagram", label: "Instagram URL" },
          { type: "string", name: "facebook", label: "Facebook URL" },
          { type: "string", name: "email", label: "Email (mailto:...)" },
          { type: "string", name: "footerCopyright", label: "Footer Copyright Text" }
        ]
      },
      // ── Europe Episodes ────────────────────────────────────────
      {
        name: "europeEpisodes",
        label: "Europe Episodes",
        path: "content/episodes/europe",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "City / Title", isTitle: true, required: true },
          { type: "string", name: "country", label: "Country" },
          { type: "string", name: "flag", label: "Flag Emoji" },
          { type: "number", name: "episode", label: "Episode Number" },
          { type: "string", name: "duration", label: "Duration (e.g. 22 min)" },
          { type: "image", name: "image", label: "Thumbnail Image" },
          { type: "image", name: "heroImage", label: "Hero Image (full screen)" },
          { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
          { type: "string", name: "summary", label: "Summary Paragraph", ui: { component: "textarea" } },
          { type: "string", name: "storyText", label: "Story Text (photo-only episodes)", ui: { component: "textarea" } },
          { type: "string", name: "comingSoonText", label: "Coming Soon Text", ui: { component: "textarea" } },
          { type: "string", name: "chaosMoment", label: "Chaos Moment Quote", ui: { component: "textarea" } },
          { type: "string", name: "highlights", label: "Highlights", list: true },
          {
            type: "object",
            name: "itinerary",
            label: "Itinerary",
            list: true,
            fields: [
              { type: "string", name: "day", label: "Day Label (e.g. Day 1)" },
              { type: "string", name: "title", label: "Day Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "familyTips", label: "Family Tips", list: true },
          {
            type: "object",
            name: "budget",
            label: "Budget Breakdown",
            list: true,
            fields: [
              { type: "string", name: "item", label: "Category" },
              { type: "string", name: "cost", label: "Total Cost (e.g. $620)" },
              { type: "string", name: "perDay", label: "Per Day (e.g. $124)" }
            ]
          },
          { type: "image", name: "photos", label: "Photo Gallery", list: true },
          { type: "string", name: "youtubeId", label: "YouTube Video ID" },
          { type: "rich-text", name: "body", label: "Episode Notes", isBody: true }
        ]
      },
      // ── UK Episodes ────────────────────────────────────────────
      {
        name: "ukEpisodes",
        label: "UK Episodes",
        path: "content/episodes/uk",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "City / Title", isTitle: true, required: true },
          { type: "string", name: "country", label: "Country" },
          { type: "string", name: "flag", label: "Flag Emoji" },
          { type: "number", name: "episode", label: "Episode Number" },
          { type: "string", name: "duration", label: "Duration (e.g. 22 min)" },
          { type: "image", name: "image", label: "Thumbnail Image" },
          { type: "image", name: "heroImage", label: "Hero Image (full screen)" },
          { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
          { type: "string", name: "comingSoonText", label: "Coming Soon Text", ui: { component: "textarea" } },
          { type: "string", name: "highlights", label: "Highlights", list: true },
          { type: "image", name: "photos", label: "Photo Gallery", list: true },
          {
            type: "object",
            name: "itinerary",
            label: "Itinerary",
            list: true,
            fields: [
              { type: "string", name: "day", label: "Day Label (e.g. Day 1)" },
              { type: "string", name: "title", label: "Day Title" },
              { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "familyTips", label: "Family Tips", list: true },
          {
            type: "object",
            name: "budget",
            label: "Budget Breakdown",
            list: true,
            fields: [
              { type: "string", name: "item", label: "Category" },
              { type: "string", name: "cost", label: "Total Cost (e.g. $620)" },
              { type: "string", name: "perDay", label: "Per Day (e.g. $124)" }
            ]
          },
          { type: "string", name: "chaosMoment", label: "Chaos Moment Quote", ui: { component: "textarea" } },
          { type: "string", name: "youtubeId", label: "YouTube Video ID" },
          { type: "rich-text", name: "body", label: "Episode Notes", isBody: true }
        ]
      },
      // ── Gear ───────────────────────────────────────────────────
      {
        name: "gear",
        label: "Gear",
        path: "content/gear",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Product Name", isTitle: true, required: true },
          { type: "string", name: "category", label: "Category", options: ["Camera", "Bags", "Tech", "Connectivity", "Kids Gear"] },
          { type: "string", name: "price", label: "Price (e.g. $299)" },
          { type: "string", name: "rating", label: "Rating", options: ["5/5", "4/5", "3/5"] },
          { type: "string", name: "summary", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Product Image" },
          { type: "string", name: "affiliateUrl", label: "Affiliate / Buy Link" }
        ]
      },
      // ── Destinations ───────────────────────────────────────────
      {
        name: "destinations",
        label: "Destinations",
        path: "content/destinations",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Country / Destination", isTitle: true, required: true },
          { type: "string", name: "slug", label: "Slug (url-friendly)" },
          { type: "string", name: "flag", label: "Flag Emoji" },
          { type: "string", name: "summary", label: "Short Summary", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "number", name: "episodeCount", label: "Number of Episodes" },
          { type: "string", name: "seriesLink", label: "Link (e.g. /europe/belgium)" }
        ]
      },
      // ── Journal ────────────────────────────────────────────────
      {
        name: "journal",
        label: "Journal Posts",
        path: "content/journal",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "readTime", label: "Read Time (e.g. 6 min)" },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      // ── Travel Hacks ───────────────────────────────────────────
      {
        name: "travelHacks",
        label: "Travel Hacks",
        path: "content/travel-hacks",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "category", label: "Category", options: ["Points", "Flying", "Gear", "Logistics", "Budget"] },
          { type: "string", name: "readTime", label: "Read Time (e.g. 8 min)" },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Content", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
