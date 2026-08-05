<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md - Atom UI Website

This repository owns the independent public documentation website for
`@flowstack-ui/atom`.

## Read First

- `README.md` - project overview and commands.
- `CURRENT.md` - implemented state and current constraints.
- `TODO.md` - active website-owned work.
- `docs/README.md` - durable website documentation index.
- `docs/responsive-layout.md` - responsive shell and touch-target invariants.
- `docs/search.md` - local search architecture and interaction contract.
- `content/atom-source.json` - reviewed Atom package version and provenance.

## Scope

- Website application source lives under `src/`.
- Committed website content lives under `content/`.
- Website maintenance docs live under `docs/`.
- Website-only scripts live under `scripts/`.
- The sibling `../package/` repository is not part of this repository.

## Durable Rules

- Keep this repository independently installable and buildable from a clean
  clone. Production must not read from `../package/`.
- Install Atom from npm with an explicit version.
- Use Brick as the website presentation system. Import Atom directly only in
  the route-scoped live specimens that demonstrate Atom's public behavior; do
  not add another primitive library.
- Keep Atom headless: website CSS owns every specimen's visual presentation,
  while Atom owns only the behavior its public primitive or utility documents.
- Keep consumer content in Markdown. Live specimens remain typed website code
  selected by the committed primitive taxonomy; do not add MDX.
- Keep the responsive behavior documented in `docs/responsive-layout.md` and
  preserve it when changing the shell or header.
- Keep search local and statically generated from committed website content;
  do not introduce a hosted search dependency without approval.
- Record the reviewed Atom version and source commit in
  `content/atom-source.json`.
- Run `npm run verify` before completing implementation changes.
- Update `CURRENT.md`, `TODO.md`, and `CHANGELOG.md` when their state changes.
- Deployment configuration belongs in this repository, never in the package
  repository.
