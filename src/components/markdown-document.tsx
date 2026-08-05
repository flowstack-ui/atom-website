import { Children, isValidElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
import { Code } from "@flowstack-ui/brick/code";
import { Table } from "@flowstack-ui/brick/table";
import { HighlightedCodeBlock } from "./highlighted-code-block";
import { highlightedLines, languageFromClassName, normalizeCodeSource } from "@/lib/syntax";
import type { DocumentEntry } from "@/lib/docs-manifest";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

function resolveHref(href: string | undefined, entry: DocumentEntry) {
  if (!href || href.startsWith("#") || /^(https?:|mailto:)/.test(href)) return href;
  if (href.endsWith("CHANGELOG.md") && (entry.section === "components" || entry.section === "utilities") && entry.slug !== "hooks") return `https://github.com/flowstack-ui/atom/blob/main/docs/components/${entry.slug}/CHANGELOG.md`;
  return href;
}

function inlineCodeKind(value: string) {
  if (value.startsWith("--")) return "css-token";
  if (/^(aria-|data-)/.test(value)) return "attribute";
  if (/^(npm|npx|pnpm|yarn)\b/.test(value)) return "command";
  if (/^[A-Z][A-Za-z0-9]*(?:\.[A-Z][A-Za-z0-9]*)?$/.test(value)) return "component";
  return "literal";
}

function MarkdownCodeBlock({ children, index, labelPrefix }: { children: ReactNode; index: number; labelPrefix: string }) {
  if (!isValidElement<{ className?: string; children?: ReactNode }>(children)) return null;
  const language = languageFromClassName(children.props.className);
  const source = normalizeCodeSource(textFromNode(children.props.children));
  return <HighlightedCodeBlock label={`${labelPrefix} ${language.toUpperCase()} code example ${index}`} language={language} lines={highlightedLines(language, source)} source={source} />;
}

export function MarkdownDocument({ source, entry }: { source: string; entry: DocumentEntry }) {
  const slugger = new GithubSlugger();
  let codeIndex = 0;
  let tableIndex = 0;
  const primitiveReference = entry.section === "components" || entry.section === "utilities";
  const heading = (depth: 1 | 2 | 3) => {
    const Heading = `h${depth}` as const;
    return function MarkdownHeading({ children }: { children?: ReactNode }) {
      const text = textFromNode(children);
      const id = slugger.slug(text);
      if (primitiveReference && depth === 2 && text === "Features") {
        return <><Heading className="feature-signals__title" id={id}>{children}</Heading><p className="feature-signals__lede">The behavior Atom owns before your product adds appearance.</p></>;
      }
      return <Heading id={id}>{children}</Heading>;
    };
  };

  const isFeatureList = (offset: number | undefined) => {
    if (!primitiveReference || offset === undefined) return false;
    const preceding = source.slice(0, offset);
    const headings = [...preceding.matchAll(/^##\s+(.+?)\s*$/gm)];
    return headings.at(-1)?.[1] === "Features";
  };

  const components: Components = {
    h1: heading(1), h2: heading(2), h3: heading(3),
    a: ({ href, children, ...props }) => { const resolved = resolveHref(href, entry); const external = Boolean(resolved && /^https?:/.test(resolved)); return <a href={resolved} {...props} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>; },
    code: ({ children, className }) => <Code className={className} data-code-kind={inlineCodeKind(textFromNode(children))} variant="subtle">{children}</Code>,
    p: ({ children }) => { const codeCount = Children.toArray(children).filter((child) => isValidElement<{ "data-code-kind"?: string }>(child) && child.props["data-code-kind"]).length; return <p className={codeCount >= 4 ? "markdown-token-cluster" : undefined}>{children}</p>; },
    ul: ({ children, node }) => <ul className={isFeatureList(node?.position?.start.offset) ? "feature-signals" : undefined}>{children}</ul>,
    pre: ({ children }) => <MarkdownCodeBlock index={++codeIndex} labelPrefix={entry.title}>{children}</MarkdownCodeBlock>,
    table: ({ children }) => <Table.Container aria-label={`${entry.title} data table ${++tableIndex}`} className="markdown-table-wrap" tabIndex={0}><Table.Root density="comfortable" size="sm" variant="line">{children}</Table.Root></Table.Container>,
    thead: ({ children }) => <Table.Header>{children}</Table.Header>, tbody: ({ children }) => <Table.Body>{children}</Table.Body>, tfoot: ({ children }) => <Table.Footer>{children}</Table.Footer>, tr: ({ children }) => <Table.Row>{children}</Table.Row>, th: ({ children }) => <Table.Head>{children}</Table.Head>, td: ({ children }) => <Table.Cell>{children}</Table.Cell>,
  };

  return <div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{source}</ReactMarkdown></div>;
}
