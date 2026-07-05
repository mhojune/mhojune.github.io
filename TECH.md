# 무노로그 — 기술 정리

개인 논문 리뷰 / 기술 블로그 프로젝트에서 사용한 기술 스택과 구조를 정리한 문서입니다.

---

## 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 무노로그 (mhojune.github.io) |
| **유형** | 정적 블로그 (SSG) |
| **주제** | XR, 게임 개발, AI 논문 리뷰 및 학습 기록 |
| **배포** | GitHub Pages (`gh-pages` 브랜치) |
| **URL** | https://mhojune.github.io |

---

## 기술 스택

### Core

| 기술 | 버전 | 역할 |
|------|------|------|
| **Next.js** | 16.x | React 프레임워크, App Router, 정적 빌드 |
| **React** | 19.x | UI |
| **TypeScript** | 5.x | 타입 안전성 |
| **Tailwind CSS** | 4.x | 스타일링 |

### 콘텐츠 / Markdown

| 라이브러리 | 역할 |
|-----------|------|
| **gray-matter** | Markdown frontmatter 파싱 |
| **react-markdown** | Markdown → React 렌더링 |
| **remark-gfm** | GitHub Flavored Markdown (표, 체크리스트 등) |
| **remark-unwrap-images** | 이미지 `<p>` 래핑 제거 (hydration 오류 방지) |
| **rehype-raw** | Markdown 내 HTML 허용 (이미지 그리드 등) |
| **rehype-highlight** | 코드 블록 문법 강조 (설치됨) |
| **github-slugger** | 제목 → 앵커 ID 생성 (목차 연동) |

### 기타

| 라이브러리 | 역할 |
|-----------|------|
| **date-fns** | 날짜 포맷 (한국어 locale) |
| **ESLint** | 코드 린트 (`eslint-config-next`) |

---

## 주요 기능

### 페이지

- **홈** — 소개 + 최신 글 카드 목록
- **글 목록** — 전체 글 + 실시간 검색 (제목, 요약, 태그, 카테고리)
- **글 상세** — Markdown 렌더링, 오른쪽 목차(TOC), 이미지 캡션
- **카테고리** — 카테고리별 글 필터
- **태그** — 다중 태그 토글 필터 + 글 목록

### 블로그 기능

- 폴더 기반 글 관리 (`src/content/posts/글-slug/`)
- frontmatter 메타데이터 (제목, 날짜, 카테고리, 태그, 요약)
- 글 폴더 내 이미지 co-location + 자동 `public/` 복사
- Notion 스타일 오른쪽 목차 (스크롤 하이라이트, 클릭 이동)
- 반응형 레이아웃 (모바일 햄버거 메뉴)
- 논문 리뷰 템플릿 (`user-study`, `ai-model`)

---

## 프로젝트 구조

```
blog/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 배포
├── public/
│   ├── posts/                  # 글 이미지 (빌드 시 자동 생성, gitignore)
│   └── .nojekyll
├── scripts/
│   └── copy-post-assets.js     # 글 폴더 이미지 → public/posts/ 복사
├── src/
│   ├── app/                    # Next.js App Router 페이지
│   │   ├── layout.tsx          # 공통 레이아웃
│   │   ├── page.tsx            # 홈
│   │   ├── posts/
│   │   │   ├── page.tsx        # 글 목록 + 검색
│   │   │   └── [slug]/page.tsx # 글 상세 + 목차
│   │   ├── categories/         # 카테고리
│   │   └── tags/               # 태그
│   ├── components/
│   │   ├── Header.tsx          # 네비게이션
│   │   ├── Footer.tsx
│   │   ├── PostCard.tsx        # 글 카드
│   │   ├── PostContent.tsx     # Markdown 렌더러
│   │   ├── PostSearch.tsx      # 검색 UI
│   │   ├── TagFilter.tsx       # 태그 필터 UI
│   │   └── TableOfContents.tsx # 목차 (클라이언트)
│   ├── content/
│   │   ├── posts/              # 글 폴더 (slug별)
│   │   │   └── my-post/
│   │   │       ├── index.md    # 또는 contents.md
│   │   │       └── images/
│   │   └── templates/          # 논문 리뷰 템플릿
│   └── lib/
│       ├── posts.ts            # 글 로딩 / 파싱 유틸
│       └── headings.ts         # 목차 추출
├── next.config.ts              # output: "export" (정적 빌드)
├── package.json
└── tsconfig.json
```

---

## 콘텐츠 작성 방식

### 글 폴더 구조

```
src/content/posts/my-paper-review/
├── index.md          # 글 본문 (또는 contents.md)
├── cover.png
└── images/
    └── fig1.png
```

### frontmatter 예시

```yaml
---
title: "논문 제목"
date: "2026-07-05"
category: "논문리뷰"
tags: ["VR", "HCI", "User Study"]
excerpt: "한 줄 요약"
type: "user-study"
---
```

### 이미지 삽입

```markdown
![설명 텍스트](./images/fig1.png)
```

- `![설명](경로)` → 이미지 아래 캡션 표시
- 파일명에 **공백 사용 금지** (`experimental-task.png` ✅)
- HTML 블록으로 3열 이미지 배치 가능 (`<div class="image-row">`)

---

## 빌드 & 배포

### 로컬 개발

```bash
npm install
npm run dev        # http://localhost:3000
```

`predev` / `prebuild` 훅에서 `copy-post-assets`가 자동 실행되어 이미지를 복사합니다.

### 정적 빌드

```bash
npm run build      # out/ 폴더에 정적 파일 생성
```

`next.config.ts` 설정:

```ts
output: "export"           // GitHub Pages용 정적 export
images: { unoptimized: true }
```

### GitHub Pages 배포

1. `main` 브랜치 push → GitHub Actions 실행
2. `npm run build` → `out/` 생성
3. `peaceiris/actions-gh-pages` → `gh-pages` 브랜치에 배포
4. GitHub Pages 설정: **Deploy from branch** → `gh-pages` / `/ (root)`

---

## 렌더링 방식

| 항목 | 방식 |
|------|------|
| 페이지 생성 | SSG (`generateStaticParams`) |
| 글 데이터 | 빌드 시 `fs.readFileSync`로 Markdown 읽기 |
| 라우팅 | App Router 파일 기반 |
| 동적 URL | slug URL 인코딩 (`encodeURIComponent`) |
| 클라이언트 컴포넌트 | 검색, 태그 필터, 목차 (스크롤 감지) |

---

## 스타일 / UI

- **디자인** — 모던 카드형, 흰 배경 + zinc 톤
- **폰트** — Geist Sans / Geist Mono (next/font)
- **아이콘** — 인라인 SVG (GitHub 로고 등)
- **반응형** — Tailwind breakpoints (`md`, `lg`, `min-[1100px]`)

---

## npm 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 (이미지 복사 후 실행) |
| `npm run build` | 프로덕션 정적 빌드 |
| `npm run start` | 빌드 결과 로컬 서빙 |
| `npm run lint` | ESLint |
| `npm run copy-post-assets` | 글 이미지 수동 복사 |

---

## 참고

- 새 글 추가: `src/content/templates/`에서 템플릿 복사 → `posts/폴더명/`에 작성
- 상세 작성 가이드: `src/content/templates/README.md`
