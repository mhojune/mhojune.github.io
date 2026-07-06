export function getPostUrl(slug: string): string {
  return `/posts/${encodeURIComponent(slug)}/`;
}

export function getCategoryUrl(category: string): string {
  return `/categories/${encodeURIComponent(category)}/`;
}

export function getTagUrl(tag: string): string {
  return `/tags/${encodeURIComponent(tag)}/`;
}
