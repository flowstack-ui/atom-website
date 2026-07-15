# Website Style Guide

## Direction

The site is deliberately quiet and documentation-first: system typography,
neutral colors, one-pixel borders, compact navigation, and no decorative
imagery.

## Layout

- Header: 56 pixels on desktop, 52 pixels on mobile.
- Wide desktop shell: full viewport width with balanced 280-pixel outer rails.
- Article: up to 858 pixels, centered inside the flexible middle region.
- Desktop three-column layout begins at 1280 pixels.
- Right navigation is hidden below 1280 pixels.
- Right navigation uses a 14-pixel title and 13.5-pixel links so its hierarchy
  remains readable while staying secondary to the article.
- Desktop navigation becomes a Drawer below 1024 pixels.
- Tablet Drawer: `clamp(360px, 48vw, 420px)` with 48-pixel link targets.
- Phone Drawer: full viewport with the existing 16-pixel navigation and
  44-pixel link targets.
- On responsive widths, the menu trigger is directly before the theme control;
  the GitHub action is hidden below 768 pixels.

Detailed invariants live in `responsive-layout.md`.

## Search

The navigation search trigger appears before Overview. It opens a centered
Atom Dialog with a page overlay, focused search input, and scrollable results.
The desktop panel is at most 580 pixels wide; smaller viewports retain safe
outer space. Search uses the same neutral palette, focus treatment, and reduced
motion rules as the rest of the shell. The phone input must remain at least 16
pixels to prevent automatic viewport zoom on mobile Safari.

## Themes

Theme values live in CSS custom properties. Both themes must maintain readable
text contrast and visible focus indicators. The browser color scheme follows
the selected theme.

## Components

Atom data attributes are the preferred state styling surface. Do not style
private implementation structure or import a visual component framework.

## Motion

Use only restrained feedback transitions. Respect `prefers-reduced-motion` and
never delay semantic or focus state for decorative motion.
