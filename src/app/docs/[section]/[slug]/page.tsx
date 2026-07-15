import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentPage } from "@/components/document-page";
import { allDocuments, getDocumentEntry } from "@/lib/docs-manifest";
import { loadDocument } from "@/lib/documents";

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

  return {
    title: document.entry.title,
    description: document.description,
    alternates: { canonical: document.entry.href },
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const entry = getDocumentEntry(section, slug);
  if (!entry) notFound();

  return <DocumentPage document={loadDocument(entry)} />;
}
