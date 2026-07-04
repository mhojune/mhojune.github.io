"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          무노로그
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 text-sm font-medium text-zinc-600 md:flex">
          <Link href="/posts" className="transition hover:text-zinc-900">
            글 목록
          </Link>
          <Link href="/categories" className="transition hover:text-zinc-900">
            카테고리
          </Link>
          <Link href="/tags" className="transition hover:text-zinc-900">
            태그
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span
            className={`block h-0.5 w-5 bg-zinc-700 transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-zinc-700 transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-zinc-700 transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="flex flex-col gap-4 border-t border-zinc-200 bg-white px-6 py-4 md:hidden">
          <Link
            href="/posts"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            onClick={() => setMenuOpen(false)}
          >
            글 목록
          </Link>
          <Link
            href="/categories"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            onClick={() => setMenuOpen(false)}
          >
            카테고리
          </Link>
          <Link
            href="/tags"
            className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            onClick={() => setMenuOpen(false)}
          >
            태그
          </Link>
        </nav>
      )}
    </header>
  );
}
