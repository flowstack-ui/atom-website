import { access, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const navigation = JSON.parse(
  await readFile(path.join(root, "content/navigation.json"), "utf8"),
);
const provenance = JSON.parse(
  await readFile(path.join(root, "content/atom-source.json"), "utf8"),
);
const atomManifest = JSON.parse(
  await readFile(
    path.join(root, "node_modules/@flowstack-ui/atom/package.json"),
    "utf8",
  ),
);
const searchRecords = JSON.parse(
  await readFile(path.join(root, "public/search-index.json"), "utf8"),
);

const seenRoutes = new Set();
const publicSubpaths = new Set();
const errors = [];

for (const section of navigation.sections) {
  for (const document of section.documents) {
    const route = `${section.slug}/${document.slug}`;
    if (seenRoutes.has(route)) errors.push(`Duplicate route: ${route}`);
    seenRoutes.add(route);

    const file = path.join(root, "content", section.slug, `${document.slug}.md`);
    try {
      await access(file);
      const source = await readFile(file, "utf8");
      if (!source.startsWith("# ")) errors.push(`${route} has no H1 title`);
      if (/from ["']radix-ui["']|@radix-ui\//.test(source)) {
        errors.push(`${route} teaches a Radix package import`);
      }
    } catch {
      errors.push(`Missing content: ${route}`);
    }

    if (section.slug === "components" || section.slug === "utilities") {
      publicSubpaths.add(`./${document.slug}`);
    }
  }
}

const exportedSubpaths = new Set(
  Object.keys(atomManifest.exports).filter((subpath) => subpath !== "."),
);
for (const subpath of exportedSubpaths) {
  if (!publicSubpaths.has(subpath)) errors.push(`Export missing from navigation: ${subpath}`);
}
for (const subpath of publicSubpaths) {
  if (!exportedSubpaths.has(subpath)) errors.push(`Navigation is not exported by Atom: ${subpath}`);
}

const indexedRoutes = new Set();
for (const record of searchRecords) {
  if (!record.id || !record.url || !record.title || !record.section) {
    errors.push("Search index contains an incomplete record");
    continue;
  }
  const route = record.url
    .split("#")[0]
    .replace(/^\/docs\//, "")
    .replace(/\/$/, "");
  if (!seenRoutes.has(route)) errors.push(`Search record has unknown route: ${record.url}`);
  if (record.kind === "page") indexedRoutes.add(route);
}
for (const route of seenRoutes) {
  if (!indexedRoutes.has(route)) errors.push(`Route missing from search index: ${route}`);
}

if (provenance.package !== "@flowstack-ui/atom") {
  errors.push("Content provenance has the wrong package name");
}
if (provenance.version !== atomManifest.version) {
  errors.push(
    `Content reviewed for Atom ${provenance.version}, installed ${atomManifest.version}`,
  );
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validated ${seenRoutes.size} routes against ${exportedSubpaths.size} Atom subpaths.`,
);
