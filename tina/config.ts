import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "master",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "public/uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Journal Posts ──────────────────────────────────────────
      {
        name: "journal",
        label: "Journal Posts",
        path: "content/journal",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "excerpt", label: "Excerpt", ui: { component: "textarea" } },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "category", label: "Category" },
          { type: "string", name: "readTime", label: "Read Time (e.g. 6 min)" },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },

      // ── Europe Episodes ────────────────────────────────────────
      {
        name: "episodes",
        label: "Europe Episodes",
        path: "content/episodes",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "City", isTitle: true, required: true },
          { type: "string", name: "country", label: "Country" },
          { type: "string", name: "flag", label: "Flag Emoji" },
          { type: "number", name: "episode", label: "Episode Number" },
          { type: "string", name: "duration", label: "Duration (e.g. 22 min)" },
          { type: "string", name: "description", label: "Short Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Thumbnail Image" },
          { type: "string", name: "youtubeId", label: "YouTube Video ID" },
          { type: "rich-text", name: "body", label: "Episode Notes", isBody: true },
        ],
      },

      // ── Gear Items ─────────────────────────────────────────────
      {
        name: "gear",
        label: "Gear",
        path: "content/gear",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Product Name", isTitle: true, required: true },
          {
            type: "string", name: "category", label: "Category",
            options: ["Camera", "Bags", "Tech", "Connectivity", "Kids Gear"],
          },
          { type: "string", name: "price", label: "Price (e.g. $299)" },
          {
            type: "string", name: "rating", label: "Rating",
            options: ["5/5", "4/5", "3/5"],
          },
          { type: "string", name: "summary", label: "Description", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Product Image" },
          { type: "string", name: "affiliateUrl", label: "Affiliate / Buy Link" },
        ],
      },

      // ── Destinations ───────────────────────────────────────────
      {
        name: "destinations",
        label: "Destinations",
        path: "content/destinations",
        format: "md",
        fields: [
          { type: "string", name: "name", label: "Country/Destination", isTitle: true, required: true },
          { type: "string", name: "flag", label: "Flag Emoji" },
          { type: "string", name: "summary", label: "Short Summary", ui: { component: "textarea" } },
          { type: "image", name: "image", label: "Hero Image" },
          { type: "number", name: "episodeCount", label: "Number of Episodes" },
        ],
      },

      // ── Travel Hacks ───────────────────────────────────────────
      {
        name: "travelHacks",
        label: "Travel Hacks",
        path: "content/travel-hacks",
        format: "mdx",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") || "",
          },
        },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          {
            type: "string", name: "category", label: "Category",
            options: ["Points", "Flying", "Gear", "Logistics", "Budget"],
          },
          { type: "string", name: "readTime", label: "Read Time (e.g. 8 min)" },
          { type: "image", name: "image", label: "Cover Image" },
          { type: "rich-text", name: "body", label: "Content", isBody: true },
        ],
      },
    ],
  },
});
