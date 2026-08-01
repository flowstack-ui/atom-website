import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const atomRoot = path.resolve(root, "../package");
const componentSource = path.join(atomRoot, "docs/components");
const navigation = JSON.parse(
  await readFile(path.join(root, "content/navigation.json"), "utf8"),
);
const utilitySlugs = new Set([
  "collection",
  "direction",
  "portal",
  "virtualizer",
  "visually-hidden",
]);
const packageGuideRoutes = new Map([
  ["getting-started", ["overview", "getting-started"]],
  ["imports", ["guides", "imports"]],
  ["public-api", ["guides", "public-api"]],
]);
const architectureRoutes = new Map([
  ["README", "overview"],
]);
const maintainerOnlyContent = [
  ["architecture", "public-api-audit"],
  ["architecture", "release-readiness-audit"],
  ["guides", "component-documentation"],
  ["guides", "continuous-integration"],
  ["guides", "release-checklist"],
];

const maintainerSectionHeadings = new Set([
  "Audits",
  "Documentation Shape",
  "Evidence",
]);

function trimDocument(source) {
  return `${source.trim()}\n`;
}

function removeMaintainerSections(source) {
  const lines = source.split("\n");
  const output = [];
  let skippedLevel = null;

  for (const line of lines) {
    const heading = /^(#{2,6})\s+(.+?)\s*$/u.exec(line);
    if (heading) {
      const level = heading[1].length;
      if (skippedLevel !== null && level <= skippedLevel) skippedLevel = null;
      if (maintainerSectionHeadings.has(heading[2])) {
        skippedLevel = level;
        continue;
      }
    }
    if (skippedLevel === null) output.push(line);
  }

  return output.join("\n").replace(/\n{3,}/gu, "\n\n").trim();
}

async function writeContent(section, slug, source) {
  const directory = path.join(root, "content", section);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${slug}.md`), trimDocument(source));
}

function mergeComponentHistory(readme, changelog) {
  const body = removeMaintainerSections(readme)
    .replace(/\n## Changelog\s*\n+(?:See )?\[CHANGELOG\.md\]\(\.\/CHANGELOG\.md\)\.?\s*$/u, "")
    .trim();
  const history = changelog
    .replace(/^# .+?\n+/u, "")
    .replace(/^## /gmu, "### ")
    .trim();
  return `${body}\n\n## Changelog\n\n${history}`;
}

for (const section of navigation.sections) {
  if (section.slug !== "components" && section.slug !== "utilities") continue;

  for (const document of section.documents) {
    if (document.slug === "hooks") continue;
    const expectedSection = utilitySlugs.has(document.slug)
      ? "utilities"
      : "components";
    if (expectedSection !== section.slug) {
      throw new Error(`${document.slug} is assigned to the wrong section`);
    }
    const sourceDirectory = path.join(componentSource, document.slug);
    const [readme, changelog] = await Promise.all([
      readFile(path.join(sourceDirectory, "README.md"), "utf8"),
      readFile(path.join(sourceDirectory, "CHANGELOG.md"), "utf8"),
    ]);
    await writeContent(
      section.slug,
      document.slug,
      mergeComponentHistory(readme, changelog),
    );
  }
}

for (const [sourceSlug, [section, targetSlug]] of packageGuideRoutes) {
  const source = await readFile(
    path.join(atomRoot, "docs/guides", `${sourceSlug}.md`),
    "utf8",
  );
  await writeContent(
    section,
    targetSlug,
    removeMaintainerSections(source),
  );
}

for (const [sourceSlug, targetSlug] of architectureRoutes) {
  const source = await readFile(
    path.join(atomRoot, "docs/architecture", `${sourceSlug}.md`),
    "utf8",
  );
  await writeContent("architecture", targetSlug, removeMaintainerSections(source));
}

const packageChangelog = await readFile(path.join(atomRoot, "CHANGELOG.md"), "utf8");
await writeContent(
  "overview",
  "releases",
  `# Releases\n\nAtom follows semantic versioning. The website and npm package release independently; this page mirrors the complete reviewed package changelog.\n\n${packageChangelog.replace(/^# .+?\n+/u, "")}`,
);

for (const [section, slug] of maintainerOnlyContent) {
  await rm(path.join(root, "content", section, `${slug}.md`), { force: true });
}

const packageManifest = JSON.parse(
  await readFile(path.join(atomRoot, "package.json"), "utf8"),
);
let sourceCommit = "unavailable";
try {
  sourceCommit = execFileSync("git", ["-C", atomRoot, "rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim();
} catch {
  // The committed content remains usable when the sibling checkout has no Git metadata.
}

await writeFile(
  path.join(root, "content/atom-source.json"),
  `${JSON.stringify(
    {
      package: packageManifest.name,
      version: packageManifest.version,
      sourceRepository: "https://github.com/flowstack-ui/atom",
      sourceCommit,
      lastReviewed: new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date()),
    },
    null,
    2,
  )}\n`,
);

console.log("Atom consumer documentation and release notes synchronized.");
