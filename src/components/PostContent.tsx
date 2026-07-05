import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeRaw from "rehype-raw";
import GithubSlugger from "github-slugger";
import type { Root } from "hast";
import { resolvePostAsset } from "@/lib/posts";

function rehypeResolvePostImages(slug: string) {
  return (tree: Root) => {
    const walk = (node: Root | Root["children"][number] | undefined) => {
      if (!node || typeof node !== "object" || !("type" in node)) return;

      if (node.type === "element" && node.tagName === "img" && node.properties?.src) {
        const src = String(node.properties.src);
        node.properties.src = resolvePostAsset(slug, src);
      }

      if ("children" in node && Array.isArray(node.children)) {
        for (const child of node.children) {
          walk(child);
        }
      }
    };

    walk(tree);
  };
}

function getPlainText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getPlainText).join("");
  if (children && typeof children === "object" && "props" in children) {
    const props = children.props as { children?: ReactNode };
    return getPlainText(props.children);
  }
  return "";
}

export default function PostContent({
  slug,
  content,
}: {
  slug: string;
  content: string;
}) {
  const slugger = new GithubSlugger();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkUnwrapImages]}
      rehypePlugins={[rehypeRaw, rehypeResolvePostImages(slug)]}
      components={{
        h2: ({ children }) => {
          const text = getPlainText(children);
          const id = slugger.slug(text);
          return (
            <h2 id={id} className="scroll-mt-24">
              {children}
            </h2>
          );
        },
        h3: ({ children }) => {
          const text = getPlainText(children);
          const id = slugger.slug(text);
          return (
            <h3 id={id} className="scroll-mt-24">
              {children}
            </h3>
          );
        },
        img: ({ src, alt }) => {
          const imageSrc = typeof src === "string" ? src : "";
          const resolved = resolvePostAsset(slug, imageSrc);

          if (alt) {
            return (
              <figure className="image-figure">
                <img src={resolved} alt={alt} />
                <figcaption>{alt}</figcaption>
              </figure>
            );
          }

          return (
            <img
              src={resolved}
              alt=""
              className="mx-auto rounded-xl"
            />
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
