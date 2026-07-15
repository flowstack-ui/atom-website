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
  widths, full-screen phone navigation, and a readable wide-desktop page
  navigation hierarchy.
- Header actions that hide GitHub on phones, place the menu trigger directly
  after the theme control on tablet and phone widths, and use consistent Atom
  Tooltips for GitHub and theme actions on hover-capable, fine-pointer devices.
- Local static documentation search with a compact navigation-aligned trigger,
  a focus-trapped and scroll-locking Atom Dialog on desktop and tablet, an
  inline phone Combobox that remains inside the Drawer focus scope, and a
  generated content index.
- Light and dark themes with system preference, local persistence, and a
  full-height root theme surface that lets mobile Safari repaint its chrome
  with the page.
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
- The permanent logo is not yet approved.

## Deployment Status

The canonical source repository is
[`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website).
Vercel deploys the public site at [atom-ui.com](https://atom-ui.com) from the
`main` branch. Cloudflare remains the authoritative DNS provider; the apex
record resolves directly to Vercel and `www` redirects to the apex domain.
