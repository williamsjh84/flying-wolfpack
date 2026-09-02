import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const spaceId = process.env.STORYBLOK_SPACE_ID;
const token = process.env.STORYBLOK_MANAGEMENT_TOKEN;
const region = process.env.STORYBLOK_REGION || "us";
const dryRun = process.argv.includes("--dry-run");
const destinationsOnly = process.argv.includes("--destinations-only");

if (!dryRun && (!spaceId || !token)) {
  console.error("Set STORYBLOK_SPACE_ID and STORYBLOK_MANAGEMENT_TOKEN before running this migration.");
  process.exit(1);
}

const managementBase = {
  eu: "https://mapi.storyblok.com/v1",
  us: "https://api-us.storyblok.com/v1",
  ca: "https://api-ca.storyblok.com/v1",
  ap: "https://api-ap.storyblok.com/v1",
}[region] || "https://api-us.storyblok.com/v1";

const api = async (pathname, options = {}) => {
  const response = await fetch(`${managementBase}/spaces/${spaceId}/${pathname}`, {
    ...options,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(`${response.status} ${pathname}: ${text}`);
  return data;
};

const readFile = (relativePath) => {
  const fullPath = path.join(contentRoot, relativePath);
  if (!fs.existsSync(fullPath)) return {};
  const parsed = matter(fs.readFileSync(fullPath, "utf8"));
  return { ...parsed.data, body: parsed.content.trim() };
};

const readDir = (relativePath) => {
  const directory = path.join(contentRoot, relativePath);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ""),
      ...readFile(path.join(relativePath, file)),
    }));
};

const uid = () => randomUUID();
const asset = (filename, alt = "") => filename ? ({
  id: null,
  alt,
  name: "",
  focus: "",
  title: "",
  source: "",
  filename,
  copyright: "",
  fieldtype: "asset",
  meta_data: {},
}) : null;
const link = (url = "") => ({
  id: "",
  url,
  linktype: url.startsWith("http") ? "url" : "story",
  fieldtype: "multilink",
  cached_url: url,
});
const item = (text, title = "") => ({ _uid: uid(), component: "list_item", title, text });
const card = ({ title, summary = "", eyebrow = "", meta = "", image = "", href = "#" }) => ({
  _uid: uid(),
  component: "card_item",
  title,
  summary,
  eyebrow,
  meta,
  image: asset(image, title),
  link: link(href),
});
const hero = (p) => ({
  _uid: uid(),
  component: "hero_section",
  eyebrow: p.heroEyebrow || "",
  headline: p.heroHeadline || "",
  subheadline: p.heroSubheadline || "",
  cta_label: p.heroCtaLabel || "",
  cta_link: link(p.heroCtaHref || ""),
  background_image: asset(p.heroImage, p.heroHeadline || ""),
});
const editorial = ({ theme = "light", eyebrow = "", headline = "", text = "", secondaryText = "", image = "", imagePosition = "right", ctaLabel = "", ctaHref = "" }) => ({
  _uid: uid(),
  component: "editorial_section",
  theme,
  eyebrow,
  headline,
  text,
  secondary_text: secondaryText,
  image: asset(image, headline),
  image_position: imagePosition,
  cta_label: ctaLabel,
  cta_link: link(ctaHref),
});
const grid = ({ theme = "light", eyebrow = "", headline = "", subtext = "", cards = [] }) => ({
  _uid: uid(),
  component: "card_grid_section",
  theme,
  eyebrow,
  headline,
  subtext,
  cards,
});
const list = ({ theme = "light", eyebrow = "", headline = "", items = [] }) => ({
  _uid: uid(),
  component: "list_section",
  theme,
  eyebrow,
  headline,
  items,
});
const gallery = ({ eyebrow = "Gallery", headline = "In Frame", images = [] }) => ({
  _uid: uid(),
  component: "gallery_section",
  eyebrow,
  headline,
  images: images.filter(Boolean).map((image, index) => asset(image, `${headline} photo ${index + 1}`)),
});
const emailSignup = (headline, subheadline) => ({
  _uid: uid(),
  component: "email_signup_section",
  theme: "dark",
  headline: headline || "Join the Wolfpack",
  subheadline: subheadline || "",
});
const page = (body) => ({ component: "page", _uid: uid(), body });

