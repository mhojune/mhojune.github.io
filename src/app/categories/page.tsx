import Link from "next/link";
import { getAllCategories, getPostsByCategory } from "@/lib/posts";

export const metadata = {
  title: "카테고리",
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-8 text-3xl font-bold text-zinc-900">카테고리</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((category) => {
          const count = getPostsByCategory(category).length;
          return (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="mb-1 text-lg font-semibold text-zinc-900 group-hover:text-blue-600">
                {category}
              </h2>
              <p className="text-sm text-zinc-500">{count}개의 글</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
