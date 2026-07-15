# Atom UI Website Changelog

## Unreleased

- Added a full-width desktop documentation shell with balanced navigation rails.
- Added local documentation search backed by an Atom Dialog, Atom Combobox,
  and a statically generated Markdown index.
- Aligned and compacted the search trigger with the navigation links and added
  direct touch and pen activation for tablet and phone reliability.
- Widened the tablet navigation Drawer and increased tablet navigation touch
  targets without changing the established phone layout.
- Expanded the phone navigation Drawer to the full viewport with larger menu
  typography, spacing, and 44-pixel minimum link targets.
- Placed the responsive navigation trigger on the right before the theme
  control, hid the GitHub action on phone widths, and made both controls
  reliable touch targets.
- Allowed the local network development origin so phone and tablet browsers
  receive current client JavaScript and working interactive controls.
- Created the independent Atom UI documentation website repository.
- Added the complete static documentation architecture for Overview, Guides,
  Components, and Utilities.
- Added a minimal responsive Atom-based shell with light and dark themes,
  desktop navigation, mobile Drawer navigation, and page anchors.
- Added committed Markdown content, Atom package provenance, and content
  validation against the installed export surface.
- Overrode Next.js's bundled PostCSS version with the patched compatible
  release identified by the npm security audit.