const components = [
  {
    name: "page", display_name: "Page", is_root: true, is_nestable: false,
    schema: {
      body: { type: "bloks", pos: 0, restrict_components: true, component_whitelist: ["hero_section", "editorial_section", "card_grid_section", "gallery_section", "list_section", "email_signup_section"] },
    },
  },
  {
    name: "hero_section", display_name: "Hero", is_root: false, is_nestable: true,
    schema: {
      eyebrow: { type: "text", pos: 0 },
      headline: { type: "text", pos: 1, required: true },
      subheadline: { type: "textarea", pos: 2 },
      cta_label: { type: "text", pos: 3 },
      cta_link: { type: "multilink", pos: 4 },
      background_image: { type: "asset", pos: 5, filetypes: ["images"] },
    },
  },
  {
    name: "editorial_section", display_name: "Editorial Section", is_root: false, is_nestable: true,
    schema: {
      theme: { type: "option", pos: 0, options: [{ value: "light", name: "Light" }, { value: "mist", name: "Mist" }, { value: "dark", name: "Dark" }], default_value: "light" },
      eyebrow: { type: "text", pos: 1 },
      headline: { type: "text", pos: 2, required: true },
      text: { type: "textarea", pos: 3 },
      secondary_text: { type: "textarea", pos: 4 },
      image: { type: "asset", pos: 5, filetypes: ["images"] },
      image_position: { type: "option", pos: 6, options: [{ value: "right", name: "Right" }, { value: "left", name: "Left" }], default_value: "right" },
      cta_label: { type: "text", pos: 7 },
      cta_link: { type: "multilink", pos: 8 },
    },
  },
  {
    name: "card_grid_section", display_name: "Card Grid", is_root: false, is_nestable: true,
    schema: {
      theme: { type: "option", pos: 0, options: [{ value: "light", name: "Light" }, { value: "mist", name: "Mist" }, { value: "dark", name: "Dark" }], default_value: "light" },
      eyebrow: { type: "text", pos: 1 },
      headline: { type: "text", pos: 2, required: true },
      subtext: { type: "textarea", pos: 3 },
      cards: { type: "bloks", pos: 4, restrict_components: true, component_whitelist: ["card_item"] },
    },
  },
  {
    name: "card_item", display_name: "Card", is_root: false, is_nestable: true,
    schema: {
      eyebrow: { type: "text", pos: 0 },
      title: { type: "text", pos: 1, required: true },
      summary: { type: "textarea", pos: 2 },
      meta: { type: "text", pos: 3 },
      image: { type: "asset", pos: 4, filetypes: ["images"] },
      link: { type: "multilink", pos: 5 },
    },
  },
  {
    name: "gallery_section", display_name: "Photo Gallery", is_root: false, is_nestable: true,
    schema: {
      eyebrow: { type: "text", pos: 0 },
      headline: { type: "text", pos: 1, required: true },
      images: { type: "asset", pos: 2, filetypes: ["images"], allow_multiple: true },
    },
  },
  {
    name: "list_section", display_name: "Numbered List", is_root: false, is_nestable: true,
    schema: {
      theme: { type: "option", pos: 0, options: [{ value: "light", name: "Light" }, { value: "dark", name: "Dark" }], default_value: "light" },
      eyebrow: { type: "text", pos: 1 },
      headline: { type: "text", pos: 2, required: true },
      items: { type: "bloks", pos: 3, restrict_components: true, component_whitelist: ["list_item"] },
    },
  },
  {
    name: "list_item", display_name: "List Item", is_root: false, is_nestable: true,
    schema: {
      title: { type: "text", pos: 0 },
      text: { type: "textarea", pos: 1, required: true },
    },
  },
  {
    name: "email_signup_section", display_name: "Email Signup", is_root: false, is_nestable: true,
    schema: {
      theme: { type: "option", pos: 0, options: [{ value: "dark", name: "Dark" }, { value: "light", name: "Light" }], default_value: "dark" },
      headline: { type: "text", pos: 1, required: true },
      subheadline: { type: "textarea", pos: 2 },
    },
  },
];

