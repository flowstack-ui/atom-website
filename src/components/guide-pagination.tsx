import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { guideDocuments, primitiveDocuments, type DocumentEntry } from "@/lib/docs-manifest";

export function GuidePagination({ current }: { current: DocumentEntry }) {
  const documents = current.section === "components" ? primitiveDocuments : guideDocuments;
  const index = documents.findIndex((entry) => entry.href === current.href);
  const previous = index > 0 ? documents[index - 1] : null;
  const next = index >= 0 && index < documents.length - 1 ? documents[index + 1] : null;

  return (
    <nav className="guide-pagination" aria-label="Documentation pages">
      {previous ? <Link href={previous.href} className="guide-pagination__previous"><ArrowLeft size={16} aria-hidden="true" /><span><small>Previous</small><strong>{previous.title}</strong></span></Link> : <span />}
      {next ? <Link href={next.href} className="guide-pagination__next"><span><small>Next</small><strong>{next.title}</strong></span><ArrowRight size={16} aria-hidden="true" /></Link> : <span />}
    </nav>
  );
}
