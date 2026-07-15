# Website Architecture

## Runtime Shape

The website uses Next.js App Router and emits a static export. Every known
documentation route is generated at build time from the committed navigation
manifest and Markdown content.

## Server And Client Boundaries

Markdown loading, metadata, heading extraction, and document rendering run at
build time. Client boundaries are limited to behavior that needs browser state:

- current-route navigation state;
- tablet and phone Drawer behavior;
- Dialog and Combobox search behavior;
- theme persistence;
- active right-navigation headings;
- Atom primitives whose behavior requires the client.

Server-rendered document content is passed through the client shell as React
children so the content does not need browser-side loading.

## Search Boundary

Search data is generated from committed Markdown and navigation data before a
production build. The client fetches the static index only when search is used.
Atom Dialog owns modal focus, dismissal, focus restoration, and scroll locking;
Atom Combobox owns input and result-list keyboard behavior. No package source,
hosted search service, or runtime server is required.

Search opened from the navigation Drawer is a nested modal layer. Closing it
returns focus to its Drawer trigger, and the modal stack closes search before
the navigation Drawer.

## Atom Boundary

The shell uses public `@flowstack-ui/atom` subpaths. Website CSS owns every
visual decision. Native document markup remains native HTML.

The website must not import package source, internal Atom paths, or another
behavioral component library.

## Routes

- `/` renders Introduction.
- `/docs/[section]/[slug]/` renders every manifest document.
- Unknown routes render the static 404 page.
- Sitemap and robots metadata are emitted from the same manifest.