const europeEpisodes = readDir("episodes/europe").sort((a, b) => (a.episode || 0) - (b.episode || 0));
const ukEpisodes = readDir("episodes/uk").sort((a, b) => (a.episode || 0) - (b.episode || 0));
const destinations = readDir("destinations");
const gear = readDir("gear");
const journal = readDir("journal");
const hacks = readDir("travel-hacks");

const episodeCard = (episode, series) => card({
  title: episode.title,
  summary: episode.description,
  eyebrow: `Episode ${String(episode.episode || "").padStart(2, "0")} - ${episode.country || ""}`,
  meta: episode.duration || "",
  image: episode.image,
  href: `/${series}/${episode.slug}`,
});

const stories = [];
const addStory = (name, slug, content) => stories.push({ name, slug, content });

const home = readFile("pages/home.md");
addStory("Homepage", "home", page([
  hero(home),
  editorial({
    eyebrow: home.currentJourneyEyebrow,
    headline: home.currentJourneyHeadline,
    text: home.currentJourneyBody,
    secondaryText: home.currentJourneyBody2,
    image: home.currentJourneyImage,
    ctaLabel: home.currentJourneyCtaLabel,
    ctaHref: home.currentJourneyCtaHref,
  }),
  grid({ theme: "mist", eyebrow: home.episodesEyebrow, headline: home.episodesHeadline, cards: [...europeEpisodes, ...ukEpisodes].slice(0, 3).map((ep) => episodeCard(ep, ukEpisodes.includes(ep) ? "uk" : "europe")) }),
  grid({ eyebrow: home.destinationsEyebrow, headline: home.destinationsHeadline, cards: destinations.map((d) => card({ title: d.name, summary: d.summary, eyebrow: d.flag, meta: d.episodeCount ? `${d.episodeCount} episodes` : "Coming soon", image: d.image, href: d.seriesLink || `/destinations/${d.slug}` })) }),
  editorial({ theme: "dark", eyebrow: home.europeEyebrow, headline: home.europeHeadline, text: home.europeSubtext, ctaLabel: home.europeCtaLabel, ctaHref: home.europeCtaHref }),
  grid({ eyebrow: home.hacksEyebrow, headline: home.hacksHeadline, subtext: home.hacksSubtext, cards: hacks.map((h) => card({ title: h.title, eyebrow: h.category, meta: h.readTime, image: h.image, href: `/travel-hacks/${h.slug}` })) }),
  emailSignup(home.emailHeadline, home.emailSubheadline),
  grid({ eyebrow: home.journalEyebrow, headline: home.journalHeadline, cards: journal.map((p) => card({ title: p.title, summary: p.excerpt, eyebrow: p.category, meta: p.readTime, image: p.image, href: `/journal/${p.slug}` })) }),
]));

const about = readFile("pages/about.md");
addStory("About", "about", page([
  hero(about),
  editorial({ eyebrow: about.originEyebrow, headline: about.originHeadline, text: [about.originParagraph1, about.originParagraph2, about.originParagraph3, about.originParagraph4].filter(Boolean).join("\n\n") }),
  editorial({ theme: "mist", eyebrow: about.familyEyebrow, headline: about.familyHeadline, text: [about.dadBio, about.momBio, about.olderKidBio, about.youngerKidBio].filter(Boolean).join("\n\n"), image: about.familyImage, imagePosition: "left" }),
  editorial({ theme: "dark", eyebrow: about.approachEyebrow, headline: about.approachHeadline, text: about.approachBody }),
  emailSignup(about.emailHeadline, about.emailSubheadline),
]));

