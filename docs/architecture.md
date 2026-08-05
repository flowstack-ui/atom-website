# Website Architecture

## Runtime Shape

The website uses the Next.js App Router and native Vercel output. The product
homepage, documentation landings, all manifest documents, metadata, sitemap,
and social artwork are generated at build time. No known public content route
requires request-time rendering.

## Product And Presentation Boundaries

Atom is the documented product. Exact published Brick is the website's
presentation system. The application-owned Atom theme maps Brick's public
semantic tokens; page layouts, brand artwork, content, routes, and spatial
compositions remain website code.

The website also installs the documented Atom release directly, but only live
specimens import it. That makes the demonstrated behavior an explicit runtime
contract instead of relying on Brick's private dependency graph. Brick remains
the site-building layer, Atom remains headless, and website CSS supplies every
specimen's appearance. `content/atom-source.json` records the exact release and
source commit represented by both documentation and demonstrations.

## Server And Client Boundaries

Markdown loading, heading extraction, metadata, structured data, syntax-token
generation, AI-readable documents, and route generation stay on the server or
at build time. Route-scoped client boundaries own only interaction:

- app-bar state, appearance switching, and responsive navigation;
- lazy-loaded command search and its static index;
- scoped guide/primitive navigation, mobile documentation drawers, and active
  page outline;
- catalog filtering;
- one route-selected Atom specimen, lazy-loaded through its seven-category
  behavior family rather than a monolithic 70-example client registry;
- copy controls, homepage interaction field, Accessibility channel instrument,
  and FAQ Accordion; and
- an explicit client wrapper for interactive Brick Button use from server pages.

The complete Markdown graph and Shiki runtime do not enter browser bundles.
Only the current specimen family enters a primitive route's client graph.

## Routes

- `/` is the designed product homepage.
- `/docs/` is the Guides overview and excludes the primitive catalog from its
  local navigation.
- `/docs/components/` is the Primitives overview for all 70 component and
  utility public subpaths, with categorized catalog-only local navigation and
  one scoped pagination sequence. Utility detail URLs remain under
  `/docs/utilities/` while belonging to this reference experience.
- `/docs/overview/accessibility/` is a promoted flagship guide while retaining
  the Guides reading context.
- `/docs/[section]/[slug]/` renders every manifest document.
- Unknown routes render the branded 404 page.
- Sitemap, search, metadata, and AI-readable outputs derive from the same
  committed navigation and content graph.
