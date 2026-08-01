# Atom UI Website Changelog

## 0.2.3 - 2026-07-31

- Updated the exact website dependency and reviewed source provenance to
  published `@flowstack-ui/atom` `0.20.9`.
- Refreshed consumer documentation for initial Accordion/Collapsible motion,
  menu direction and collision handling, submenu intent and tree dismissal,
  repeated Context Menu invocation, and Select portal direction.
- Removed maintainer-only CI, documentation-authoring, playground/release, and
  package-audit material from public website navigation and content.
- Restricted package synchronization to consumer-facing guides and stripped
  maintainer evidence sections from synchronized component pages.
- Added content validation that prevents the removed routes and package test,
  playground, or coverage-workbook references from being published again.

## 0.2.2 - 2026-07-30

- Updated the exact website dependency and reviewed source provenance to
  published `@flowstack-ui/atom` `0.20.2`.
- Refreshed package-owned documentation and release history for the Combobox
  mobile Trigger focus correction and the verified release-command graph.

## 0.2.1 - 2026-07-30

- Updated the exact website dependency and reviewed source provenance to
  published `@flowstack-ui/atom` `0.20.1`.
- Refreshed all package-owned component pages, changelogs, guides,
  architecture audits, and release history so the deployed website includes
  the completed mobile-readiness guidance and Menu/Popover corrections.

## 0.2.0 - 2026-07-30

- Updated the exact website dependency and reviewed documentation baseline to
  published `@flowstack-ui/atom` `0.19.9`.
- Expanded navigation from 74 to 86 documentation routes and now cover all 70
  public package subpaths, including Clipboard, Image, Link, and Multi Select.
- Replaced stale component and utility pages with current authoritative package
  documentation and embedded each page's complete component changelog.
- Added the current package guides, architecture records, release-readiness
  audit, public API audit, and full package changelog to the website.
- Corrected Hooks documentation to match the current public hook exports.
- Strengthened content synchronization and validation for exact provenance,
  changelog coverage, unlisted files, package-local links, and exact dependency
  alignment.
- Updated Next.js to `16.2.12` and pinned patched PostCSS, Sharp, Minimatch, and
  brace-expansion transitives, clearing the website dependency audit.
- Added GitHub Actions verification for pull requests and `main`.

## 0.1.0 - 2026-07-30

- Updated the website to published `@flowstack-ui/atom` `0.4.0`, refreshed
  source provenance, and aligned Popover documentation with visible Title and
  Description relationships, native ARIA naming, and interaction-aware focus.
- Updated the website to the published `@flowstack-ui/atom` `0.3.3` patch,
  refreshed Atom provenance, and corrected Badge count guidance for server-safe
  explicit-subpath use and accessible owning-control labels.
- Standardized local and LAN development on port `3002`, documented the
  matching phone/tablet URL, and reserved `4002` for future browser automation.
- Updated the website to the published `@flowstack-ui/atom` `0.3.2` patch,
  refreshed Atom provenance, and picked up the Dialog modal cleanup fix for
  restoring page interactivity after closing documentation search.
- Updated the website to the published `@flowstack-ui/atom` `0.3.1` patch,
  refreshed Atom provenance, and picked up the overlay cleanup fix that keeps
  page controls clickable after closing documentation search.
- Updated the website to the published `@flowstack-ui/atom` `0.3.0` package,
  refreshed Atom provenance, and synchronized the Button, Modal, Dialog,
  AlertDialog, and Drawer documentation with the reviewed package release.
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
- Removed explicit theme-color metadata and added a full-height direct body
  theme surface while investigating delayed mobile Safari browser-chrome
  repainting. These changes aligned the page structure more closely with Radix
  but did not resolve the reported delay.
- Applied Radix-style light and dark classes to the document root. The page
  theme changes immediately, but the reported Safari browser chrome still
  waits for a scroll-triggered repaint.
- Replaced the translucent backdrop-filtered sticky header with the opaque
  fixed header structure used by the live Radix documentation site. This
  satisfies WebKit's documented Safari 26 requirement for extending the color
  of a viewport-constrained edge element into browser chrome.
- Made the full-height theme surface a positioned stacking context, matching
  the corresponding Radix Themes root rule.
- Confirmed on the affected iPhone that Safari now repaints its browser chrome
  immediately when the website theme changes, without requiring a scroll.
- Increased article, desktop sidebar, and quick-navigation typography; enlarged
  desktop navigation targets; and made quick-navigation links calculate their
  landing position directly below the sticky app bar.
- Disabled Atom header tooltips on touch-first devices so long presses cannot
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
