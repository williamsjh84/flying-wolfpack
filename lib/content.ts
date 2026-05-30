import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

function readMdFiles(folder: string) {
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

export function getGearItems() {
  const items = readMdFiles("gear");
  return items.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
}

export function getEpisodes(series?: string) {
  const items = readMdFiles("episodes");
  const filtered = series ? items.filter((e: any) => e.series === series || !series) : items;
  return filtered.sort((a: any, b: any) => (a.episode ?? 0) - (b.episode ?? 0));
}

export function getJournalPosts() {
  const items = readMdFiles("journal");
  return items.sort((a: any, b: any) => (a.date < b.date ? 1 : -1));
}

export function getTravelHacks() {
  return readMdFiles("travel-hacks");
}

export function getDestinations() {
  return readMdFiles("destinations");
}
