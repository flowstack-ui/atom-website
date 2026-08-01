# Current Atom UI Website State

The independent website is implemented as a statically generated Next.js
application and its public documentation is aligned with Atom 0.20.10.

## Implemented

- Overview, Guides, Architecture, Components, and Utilities navigation.
- Static routes for every navigation document.
- Eighty-one documentation routes: four Overview pages, six consumer Guides,
  one package-boundary Architecture page, sixty-four component pages, and six
  utility pages.
- Complete coverage of all 70 Atom public subpaths, including Clipboard, Image,
  Link, and Multi Select.
- Component and utility API pages merged with their current package changelogs,
  plus selected consumer guides, package-boundary guidance, and release history.
- Public-content validation that rejects maintainer-only routes, package test
  evidence, playground instructions, and coverage-workbook references.
- Atom AppBar, Sidebar, Drawer, Dialog, Combobox, NavList, ScrollArea, Button,
  Tooltip, and SkipLink primitives in the website shell.
- Responsive desktop, tablet, and mobile layouts with touch-sized header
  controls, a full-width desktop shell, wider side Drawer navigation on tablet
  widths, full-screen phone navigation, larger desktop navigation targets, and
  a readable wide-desktop page navigation hierarchy.
- Header actions that hide GitHub on phones, place the menu trigger directly
  after the theme control on tablet and phone widths, and use consistent Atom
  Tooltips for GitHub and theme actions on hover-capable, fine-pointer devices.
- An opaque fixed header surface adjacent to the viewport edge, matching the
  live Radix structure and Safari 26's browser-chrome color-extension criteria;
  immediate theme repainting is confirmed on the affected iPhone.
- Local static documentation search with a compact navigation-aligned trigger,
  a focus-trapped and scroll-locking Atom Dialog on desktop and tablet, an
  inline phone Combobox that remains inside the Drawer focus scope, and a
  generated content index.
- Light and dark themes with system preference, local persistence, Radix-style
  document classes, and a full-height root theme surface.
- Static Markdown rendering with tables, code, deterministic headings, and
  right-hand page navigation with app-bar-aware anchor positioning.
- Content provenance and export-surface validation.
- Pull-request and main-branch CI for content, types, lint, static build,
  dependency audit, and generated-file cleanliness.
- Static export suitable for independent hosting.
- Fixed local development on port `3002` with an explicit LAN command using
  the same port for real-phone and tablet review.

## Current Atom Baseline

- Package: `@flowstack-ui/atom`
- Version: `0.20.10`
- Exact source commit: recorded in `content/atom-source.json`

## Constraints

- The production build cannot depend on `../package/`.
- Component examples are static code; MDX and live previews are deferred.
- Repository setup, documentation authoring, CI, playground testing, release
  operations, and internal audit evidence remain outside the public site.
- Version switching, analytics, accounts, comments, and a footer are outside
  version-one scope.
- The permanent logo is not yet approved.
- Real-device and assistive-technology review remains a manual release check.

## Deployment Status

The canonical source repository is
[`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website).
Vercel deploys the public site at [atom-ui.com](https://atom-ui.com) from the
`main` branch. Cloudflare remains the authoritative DNS provider; the apex
record resolves directly to Vercel and `www` redirects to the apex domain.
