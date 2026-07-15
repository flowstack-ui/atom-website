# Current Atom UI Website State

The independent website repository is initialized and version one is
implemented as a statically generated Next.js application.

## Implemented

- Overview, Guides, Components, and Utilities navigation.
- Static routes for every navigation document.
- Sixty component pages and six utility pages.
- Atom AppBar, Sidebar, Drawer, Dialog, Combobox, NavList, ScrollArea, Button,
  Tooltip, and SkipLink primitives in the website shell.
- Responsive desktop, tablet, and mobile layouts with touch-sized header
  controls, a full-width desktop shell, wider side Drawer navigation on tablet
  widths, and full-screen phone navigation.
- Header actions that hide GitHub on phones and place the menu trigger directly
  before the theme control on tablet and phone widths.
- Local static documentation search with a compact navigation-aligned trigger,
  reliable touch activation, a focus-trapped and scroll-locking Atom Dialog,
  and a generated content index.
- Light and dark themes with system preference and local persistence.
- Static Markdown rendering with tables, code, deterministic headings, and
  right-hand page navigation.
- Content provenance and export-surface validation.
- Static export suitable for independent hosting.

## Current Atom Baseline

- Package: `@flowstack-ui/atom`
- Version: `0.2.0`
- Exact source commit: recorded in `content/atom-source.json`

## Constraints

- The production build cannot depend on `../package/`.
- Component examples are static code; MDX and live previews are deferred.
- Version switching, analytics, accounts, comments, and a footer are outside
  version-one scope.
- The permanent logo and production domain are not yet approved.

## Deployment Status

The canonical source repository is
[`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website).
Local implementation is complete. A production hosting project and domain have
not been configured.
