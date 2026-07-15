import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
import type { DocumentEntry } from "@/lib/docs-manifest";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return textFromNode(element.props?.children);
  }
  return "";
}

function resolveHref(href: string | undefined, entry: DocumentEntry) {
  if (!href || href.startsWith("#") || /^(https?:|mailto:)/.test(href)) return href;
  if (
    href.endsWith("CHANGELOG.md") &&
    (entry.section === "components" || entry.section === "utilities") &&
    entry.slug !== "hooks"
  ) {
    return `https://github.com/flowstack-ui/atom/blob/main/docs/components/${entry.slug}/CHANGELOG.md`;
  }
  return href;
}

export function MarkdownDocument({
  source,
  entry,
}: {
  source: string;
  entry: DocumentEntry;
}) {
  const slugger = new GithubSlugger();

  const heading = (depth: 1 | 2 | 3) => {
    const Heading = `h${depth}` as const;
    return function MarkdownHeading({ children }: { children?: ReactNode }) {
      const id = slugger.slug(textFromNode(children));
      return <Heading id={id}>{children}</Heading>;
    };
  };

  const components: Components = {
    h1: heading(1),
    h2: heading(2),
    h3: heading(3),
    a: ({ href, children, ...props }) => {
      const resolved = resolveHref(href, entry);
      const external = Boolean(resolved && /^https?:/.test(resolved));
      return (
        <a
          href={resolved}
          {...props}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {source}
    </ReactMarkdown>
  );
}
