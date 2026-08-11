# Content System

## Ownership

Website Markdown is committed under `content/` so a clean clone can build
without the Atom package repository. Package docs remain authoritative for the
npm API; website content is their reviewed web presentation.

## Manifest

`content/navigation.json` is the canonical website route and navigation list.
Every entry must have a matching Markdown file.

Components and Utilities together must account for every public Atom subpath.
`npm run content:check` compares the manifest with the installed package.

## Provenance

`content/atom-source.json` records:

- package name;
- reviewed version;
- source repository;
- source commit;
- review date.

The installed Atom version and recorded content version must match.

## Synchronization

`npm run content:sync` deliberately refreshes the package-owned documentation
surface from `../package/` for maintainers who have both repositories locally.
It merges every component and selected utility README with its changelog, and
copies only consumer-facing package guides, the package-boundary overview, and
root release history. It removes maintainer-only sections such as test evidence
from synchronized component pages. CI procedures, documentation-authoring
instructions, playground and release checklists, and package audits are never
published as website routes. The command also updates the exact source commit
and review date. It is not run by install, build, CI, or deployment.

Review synchronized changes before committing them. Website-specific
Introduction, Accessibility, Styling, Animation, Composition, server-rendering,
and Hooks pages are not overwritten by the sync script.

`npm run content:check` verifies that all 71 installed Atom subpaths are
represented, synchronized pages include changelogs, source provenance is exact,
the content tree contains no unlisted Markdown pages, and maintainer-only routes
or evidence references have not leaked into public content.
