import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { compileThemeFiles, writeThemeArtifacts } from "@flowstack-ui/theme";

const repositoryRoot = resolve(import.meta.dirname, "..");
const source = resolve(repositoryRoot, "theme/atom-website.theme.json");
const contract = resolve(repositoryRoot, "theme/brick-theme-contract.json");
const committedDirectory = resolve(repositoryRoot, "src/app/theme/generated");
const temporaryDirectory = await mkdtemp(resolve(tmpdir(), "atom-website-theme-"));
const artifactNames = [
  "theme.css",
  "theme.tokens.json",
  "theme.manifest.json",
  "theme.report.json",
];

try {
  const compilation = await compileThemeFiles(source, contract);
  await writeThemeArtifacts(compilation, temporaryDirectory);

  assert.equal(compilation.manifest.theme.id, "atom-website");
  assert.equal(compilation.manifest.appearances.default, "system");
  assert.deepEqual(compilation.manifest.appearances.supported, ["light", "dark"]);
  assert.equal(compilation.report.counts.brickRequired, 144);
  assert.equal(compilation.report.counts.componentInputs, 0);
  assert.ok(compilation.report.counts.projectTokens > 0);

  for (const artifactName of artifactNames) {
    const [expected, committed] = await Promise.all([
      readFile(resolve(temporaryDirectory, artifactName), "utf8"),
      readFile(resolve(committedDirectory, artifactName), "utf8"),
    ]);
    assert.equal(committed, expected, `${artifactName} does not match the Atom website theme source`);
  }

  console.log("Verified deterministic Atom website theme artifacts.");
} finally {
  await rm(temporaryDirectory, { recursive: true, force: true });
}
