# Atom UI Documentation Website

Independent public documentation website for `@flowstack-ui/atom`.

Production: [atom-ui.com](https://atom-ui.com)

The site presents Atom-specific overview pages, guides, component API docs, and
utilities in a minimal responsive documentation shell built from real Atom
primitives. It supports light and dark themes and generates one static route per
document without MDX or live examples. The shell spans the viewport on wide
screens, uses a touch-sized navigation Drawer on tablet and phone widths, and
provides local documentation search through an Atom Dialog.

## Repository Boundary

This is an independent Git repository. It installs the published Atom package
from npm and must build without the sibling package repository.

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

`npm run test:all` is the equivalent comprehensive verification alias. The
website does not yet own an automated browser server; port `4002` is reserved
for that future test layer.

The production build is a static export in `out/`.

`npm run search:index` regenerates the local documentation search index. The
normal build and verification commands run it automatically.

## Content

- `content/navigation.json` defines the public sections and routes.
- `content/overview/` contains Overview pages.
- `content/guides/` contains public usage guides.
- `content/components/` contains one page per component.
- `content/utilities/` contains utilities and hooks.
- `content/atom-source.json` records package provenance.

`npm run content:sync` is a maintainer convenience for deliberately seeding
component and utility docs from a sibling Atom checkout. It is not part of the
production build, and synchronized files remain committed to this repository.

## Documentation

- `AGENTS.md` - repository rules and routing.
- `CURRENT.md` - current state and constraints.
- `TODO.md` - active unfinished work.
- `CHANGELOG.md` - website history.
- `docs/README.md` - durable documentation index.
