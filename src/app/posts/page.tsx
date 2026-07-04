import { getAllPosts } from "@/lib/posts";
import PostSearch from "@/components/PostSearch";

export const metadata = {
  title: "글 목록",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">전체 글</h1>
      <PostSearch posts={posts} />
    </section>
  );
}
