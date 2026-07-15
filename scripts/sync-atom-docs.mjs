import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
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

for (const section of navigation.sections) {
  if (section.slug !== "components" && section.slug !== "utilities") continue;

  await mkdir(path.join(root, "content", section.slug), { recursive: true });
  for (const document of section.documents) {
    if (document.slug === "hooks") continue;
    const expectedSection = utilitySlugs.has(document.slug)
      ? "utilities"
      : "components";
    if (expectedSection !== section.slug) {
      throw new Error(`${document.slug} is assigned to the wrong section`);
    }
    await cp(
      path.join(componentSource, document.slug, "README.md"),
      path.join(root, "content", section.slug, `${document.slug}.md`),
    );
  }
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

console.log("Atom component and utility docs synchronized.");
