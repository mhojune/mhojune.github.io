import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            환영합니다 👋
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600">
            컴퓨터공학을 전공하며 XR, 게임 개발, AI에 관심을 가지고 공부하고 있습니다.
            <br />
            배운 내용을 기록하고, 프로젝트 경험과 기술을 꾸준히 공유하는 개발 블로그입니다.
          </p>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900">최신 글</h2>
          <Link
            href="/posts"
            className="text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            전체 보기 →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