for (const [series, episodes] of [["europe", europeEpisodes], ["uk", ukEpisodes]]) {
  const p = readFile(`pages/${series}.md`);
  addStory(series === "uk" ? "United Kingdom Series" : "Europe Series", series, page([
    hero(p),
    editorial({ eyebrow: p.overviewEyebrow, headline: p.overviewHeadline, text: [p.overviewParagraph1, p.overviewParagraph2, p.overviewParagraph3].filter(Boolean).join("\n\n") }),
    grid({ theme: "mist", eyebrow: p.episodesEyebrow, headline: p.episodesHeadline, subtext: p.episodesSubtext, cards: episodes.map((ep) => episodeCard(ep, series)) }),
    emailSignup(p.emailHeadline, p.emailSubheadline),
  ]));

  for (const episode of episodes) {
    const body = [
      {
        _uid: uid(), component: "hero_section",
        eyebrow: `Episode ${String(episode.episode || "").padStart(2, "0")} - ${series === "uk" ? "The United Kingdom Series" : "The Europe Summer Series"}`,
        headline: episode.title,
        subheadline: episode.description || "",
        cta_label: "",
        cta_link: link(""),
        background_image: asset(episode.heroImage || episode.image, episode.title),
      },
      editorial({ eyebrow: "The Story", headline: episode.title, text: episode.summary || episode.storyText || episode.description || "", secondaryText: episode.body || "" }),
    ];
    if (episode.photos?.length) body.push(gallery({ headline: `${episode.title} in Frame`, images: episode.photos }));
    if (episode.itinerary?.length) body.push(list({ eyebrow: "Day by Day", headline: `${episode.title} Itinerary`, items: episode.itinerary.map((day) => item(day.description || "", `${day.day || ""} - ${day.title || ""}`)) }));
    if (episode.familyTips?.length) body.push(list({ theme: "dark", eyebrow: "Family Tips", headline: "What We Learned", items: episode.familyTips.map((tip) => item(tip)) }));
    if (episode.highlights?.length) body.push(list({ theme: "dark", eyebrow: "Highlights", headline: `Don't Miss in ${episode.title}`, items: episode.highlights.map((tip) => item(tip)) }));
    if (episode.budget?.length) body.push(list({ eyebrow: "What It Cost", headline: "Budget Breakdown", items: episode.budget.map((row) => item(`${row.cost || ""}${row.perDay ? ` - ${row.perDay} per day` : ""}`, row.item || "")) }));
    if (episode.chaosMoment) body.push(editorial({ theme: "mist", eyebrow: "Chaos Moment", headline: "The Part We Almost Cut", text: episode.chaosMoment }));
    addStory(`${episode.title} - ${series === "uk" ? "UK" : "Europe"}`, `${series}-${episode.slug}`, page(body));
  }
}

addStory("Destinations", "destinations", page([
  {
    _uid: uid(), component: "hero_section", eyebrow: "Explore", headline: "Where We've Been", subheadline: "Honest family guides from the places that changed us.", cta_label: "", cta_link: link(""), background_image: asset(destinations[0]?.image, "Destinations"),
  },
  grid({ eyebrow: "Choose a Place", headline: "Destinations", cards: destinations.map((d) => card({ title: d.name, summary: d.summary, eyebrow: d.flag, meta: d.episodeCount ? `${d.episodeCount} episodes` : "Coming soon", image: d.image, href: d.seriesLink || `/destinations/${d.slug}` })) }),
]));

for (const destination of destinations) {
  addStory(destination.name, `destination-${destination.slug}`, page([
    {
      _uid: uid(), component: "hero_section", eyebrow: `${destination.flag || ""} Destination Guide`, headline: destination.name, subheadline: destination.summary || "", cta_label: "", cta_link: link(""), background_image: asset(destination.image, destination.name),
    },
    editorial({ eyebrow: "Family Guide", headline: `Exploring ${destination.name}`, text: destination.body || destination.summary || "", ctaLabel: destination.seriesLink ? "Watch the series" : "", ctaHref: destination.seriesLink || "" }),
    emailSignup("Join the Wolfpack", `Get our newest family travel notes from ${destination.name} and beyond.`),
  ]));
}

addStory("Gear", "gear", page([
  {
    _uid: uid(), component: "hero_section", eyebrow: "What We Carry", headline: "The Gear We Actually Use", subheadline: "Everything here has earned its place in our bags.", cta_label: "", cta_link: link(""), background_image: asset(gear[0]?.image, "Travel gear"),
  },
  grid({ eyebrow: "Field Tested", headline: "Our Travel Kit", cards: gear.map((g) => card({ title: g.name, summary: g.summary, eyebrow: g.category, meta: `${g.price || ""} ${g.rating ? `- ${g.rating}` : ""}`.trim(), image: g.image, href: g.affiliateUrl || "#" })) }),
]));

