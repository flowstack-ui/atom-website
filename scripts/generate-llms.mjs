import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const navigation = JSON.parse(await readFile(resolve(root, "content/navigation.json"), "utf8"));
const provenance = JSON.parse(await readFile(resolve(root, "content/atom-source.json"), "utf8"));
const siteUrl = "https://atom-ui.com";
const canonical = [
  ["Website", `${siteUrl}/`],
  ["Documentation overview", `${siteUrl}/docs/`],
  ["Getting started", `${siteUrl}/docs/overview/getting-started/`],
  ["Accessibility", `${siteUrl}/docs/overview/accessibility/`],
  ["Primitive catalog", `${siteUrl}/docs/components/`],
  ["GitHub repository", "https://github.com/flowstack-ui/atom"],
  ["npm package", "https://www.npmjs.com/package/@flowstack-ui/atom"],
];
const provenanceLines = [
  `- Package: \`${provenance.package}\``,
  `- Exact reviewed version: \`${provenance.version}\``,
  `- Source repository: ${provenance.sourceRepository}`,
  `- Exact source commit: \`${provenance.sourceCommit}\``,
  `- Last reviewed: \`${provenance.lastReviewed}\``,
];
const unifiedAgentIndex = "https://agents.brick-ui.com/llms.txt";
const unifiedAgentNote = "The unified FLOWSTACK index is a supplementary version-aware discovery route. It does not replace Atom's package or website as the source authority.";

const indexLines = [
  "# Atom UI",
  "",
  "Atom UI is an accessible, headless React primitive library and the behavioral foundation beneath Brick.",
  "",
  "## Canonical resources",
  "",
  ...canonical.map(([label, url]) => `- [${label}](${url})`),
  "",
  "## Exact provenance",
  "",
  ...provenanceLines,
  "",
  "## Related FLOWSTACK agent delivery",
  "",
  `- [Unified FLOWSTACK Agent Knowledge index](${unifiedAgentIndex})`,
  "",
  unifiedAgentNote,
  "",
  "## Documentation map",
  "",
];

const fullLines = [
  "# Atom UI complete public documentation",
  "",
  `Canonical website: ${siteUrl}/`,
  "",
  "## Exact provenance",
  "",
  ...provenanceLines,
  "",
  "## Related FLOWSTACK agent delivery",
  "",
  `Unified version-aware index: ${unifiedAgentIndex}`,
  "",
  unifiedAgentNote,
  "",
  "This file mirrors the reviewed consumer-facing Markdown published by atom-ui.com. The linked website is canonical for current routes and metadata.",
  "",
];

for (const section of navigation.sections) {
  indexLines.push(`### ${section.title}`, "");
  for (const document of section.documents) {
    const route = `/docs/${section.slug}/${document.slug}/`;
    indexLines.push(`- [${document.title}](${siteUrl}${route})`);
    const source = await readFile(resolve(root, "content", section.slug, `${document.slug}.md`), "utf8");
    fullLines.push(`Source: ${siteUrl}${route}`, "", source.trim(), "", "---", "");
  }
  indexLines.push("");
}

indexLines.push("Use the canonical documentation for public APIs, accessibility contracts, and current package-version guidance.", "");

await Promise.all([
  writeFile(resolve(root, "public/llms.txt"), indexLines.join("\n")),
  writeFile(resolve(root, "public/llms-full.txt"), fullLines.join("\n")),
]);

console.log(`Generated AI-readable index and ${navigation.sections.reduce((total, section) => total + section.documents.length, 0)}-document corpus.`);
