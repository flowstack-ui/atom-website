# Current Atom UI Website State

Version two is published from `main` at [atom-ui.com](https://atom-ui.com).
Website `1.0.4` adopts Brick's published physical-iPhone Code Block correction
and restores bounded mobile documentation tables.

## Implemented Version Two

- A designed product homepage that explains Atom, accessibility, headless
  ownership, the Atom-to-Brick relationship, primitive families, and adoption.
- A permanent code-native origin mark, favicon, social artwork, and coherent
  ion-cyan light/dark Atom theme assigned through Brick's public semantic
  tokens.
- Exact published `@flowstack-ui/brick` `0.1.3` as the presentation system and
  exact published `@flowstack-ui/atom` `0.20.11` as the direct live-specimen
  subject. Shell and reading UI use Brick; route-scoped specimens import Atom
  explicitly and receive only application-owned visual styling.
- Eighty-one provenance-checked documentation routes covering all seventy Atom
  public subpaths, plus product home, docs overview, primitive catalog, and 404.
- Brick-powered header, search Dialog, mobile Drawers, NavLists, Buttons,
  Cards, Badges, Tabs, Progress, Accordion, Code, CodeBlock, Table, Input, Text,
  Grid, and Stack compositions where their public contracts fit.
- A responsive documentation reading plane with separate Guide and Primitive
  route scopes, mutually exclusive global selection, scoped desktop/mobile
  navigation and pagination, page-aware anchors, build-time Shiki, copyable
  code, and keyboard-scrollable tables.
- A flagship Accessibility guide with an interactive keyboard, screen-reader,
  touch, and focus contract instrument; clear ownership highlights; an
  evidence-qualified responsibility matrix; and practical validation guidance.
- A searchable primitive reference spanning all 70 component and utility
  subpaths, with counted collapsible rail categories, grouped compact overview
  cards, top-right category badges, readable navigation rows, continuous
  open-state dividers, one Atom-colored focus treatment, and a designed empty
  state.
- A live behavior canvas on every public subpath, split into seven lazy category
  chunks, plus semantic Feature Signals that turn each document's real feature
  list into consistent compact prose cards without duplicating its content.
  Form, selection, navigation, overlay, collection, disclosure, feedback, and
  utility specimens use the documented Atom parts and live state rather than
  hardcoded visual selection, including measured swipe actions, expandable
  trees, a store-rendered Toast viewport, and application-owned progress
  geometry.
- Pre-paint appearance selection, local persistence, reduced-motion and
  forced-colors handling, responsive footer, branded 404, and quiet Flowstack
  and Swifty endorsement.
- Unique metadata and canonical URLs, sitemap, robots, manifest, favicon,
  dynamic social image, linked AI-readable outputs, Vercel Analytics, security
  headers, and WebSite, Organization, SoftwareSourceCode, FAQ, CollectionPage,
  TechArticle, and breadcrumb structured data.
- Native Next.js/Vercel output with all known content routes statically
  prerendered.
- Exact published Brick owner styles for the sixteen used components, reducing
  emitted CSS by 59 percent from the correctness baseline without cascade drift.
- Four-profile Chromium and WebKit verification covering both appearances,
  Axe, horizontal overflow, search focus, responsive Drawers, route resolution,
  70-route specimen coverage, cross-family interaction, mobile canvas geometry,
  and 404 recovery. The current dependency audit has zero findings.
- Brick owns Code Block's mobile text-inflation correction. The website keeps
  an explicit iOS Safari production target and built iPhone WebKit evidence
  proving that Next retains the required prefixed declaration and every
  Getting Started example resolves to one selected font size.
- Mobile API-table scroll frames remain inside the documentation reading plane
  while their wide semantic contents scroll internally through the final
  column in both mobile Chromium and WebKit.
- GitHub `main` requires the repository check plus desktop/mobile Chromium and
  WebKit checks, resolved conversations, and an up-to-date pull request; force
  pushes and branch deletion are disabled.

## Current Package Baseline

- Documented product: `@flowstack-ui/atom` `0.20.11`
- Exact Atom source commit: `content/atom-source.json`
- Website presentation system: `@flowstack-ui/brick` `0.1.3`
- Website application version: `1.0.4`

## Remaining Release Gates

- Manual macOS/iPhone assistive-technology, zoom, orientation, motion, and
  forced-colors evidence.

Owner review has covered the complete localhost and public preview experience.
The release gate passes in desktop/mobile Chromium and WebKit. Preview
Lighthouse measured 100 Accessibility, Best Practices, and Agentic Browsing;
performance varied from 94–99 mobile and 99–100 desktop with zero layout shift
and at most 30 ms total blocking time. Preview SEO is intentionally unscored
because Vercel adds `X-Robots-Tag: noindex` outside the application.

## Deployment Status

The canonical repository is
[`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website).
Vercel deploys version two at [atom-ui.com](https://atom-ui.com) from `main`.
Canonical redirects, schema, social artwork, analytics injection, crawler
outputs, all sitemap URLs, and the retained pre-release rollback revision have
been verified in production. Google Search Console and Bing Webmaster Tools
sitemap submission and priority indexing requests are complete.
