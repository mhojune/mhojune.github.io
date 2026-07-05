"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import type { PostMeta } from "@/lib/posts";

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

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
            highlightedTags={selectedTags}
          />
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
