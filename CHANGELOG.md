# Atom UI Website Changelog

## Unreleased

- Recorded the Vercel production deployment at `atom-ui.com` and made that
  canonical origin the static metadata, robots, and sitemap default.
- Established `flowstack-ui/atom-website` as the canonical public GitHub
  repository, independent from `flowstack-ui/atom`.
- Added a full-width desktop documentation shell with balanced navigation rails.
- Added local documentation search backed by an Atom Dialog, Atom Combobox,
  and a statically generated Markdown index.
- Replaced the phone's nested search Dialog with a permanently integrated
  Drawer Combobox: empty search retains navigation, typed queries replace links
  with unboxed results, and clearing restores navigation without another panel
  or back control.
- Prevented mobile Safari focus zoom by keeping the phone search input at 16
  pixels, and increased the right page-navigation title and link typography.
- Restored the responsive menu trigger to the far right after the theme action
  and replaced the theme control's native title with the same Atom Tooltip used
  by GitHub.
- Removed explicit theme-color metadata after comparison with the Radix website
  showed that mobile Safari repaints its chrome immediately when it derives the
  color directly from the root page background.
- Added a full-height, direct body theme surface matching Radix Themes so its
  background repaint is visible to Safari as soon as the theme changes.
- Apply Radix-style light and dark classes to the document root so Safari sees
  the same root-class theme mutation used by the reference website.
- Increased article, desktop sidebar, and quick-navigation typography; enlarged
  desktop navigation targets; and made quick-navigation links calculate their
  landing position directly below the sticky app bar.
- Disable Atom header tooltips on touch-first devices so long presses cannot
  leave tooltip content open over the mobile navigation.
- Aligned and compacted the search trigger with the navigation links and added
  direct touch and pen activation for tablet and phone reliability.
- Widened the tablet navigation Drawer and increased tablet navigation touch
  targets without changing the established phone layout.
- Expanded the phone navigation Drawer to the full viewport with larger menu
  typography, spacing, and 44-pixel minimum link targets.
- Placed the responsive navigation trigger on the right after the theme
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
