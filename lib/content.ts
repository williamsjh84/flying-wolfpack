import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function readDir(folder: string) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(md|mdx)$/, "");
      return { slug, ...data, body: content };
    });
}

function readFile(filePath: string) {
  const full = path.join(contentDir, filePath);
  if (!fs.existsSync(full)) return null;
  const { data, content } = matter(fs.readFileSync(full, "utf-8"));
  return { ...data, body: content };
}

// ── Pages ──────────────────────────────────────────────────────
export function getPage(slug: string): any {
  return readFile(`pages/${slug}.md`) || {};
}

// ── Site Settings ──────────────────────────────────────────────
export function getSiteSettings(): any {
  return readFile("settings/site.md") || {};
}

// ── Episodes ───────────────────────────────────────────────────
export function getEpisodes(series?: string): any[] {
  const all = readDir("episodes");
  const filtered = series ? all.filter((e: any) => e.series === series) : all;
  return filtered.sort((a: any, b: any) => (a.episode ?? 0) - (b.episode ?? 0));
}

export function getEpisodeBySlug(slug: string): any {
  return readFile(`episodes/${slug}.mdx`) || readFile(`episodes/${slug}.md`) || null;
}

// ── Gear ───────────────────────────────────────────────────────
export function getGearItems(): any[] {
  return readDir("gear");
}

// ── Destinations ───────────────────────────────────────────────
export function getDestinations(): any[] {
  const order = [
    "italy","greece","poland","czech-republic","belgium",
    "netherlands","united-kingdom","japan","portugal",
  ];
  const all = readDir("destinations");
  return order
    .map((slug) => all.find((d: any) => d.slug === slug || d.slug === slug))
    .filter(Boolean) as any[];
}

// ── Journal ────────────────────────────────────────────────────
export function getJournalPosts(): any[] {
  return readDir("journal").sort((a: any, b: any) =>
    a.date < b.date ? 1 : -1
  );
}

export function getJournalPostBySlug(slug: string): any {
  return readFile(`journal/${slug}.mdx`) || readFile(`journal/${slug}.md`) || null;
}

// ── Travel Hacks ───────────────────────────────────────────────
export function getTravelHacks(): any[] {
  return readDir("travel-hacks");
}

export function getTravelHackBySlug(slug: string): any {
  return readFile(`travel-hacks/${slug}.mdx`) || readFile(`travel-hacks/${slug}.md`) || null;
}
