# Website Style Guide

## Direction

Use quiet cosmic precision: ion cyan, spectral blue, plasma mint, deep
blue-black, mineral white, restrained spatial fields, and technical geometry.
Homepage visuals may be expressive; documentation remains on an opaque, calm
reading plane.

The permanent origin mark combines one central particle, an interrupted orbit,
and two asymmetric signals. It must remain recognizable without a background
tile at favicon, app-bar, footer, and social sizes.

## Layout

- App bar: 72 pixels on desktop and 64 pixels at compact widths.
- Marketing content: centered within a 92rem maximum and responsive gutters.
- Documentation: up to 100rem with 15.5rem left and 14rem right rails.
- Article: up to 51rem for long-form reading.
- Right outline disappears below 1181 pixels; both rails become responsive
  Drawers below 1024 pixels.
- Homepage composition transitions follow content pressure at 1320, 1180,
  1024, 900, and 640 pixels rather than device names.

## Theme

Theme values map Brick's public semantic tokens in `globals.css`. Both
appearances must qualify foreground/surface pairs, action states, focus,
selection, borders, code syntax, and compact text. The pre-paint script assigns
`data-brick-appearance` before hydration and synchronizes native color scheme.

Brand artwork may use website-owned raw values. Finished components use Brick
semantic roles. Do not patch private Brick or Atom anatomy.

## Search And Drawers

The app-bar trigger opens a Brick Dialog with a focused Input and locally ranked
results. Desktop and tablet use a centered panel; phone uses a full-viewport
surface. The phone input stays at least 16 pixels to prevent Safari focus zoom.

Global mobile navigation is a branded full-height Drawer. Documentation uses
separate Browse and page-outline Drawers below its rail breakpoint. Controls
remain touch sized and carry explicit accessible names.

## Documentation

- Use ordinary sentence case for explanatory prose. Uppercase treatment is
  reserved for short labels and eyebrows.
- Build-time syntax color serves comprehension without a browser Shiki runtime.
- Code and API tables scroll inside bounded, keyboard-focusable regions.
- Page outlines derive from real headings; previous/next navigation follows the
  complete manifest.
- Decorative diagrams must not compete with body text, code, or focus rings.

## Motion And Alternate Modes

Use restrained motion only for spatial ambience and direct state feedback.
Respect reduced motion, forced colors, and native focus indication. Decorative
motion never communicates an accessibility claim by itself.