addStory("Journal", "journal", page([
  {
    _uid: uid(), component: "hero_section", eyebrow: "Field Notes", headline: "From the Journal", subheadline: "The stories behind the itineraries.", cta_label: "", cta_link: link(""), background_image: asset(journal[0]?.image, "Travel journal"),
  },
  grid({ eyebrow: "Latest Writing", headline: "Stories From the Road", cards: journal.map((p) => card({ title: p.title, summary: p.excerpt, eyebrow: p.category, meta: p.readTime, image: p.image, href: `/journal/${p.slug}` })) }),
]));

addStory("Travel Hacks", "travel-hacks", page([
  {
    _uid: uid(), component: "hero_section", eyebrow: "Practical Adventure", headline: "Travel Hacks That Actually Work", subheadline: "Lessons earned across 200+ days of family travel.", cta_label: "", cta_link: link(""), background_image: asset(hacks[0]?.image, "Family travel tips"),
  },
  grid({ eyebrow: "Tips and Tactics", headline: "The Playbook", cards: hacks.map((h) => card({ title: h.title, eyebrow: h.category, meta: h.readTime, image: h.image, href: `/travel-hacks/${h.slug}` })) }),
]));

for (const post of journal) {
  addStory(post.title, `journal-${post.slug}`, page([
    {
      _uid: uid(), component: "hero_section", eyebrow: post.category || "Journal", headline: post.title, subheadline: post.excerpt || "", cta_label: "", cta_link: link(""), background_image: asset(post.image, post.title),
    },
    editorial({ eyebrow: post.readTime || "", headline: post.title, text: post.body || post.excerpt || "" }),
  ]));
}

for (const hack of hacks) {
  addStory(hack.title, `travel-hack-${hack.slug}`, page([
    {
      _uid: uid(), component: "hero_section", eyebrow: hack.category || "Travel Hack", headline: hack.title, subheadline: hack.readTime || "", cta_label: "", cta_link: link(""), background_image: asset(hack.image, hack.title),
    },
    editorial({ headline: hack.title, text: hack.body || "" }),
  ]));
}

async function upsertComponents() {
  const existing = (await api("components/")).components || [];
  for (const component of components) {
    const match = existing.find((candidate) => candidate.name === component.name);
    if (match) {
      await api(`components/${match.id}`, { method: "PUT", body: JSON.stringify({ component }) });
      console.log(`Updated component: ${component.display_name}`);
    } else {
      await api("components/", { method: "POST", body: JSON.stringify({ component }) });
      console.log(`Created component: ${component.display_name}`);
    }
  }
}

async function getAllStories() {
  const all = [];
  let pageNumber = 1;
  while (true) {
    const result = await api(`stories?per_page=100&page=${pageNumber}`);
    all.push(...(result.stories || []));
    if (!result.stories || result.stories.length < 100) break;
    pageNumber += 1;
  }
  return all;
}

async function upsertStories(storiesToMigrate = stories) {
  const existing = await getAllStories();
  for (const story of storiesToMigrate) {
    const match = existing.find((candidate) => candidate.slug === story.slug && !candidate.parent_id);
    const payload = { story, publish: true, force_update: 1 };
    if (match) {
      await api(`stories/${match.id}`, { method: "PUT", body: JSON.stringify(payload) });
      console.log(`Updated story: ${story.name}`);
    } else {
      await api("stories", { method: "POST", body: JSON.stringify(payload) });
      console.log(`Created story: ${story.name}`);
    }
  }
}

const storiesToMigrate = destinationsOnly
  ? stories.filter((story) => story.slug.startsWith("destination-"))
  : stories;

if (dryRun) {
  console.log(`Dry run complete: ${components.length} components and ${storiesToMigrate.length} stories are ready to migrate.`);
  console.log(storiesToMigrate.map((story) => `- ${story.slug}`).join("\n"));
} else {
  if (!destinationsOnly) await upsertComponents();
  await upsertStories(storiesToMigrate);
  console.log(`Migration complete: ${storiesToMigrate.length} visual stories are ready in Storyblok.`);
}
