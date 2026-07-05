# 글 작성 방법

각 글은 **폴더 하나**로 관리합니다.

```
src/content/posts/
  my-post-slug/
    index.md        ← 글 내용 (또는 contents.md)
    cover.png
    images/
      fig1.png
```

1. `templates/`에서 템플릿 복사
2. `posts/글-slug/` 폴더 생성
3. `index.md`에 내용 작성
4. 이미지는 같은 폴더에 넣고 Markdown에서 상대 경로로 참조

```markdown
![표지 이미지 설명](./cover.png)
![그림 1 설명](./images/fig1.png)
```

`![설명](경로)` 형식으로 작성하면 사진 아래에 설명이 표시됩니다.

이미지 파일명에는 **공백을 넣지 마세요.** (`experimental-task.png` ✅ / `Experimental Task.png` ❌)

`dev` / `build` 시 이미지는 자동으로 `public/posts/`로 복사됩니다.

## 서식 자유롭게 쓰기

표 대신 아래처럼 **굵은 글씨 + 줄바꿈**으로 쓰면 깔끔합니다.

```markdown
**제목**  
논문 제목

**저자**  
Kim et al.
```

더 자유롭게 꾸미고 싶으면 **HTML**도 사용할 수 있습니다.

```html
<div class="paper-info">
  <p><strong>제목</strong><br />논문 제목</p>
  <p><strong>저자</strong><br />Kim et al.</p>
</div>
```
