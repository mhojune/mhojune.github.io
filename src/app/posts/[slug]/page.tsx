import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import PostContent from "@/components/PostContent";
import TableOfContents from "@/components/TableOfContents";
import { extractHeadings } from "@/lib/headings";
import { getCategoryUrl, getTagUrl } from "@/lib/urls";
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

  const headings = extractHeadings(post.content);

  return (
    <div className="relative">
      <article className="mx-auto max-w-3xl px-6 py-12">
        <header className="mb-10">
          <div className="mb-4 flex items-center gap-3 text-sm text-zinc-500">
            <time dateTime={post.date}>
              {format(new Date(post.date), "yyyy년 M월 d일", { locale: ko })}
            </time>
            <span className="text-zinc-300">·</span>
            <Link
              href={getCategoryUrl(post.category)}
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
                href={getTagUrl(tag)}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 transition hover:bg-blue-100"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="prose max-w-none">
          <PostContent slug={post.slug} content={post.content} />
        </div>

        <div className="mt-16 border-t border-zinc-200 pt-8">
          <Link
            href="/posts"
            className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-700"
          >
            ← 글 목록으로 돌아가기
          </Link>
        </div>
      </article>

      <aside
        className="fixed top-24 z-10 hidden w-52 min-[1100px]:block"
        style={{ left: "calc(50% + 24rem + 2rem)" }}
      >
        <TableOfContents headings={headings} />
      </aside>
    </div>
  );
}
