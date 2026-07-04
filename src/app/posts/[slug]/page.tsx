import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="mb-4 flex items-center gap-3 text-sm text-zinc-500">
          <time dateTime={post.date}>
            {format(new Date(post.date), "yyyy년 M월 d일", { locale: ko })}
          </time>
          <span className="text-zinc-300">·</span>
          <Link
            href={`/categories/${encodeURIComponent(post.category)}`}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-200"
          >
            {post.category}
          </Link>
        </div>

        <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-900 md:text-4xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>

      {/* Back */}
      <div className="mt-16 border-t border-zinc-200 pt-8">
        <Link
          href="/posts"
          className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          ← 글 목록으로 돌아가기
        </Link>
      </div>
    </article>
  );
}
