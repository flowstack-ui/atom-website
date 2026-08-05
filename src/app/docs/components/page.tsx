import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { Text } from "@flowstack-ui/brick/text";
import { Orbit } from "lucide-react";
import { DocsShell } from "@/components/docs-shell";
import { PrimitiveCatalog } from "@/components/primitive-catalog";
import { StructuredData } from "@/components/structured-data";
import { primitiveDocuments } from "@/lib/docs-manifest";
import { loadDocument } from "@/lib/documents";
import { createPageMetadata, siteUrl } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({ title: "Primitives", description: "Browse Atom’s accessible headless React primitives by behavior and purpose.", path: "/docs/components/" });
const headings = [{ depth: 2 as const, id: "browse-primitives", text: "Browse primitives" }];

export default function PrimitivesPage() {
  const primitives = primitiveDocuments.map((entry) => ({ slug: entry.slug, title: entry.title, description: loadDocument(entry).description, href: entry.href }));
  const data = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Atom UI", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Documentation", item: `${siteUrl}/docs/` }, { "@type": "ListItem", position: 3, name: "Primitives", item: `${siteUrl}/docs/components/` }] },
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Atom UI primitives", url: `${siteUrl}/docs/components/`, mainEntity: { "@type": "ItemList", numberOfItems: primitives.length, itemListElement: primitives.map((primitive, index) => ({ "@type": "ListItem", position: index + 1, name: primitive.title, url: `${siteUrl}/docs/components/${primitive.slug}/` })) } },
  ];
  return (
    <><StructuredData data={data} /><DocsShell headings={headings} scope="primitives" title="Primitives">
      <article className="docs-article catalog-page">
        <header className="catalog-page__hero"><Badge tone="accent" variant="soft"><Orbit size={14} aria-hidden="true" /> Public catalog</Badge><Text as="h1" variant="display" wrap="balance">Find the smallest contract that solves the behavior.</Text><Text as="p" variant="body-lg" tone="secondary">Browse components and utilities by purpose, or search directly when you already know the public subpath.</Text></header>
        <section id="browse-primitives"><PrimitiveCatalog primitives={primitives} /></section>
      </article>
    </DocsShell></>
  );
}
