import { getAllPosts, getAllTags, getPostsByTag } from "@/lib/posts";
import TagFilter from "@/components/TagFilter";

export const metadata = {
  title: "태그",
};

export default function TagsPage() {
  const tags = getAllTags();
  const posts = getAllPosts();
  const tagCounts: Record<string, number> = {};
  for (const tag of tags) {
    tagCounts[tag] = getPostsByTag(tag).length;
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">태그</h1>
      <TagFilter tags={tags} tagCounts={tagCounts} posts={posts} />
    </section>
  );
}
