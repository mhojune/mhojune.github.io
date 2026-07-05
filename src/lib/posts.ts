import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "src/content/posts");
const CONTENT_FILES = ["index.md", "contents.md"];

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => getPostContentPath(slug) !== null);
}

function getPostContentPath(slug: string): string | null {
  const dir = path.join(postsDirectory, slug);

  for (const file of CONTENT_FILES) {
    const fullPath = path.join(dir, file);
    if (fs.existsSync(fullPath)) return fullPath;
  }

  return null;
}

function parsePostMeta(slug: string): PostMeta | null {
  const contentPath = getPostContentPath(slug);
  if (!contentPath) return null;

  const fileContents = fs.readFileSync(contentPath, "utf-8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
  };
}

export function resolvePostAsset(slug: string, src: string): string {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;

  const normalized = src.replace(/^\.\//, "");
  const encodedPath = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `/posts/${encodeURIComponent(slug)}/${encodedPath}`;
}

export function getAllPosts(): PostMeta[] {
  const posts = getPostSlugs()
    .map((slug) => parsePostMeta(slug))
    .filter((post): post is PostMeta => post !== null);

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(rawSlug: string): Post | null {
  const slug = decodeURIComponent(rawSlug);
  const contentPath = getPostContentPath(slug);
  if (!contentPath) return null;

  const fileContents = fs.readFileSync(contentPath, "utf-8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    excerpt: data.excerpt || "",
    content,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((p) => p.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((p) => p.tags));
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((p) => p.tags.includes(tag));
}
