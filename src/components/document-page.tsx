import { Badge } from "@flowstack-ui/brick/badge";
import { DocsShell } from "./docs-shell";
import { DocumentVisual } from "./document-visual";
import { GuidePagination } from "./guide-pagination";
import { MarkdownDocument } from "./markdown-document";
import type { LoadedDocument } from "@/lib/documents";
import { documentationScopeFor } from "@/lib/docs-manifest";
import { primitiveDocumentBody } from "@/lib/documents";
import { AccessibilityHighlights } from "./accessibility-instrument";
import { AtomExampleCanvas } from "./examples/atom-example-canvas";

export function DocumentPage({ document }: { document: LoadedDocument }) {
  const isAccessibility = document.entry.section === "overview" && document.entry.slug === "accessibility";
  const isPrimitiveReference = document.entry.section === "components" || document.entry.section === "utilities";
  const sectionLabel = isAccessibility ? "Accessibility contract" : document.entry.section === "components" ? "Primitive" : document.entry.section === "utilities" ? "Utility" : document.entry.sectionTitle;
  const visualDescription = isAccessibility
    ? "Inspect how Atom divides semantic, keyboard, touch, and focus responsibilities between the primitive and the finished product."
    : isPrimitiveReference
    ? `A signal map for ${document.entry.title}: behavior stays coordinated across keyboard, touch, semantics, and focus.`
    : "A visual orientation to the contract, followed by the complete consumer guide and public reference.";

  if (isPrimitiveReference) {
    return (
      <DocsShell headings={document.headings} scope="primitives" title={document.entry.title}>
        <article className="docs-article primitive-document">
          <header className="primitive-document__header">
            <Badge tone="accent" variant="soft">{sectionLabel}</Badge>
            <h1>{document.entry.title}</h1>
            <p>{document.description}</p>
          </header>
          <AtomExampleCanvas slug={document.entry.slug} title={document.entry.title} />
          <MarkdownDocument source={primitiveDocumentBody(document.source)} entry={document.entry} />
          <GuidePagination current={document.entry} />
        </article>
      </DocsShell>
    );
  }

  return (
    <DocsShell headings={document.headings} scope={documentationScopeFor(document.entry)} title={document.entry.title}>
      <article className="docs-article">
        <header className="document-header">
          <div className="document-header__copy"><Badge tone="accent" variant="soft">{sectionLabel}</Badge><p>{visualDescription}</p></div>
          <DocumentVisual entry={document.entry} />
        </header>
        {isAccessibility ? <AccessibilityHighlights /> : null}
        <MarkdownDocument source={document.source} entry={document.entry} />
        <GuidePagination current={document.entry} />
      </article>
    </DocsShell>
  );
}
