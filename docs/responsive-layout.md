# Responsive Layout

## Wide Desktop

At 1280 pixels and wider, the shell spans the full viewport. The left
documentation navigation and right quick-navigation rail are each 280 pixels.
The middle region absorbs remaining width while the readable article stays at
or below 858 pixels.

The right quick navigation is hidden from 1024 through 1279 pixels. The left
desktop navigation remains visible in that range.

## Tablet

From 768 through 1023 pixels, navigation uses a left Drawer sized with
`clamp(360px, 48vw, 420px)`. Navigation links use 15-pixel text and a minimum
48-pixel target. The search trigger aligns with the link edges but uses a
compact 44-pixel touch target. Section labels use 12-pixel text. Header icon
controls remain at least 44 pixels.

## Phone

Below 768 pixels, navigation fills the viewport and retains 16-pixel link text,
44-pixel minimum link targets, safe-area padding, and the established spacing.
GitHub is hidden. The menu trigger appears on the right immediately before the
theme control.

## Invariants

- The header and documentation shell do not gain a centered maximum-width box.
- Article line length remains capped even as the middle region expands.
- Tablet changes must not reduce or restyle the phone navigation contract.
- Navigation and header controls remain keyboard accessible and touch sized.
- Search appears before Overview in every navigation surface and aligns with
  the navigation-link width.
