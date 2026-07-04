"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface PostMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

interface TagFilterProps {
  tags: string[];
  tagCounts: Record<string, number>;
  posts: PostMeta[];
}

export default function TagFilter({ tags, tagCounts, posts }: TagFilterProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAll = () => setSelectedTags([]);

  const filteredPosts =
    selectedTags.length === 0
      ? posts
      : posts.filter((post) =>
          selectedTags.some((tag) => post.tags.includes(tag))
        );

  return (
    <>
      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-3">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                isSelected
                  ? "border-blue-500 bg-blue-600 text-white shadow-sm"
                  : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              #{tag}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isSelected
                    ? "bg-blue-500 text-blue-100"
                    : "bg-blue-200 text-blue-700"
                }`}
              >
                {tagCounts[tag]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected info + clear */}
      {selectedTags.length > 0 && (
        <div className="mb-8 flex items-center gap-3">
          <p className="text-sm text-zinc-500">
            {selectedTags.length}개 태그 선택 · {filteredPosts.length}개의 글
          </p>
          <button
            onClick={clearAll}
            className="text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            초기화
          </button>
        </div>
      )}

      {selectedTags.length === 0 && (
        <p className="mb-8 text-sm text-zinc-500">
          태그를 선택하면 해당 글을 필터링합니다.
        </p>
      )}

      {/* Post list */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
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
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      selectedTags.includes(tag)
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <p className="py-12 text-center text-zinc-400">
          선택한 태그에 해당하는 글이 없습니다.
        </p>
      )}
    </>
  );
}
