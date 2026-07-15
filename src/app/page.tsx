import type { Metadata } from "next";
import { DocumentPage } from "@/components/document-page";
import { getDocumentEntry } from "@/lib/docs-manifest";
import { loadDocument } from "@/lib/documents";

const entry = getDocumentEntry("overview", "introduction");

export const metadata: Metadata = {
  title: "Atom UI — Headless React primitives",
  description:
    "Accessible, headless React primitives for design systems and application interfaces.",
  alternates: { canonical: "/docs/overview/introduction/" },
};

export default function Home() {
  if (!entry) throw new Error("Introduction document is missing");
  return <DocumentPage document={loadDocument(entry)} />;
}
