import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import GithubSlugger from "github-slugger";

const root = process.cwd();
const navigation = JSON.parse(
  await readFile(path.join(root, "content/navigation.json"), "utf8"),
);

function plainText(value) {
  return value
    .replace(/!\[([^\]]*)]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_~|>#]/g, " ")
    .replace(/^\s*[-+]\s+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value) {
  const text = plainText(value);
  return text.length > 190 ? `${text.slice(0, 187).trimEnd()}…` : text;
}

function parseDocument(source) {
  const slugger = new GithubSlugger();
  const pageBody = [];
  const sections = [];
  let current = null;
  let fenced = false;

  function finishSection() {
    if (!current) return;
    const text = plainText(current.body.join(" "));
    sections.push({ ...current, text, excerpt: excerpt(text) });
  }

  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced) continue;

    const heading = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (heading) {
      const depth = heading[1].length;
      if (depth === 2 || depth === 3) {
        finishSection();
        const headingText = plainText(heading[2]);
        current = {
          heading: headingText,
          anchor: slugger.slug(headingText),
          depth,
          body: [],
        };
      }
      continue;
    }

    const text = plainText(line);
    if (!text || /^[-: ]+$/.test(text)) continue;
    pageBody.push(text);
    current?.body.push(text);
  }

  finishSection();
  const text = plainText(pageBody.join(" "));
  return { text, excerpt: excerpt(text), sections };
}

const records = [];

for (const section of navigation.sections) {
  for (const document of section.documents) {
    const source = await readFile(
      path.join(root, "content", section.slug, `${document.slug}.md`),
      "utf8",
    );
    const parsed = parseDocument(source);
    const url = `/docs/${section.slug}/${document.slug}/`;
    const pageId = `${section.slug}/${document.slug}`;

    records.push({
      id: pageId,
      kind: "page",
      url,
      section: section.title,
      title: document.title,
      heading: "",
      excerpt: parsed.excerpt,
      text: parsed.text,
    });

    parsed.sections.forEach((entry, index) => {
      records.push({
        id: `${pageId}#${index}`,
        kind: "heading",
        url: `${url}#${entry.anchor}`,
        section: section.title,
        title: document.title,
        heading: entry.heading,
        excerpt: entry.excerpt,
        text: entry.text,
      });
    });
  }
}

await mkdir(path.join(root, "public"), { recursive: true });
await writeFile(
  path.join(root, "public/search-index.json"),
  `${JSON.stringify(records)}\n`,
);

console.log(`Generated ${records.length} search records.`);
