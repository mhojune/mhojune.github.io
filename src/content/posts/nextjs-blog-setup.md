---
title: "Next.js로 블로그 만들기"
date: "2026-07-04"
category: "개발"
tags: ["Next.js", "React", "TypeScript"]
excerpt: "Next.js App Router를 활용하여 정적 블로그를 구축하는 방법을 알아봅니다."
---

## Next.js 블로그 구축

Next.js의 App Router를 사용하면 파일 기반 라우팅으로 블로그를 쉽게 만들 수 있습니다.

### 프로젝트 구조

```
src/
  app/
    page.tsx          - 홈페이지
    posts/
      [slug]/page.tsx - 글 상세 페이지
  content/
    posts/            - Markdown 파일들
  lib/
    posts.ts          - 글 로딩 유틸리티
```

### Markdown 파싱

`gray-matter` 라이브러리를 사용하여 Markdown 파일의 frontmatter를 파싱합니다.

```typescript
import matter from "gray-matter";

const { data, content } = matter(fileContent);
```

### 정적 생성

`generateStaticParams`를 사용하면 빌드 시점에 모든 글 페이지를 정적으로 생성할 수 있습니다.

이렇게 하면 GitHub Pages에서도 완벽하게 동작합니다.
