# Responsive Layout

## Marketing Pages

The desktop hero balances product copy and the interaction field. At 1320
pixels the copy owns the first viewport and the interaction field moves below
it, preventing both columns from compressing. Content sections change columns
at their own pressure points; the 640-pixel state stacks actions, cards,
expressions, families, FAQ, footer navigation, and 404 content.

Review 1440, 1320, 1280, 1180, 1080, 1024, 900, 768, 640, 430, 390, and 320
pixels, plus short desktop viewports.

## Documentation

Guides and Primitives share the reading plane but never share a local route
list. Guide routes expose overview, guides, and architecture; primitive routes
expose all component and utility public subpaths through counted, collapsible
categories. Previous/next navigation remains inside the current scope.

- Above 1180 pixels: left navigation, article, and right page outline.
- From 1024 through 1180 pixels: persistent left navigation and article; the
  right outline is available from the responsive page control.
- Below 1024 pixels: both rails become sticky-toolbar Drawers.
- Below 640 pixels: article gutters reduce, API tables and code stay internally
  scrollable, and previous/next remain one balanced row.

Each primitive page owns a bounded live-behavior canvas. The canvas centers
compact specimens, aligns expanding specimens from the top so disclosure grows
downward, gives collection specimens the available width, and owns internal
horizontal overflow when a semantic collection cannot compress further. On
phones it becomes full bleed without creating document-level overflow; the
Interactive status remains a single-line header Badge and the behavior signal
stacks below its instruction.

The page owns vertical scrolling. The desktop navigation is sticky but does not
create an independent Brick ScrollArea, preserving route and rail position and
avoiding nested page-scale landmarks.

## Global Navigation

Guides, Primitives, and Accessibility are mutually exclusive global sections.
Primary links disappear below 1181 pixels and a Drawer trigger appears. Search
becomes icon-only below 900 pixels, GitHub hides below 640 pixels, and the Atom
mark plus exact package version remain visible. The global Drawer becomes full
viewport on phone widths and closes automatically when returning to desktop.

## Invariants

- No page-level horizontal overflow at any supported width.
- Tables and code expose keyboard-accessible internal overflow.
- Search, theme, GitHub, menu, and Drawer-close controls retain centered icons,
  accessible names, and touch-sized targets.
- Focus indicators remain visible inside rails, code, tables, and footer links.
- Responsive changes preserve reading order and heading hierarchy.
- Live specimens never clip their active content or move overflow responsibility
  to the document viewport.
