import { readFileSync } from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { DocumentEntry } from "./docs-manifest";

export type DocumentHeading = {
  depth: 2 | 3;
  id: string;
  text: string;
};

export type LoadedDocument = {
  entry: DocumentEntry;
  source: string;
  description: string;
  headings: DocumentHeading[];
};

function contentPath(entry: DocumentEntry) {
  return path.join(
    process.cwd(),
    "content",
    entry.section,
    `${entry.slug}.md`,
  );
}

function plainHeading(value: string) {
  return value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[!*_~]/g, "")
    .trim();
}

export function extractHeadings(source: string): DocumentHeading[] {
  const slugger = new GithubSlugger();
  const headings: DocumentHeading[] = [];
  let fenced = false;

  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;

    const match = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const text = plainHeading(match[2]);
    const id = slugger.slug(text);
    const depth = match[1].length;
    if (depth === 2 || depth === 3) {
      headings.push({ depth, id, text });
    }
  }

  return headings;
}

function extractDescription(source: string) {
  const lines = source.split("\n");
  const paragraphs: string[] = [];
  let current: string[] = [];
  let fenced = false;

  for (const line of lines.slice(1)) {
    if (/^\s*```/.test(line)) fenced = !fenced;
    if (fenced || /^#/.test(line) || /^[-|>]/.test(line)) {
      if (current.length) paragraphs.push(current.join(" "));
      current = [];
      if (paragraphs.length) break;
      continue;
    }
    if (!line.trim()) {
      if (current.length) paragraphs.push(current.join(" "));
      current = [];
      if (paragraphs.length) break;
      continue;
    }
    current.push(line.trim());
  }

  return (paragraphs[0] ?? "Atom UI documentation.")
    .replace(/[`*_]/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1");
}

export function loadDocument(entry: DocumentEntry): LoadedDocument {
  const source = readFileSync(contentPath(entry), "utf8");
  return {
    entry,
    source,
    description: extractDescription(source),
    headings: extractHeadings(source),
  };
}
