import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  for (const line of markdown.split("\n")) {
    const trimmed = line.replace(/\r$/, "");
    const h2Match = trimmed.match(/^## (.+)$/);
    const h3Match = trimmed.match(/^### (.+)$/);

    if (h2Match) {
      const text = h2Match[1].trim();
      items.push({ id: slugger.slug(text), text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      items.push({ id: slugger.slug(text), text, level: 3 });
    }
  }

  return items;
}
