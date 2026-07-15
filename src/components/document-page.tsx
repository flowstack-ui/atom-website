import { DocsShell } from "./docs-shell";
import { MarkdownDocument } from "./markdown-document";
import type { LoadedDocument } from "@/lib/documents";

export function DocumentPage({ document }: { document: LoadedDocument }) {
  return (
    <DocsShell headings={document.headings}>
      <p className="document-eyebrow">{document.entry.sectionTitle}</p>
      <MarkdownDocument source={document.source} entry={document.entry} />
    </DocsShell>
  );
}
