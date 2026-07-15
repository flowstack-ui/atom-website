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

`npm run content:sync` deliberately copies component and selected utility docs
from `../package/` for maintainers who have both repositories locally. The
command is not run by install, build, CI, or deployment.

Review synchronized changes before committing them. Website-specific Overview,
Guide, and Hooks pages are not overwritten by the sync script.
