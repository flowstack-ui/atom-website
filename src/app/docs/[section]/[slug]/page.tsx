import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { StructuredData } from "@/components/structured-data";
import { allDocuments, documentationScopeFor, getDocumentEntry } from "@/lib/docs-manifest";
import { loadDocument } from "@/lib/documents";
import { createPageMetadata, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return allDocuments.map((document) => ({
    section: document.section,
    slug: document.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  const entry = getDocumentEntry(section, slug);
  if (!entry) return {};
  const document = loadDocument(entry);

  return createPageMetadata({
    title: document.entry.title,
    description: document.description,
    path: document.entry.href,
    type: "article",
  });
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const entry = getDocumentEntry(section, slug);
  if (!entry) notFound();

  const document = loadDocument(entry);
  const primitiveReference = documentationScopeFor(document.entry) === "primitives";
  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Atom UI", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Documentation", item: `${siteUrl}/docs/` },
    ...(primitiveReference ? [{ "@type": "ListItem", position: 3, name: "Primitives", item: `${siteUrl}/docs/components/` }] : []),
    { "@type": "ListItem", position: primitiveReference ? 4 : 3, name: document.entry.title, item: `${siteUrl}${document.entry.href}` },
  ];
  const data = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems },
    { "@context": "https://schema.org", "@type": "TechArticle", headline: document.entry.title, description: document.description, url: `${siteUrl}${document.entry.href}`, mainEntityOfPage: `${siteUrl}${document.entry.href}`, author: { "@type": "Organization", name: "Flowstack" }, publisher: { "@type": "Organization", name: "Swifty LLC", url: "https://swifty.us/" } },
  ];
  return <><StructuredData data={data} /><DocumentPage document={document} /></>;
}
