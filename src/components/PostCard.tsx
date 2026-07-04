import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
        <div className="mb-3 flex items-center gap-3 text-sm text-zinc-500">
          <time dateTime={post.date}>
            {format(new Date(post.date), "yyyy년 M월 d일", { locale: ko })}
          </time>
          <span className="text-zinc-300">·</span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
            {post.category}
          </span>
        </div>

        <h2 className="mb-2 text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600">
          {post.title}
        </h2>

        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-600">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
