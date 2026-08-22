# Atom UI Documentation Website

Independent public documentation website for `@flowstack-ui/atom`.

Production: [atom-ui.com](https://atom-ui.com)

The site presents Atom as the headless behavioral foundation beneath accessible
React interfaces. Its product shell consumes exact published Brick components
through an application-owned Atom theme. Primitive pages import exact published
Atom directly for route-scoped live behavior specimens, with all specimen
appearance remaining website-owned. Every known route is statically
prerendered by native Next.js and deployed through Vercel.

## Repository Boundary

This is an independent Git repository. It installs exact published Brick and
Atom releases and must build without either sibling package repository. Brick
owns the finished website shell; direct Atom imports are limited to documented
live behavior specimens.

- Package source and authoritative API docs:
  [`flowstack-ui/atom`](https://github.com/flowstack-ui/atom)
- Website source, web content, and deployment:
  [`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website)
- Reviewed Atom version: `content/atom-source.json`

## Development

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3002`.

For a real phone, tablet, or another computer on the trusted local network:

```bash
npm run dev:network
```

Open the Network URL printed by Next.js. With the currently used FLOWSTACK LAN
address, that is `http://192.168.4.36:3002`.

## Verification

```bash
npm run content:check
npm run typecheck
npm run lint
npm run build
```

Run all checks with:

```bash
npm run verify
```

The application-owned theme source is `theme/atom-website.theme.json`. Run
`npm run theme:compile` after an intentional source change and
`npm run theme:check` to prove its committed CSS, token, manifest, and report
artifacts are current. Production imports only the generated CSS.

Use `npm run check:focused` while editing content, `npm run check:repository`
for a merge candidate, and `npm run check:release` for the production build
plus desktop Chromium, Firefox, desktop WebKit, and mobile Chromium/WebKit
smoke coverage. `npm run test:all` is
the comprehensive release alias. Browser tests own strict preview port `4002`
and never reuse an existing listener.

The website declares the pinned `baseline 2023 with downstream` browser floor.
Automated WebKit and mobile profiles are portable engine evidence; physical
Safari, iOS, Android, browser chrome, and assistive-technology claims remain
separate manual evidence.

The production build uses native Next.js output. All known content routes are
still prerendered as static HTML; no request-time application server behavior is
required by the website.

The normal build regenerates the local search index, build-time syntax tokens,
and linked `llms.txt`/complete `llms-full.txt` documentation outputs.

## Content

- `content/navigation.json` defines the public sections and routes.
- `content/overview/` contains Overview pages.
- `content/guides/` contains public usage guides.
- `content/components/` contains one page per component.
- `content/utilities/` contains utilities and hooks.
- `content/atom-source.json` records package provenance.

`npm run content:sync` is a maintainer command for refreshing component and
utility pages with their changelogs, selected consumer guides, the public
package-boundary overview, and release history from a sibling Atom checkout.
Maintainer procedures, test evidence, playground instructions, and release
audits are excluded. The command is not part of the production build, and all
reviewed output remains committed to this repository.

## Documentation

- `AGENTS.md` - repository rules and routing.
- `CURRENT.md` - current state and constraints.
- `TODO.md` - active unfinished work.
- `CHANGELOG.md` - website history.
- `docs/README.md` - durable documentation index.
