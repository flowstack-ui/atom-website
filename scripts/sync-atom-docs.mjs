import { mkdir, readFile, writeFile } from "node:fs/promises";
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
  ["continuous-integration", ["guides", "continuous-integration"]],
  ["component-documentation", ["guides", "component-documentation"]],
  ["release-checklist", ["guides", "release-checklist"]],
]);
const architectureRoutes = new Map([
  ["README", "overview"],
  ["public-api-audit", "public-api-audit"],
  ["release-readiness-audit", "release-readiness-audit"],
]);

function trimDocument(source) {
  return `${source.trim()}\n`;
}

function rewritePackageLinks(source) {
  return source
    .replaceAll(
      "[Public API audit](public-api-audit.md)",
      "[Public API audit](/docs/architecture/public-api-audit/)",
    )
    .replaceAll(
      "[Release readiness audit](release-readiness-audit.md)",
      "[Release readiness audit](/docs/architecture/release-readiness-audit/)",
    )
    .replaceAll(
      "[`../architecture/release-readiness-audit.md`](../architecture/release-readiness-audit.md)",
      "[release readiness audit](/docs/architecture/release-readiness-audit/)",
    )
    .replaceAll(
      "[`../../playground/docs/versioning.md`](../../playground/docs/versioning.md)",
      "[playground versioning policy](https://github.com/flowstack-ui/atom/blob/main/playground/docs/versioning.md)",
    );
}

async function writeContent(section, slug, source) {
  const directory = path.join(root, "content", section);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${slug}.md`), trimDocument(source));
}

function mergeComponentHistory(readme, changelog) {
  const body = readme
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
  await writeContent(section, targetSlug, rewritePackageLinks(source));
}

for (const [sourceSlug, targetSlug] of architectureRoutes) {
  const source = await readFile(
    path.join(atomRoot, "docs/architecture", `${sourceSlug}.md`),
    "utf8",
  );
  await writeContent("architecture", targetSlug, rewritePackageLinks(source));
}

const packageChangelog = await readFile(path.join(atomRoot, "CHANGELOG.md"), "utf8");
await writeContent(
  "overview",
  "releases",
  `# Releases\n\nAtom follows semantic versioning. The website and npm package release independently; this page mirrors the complete reviewed package changelog.\n\n${packageChangelog.replace(/^# .+?\n+/u, "")}`,
);

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

console.log("Atom package, component, utility, guide, architecture, and release docs synchronized.");
