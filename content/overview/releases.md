# Releases

Atom follows semantic versioning for the published `@flowstack-ui/atom` package. Package releases and website deployments are independent: the website records the Atom version against which its content was reviewed.

## Current release

### 0.3.1

Atom 0.3.1 is the current published release used by this website. The patch
keeps the 0.3.0 Modal foundation and fixes overlay cleanup so page controls
remain interactive after closing search and other Dialog surfaces.

The 0.3.0 release added the shared Modal foundation used by Dialog,
AlertDialog, and Drawer, including stack-aware focus ownership, background
inert isolation, exact scroll restoration, native ARIA precedence, touch-safe
initial focus, and `Modal.Branch` for consumer-owned portalled content.

The website also includes the 0.2.1 Button documentation update for composed
links. Native anchors and inactive-safe link adapters keep link semantics, while
disabled or loading links remove live destinations and block activation.

The release includes 67 export targets covering the main package entry,
components, hooks, collection helpers, direction, portals, and virtualizer
utilities.

## Release policy

- Namespace exports are the primary API for new usage.
- Documented component and utility subpaths are stable public entry points.
- User-visible API and behavior changes are recorded in package and affected component changelogs.
- Package publication runs build, tests, archive inspection, and consumer verification.
- Website documentation is reviewed against an exact published package version.

## Complete history

Read the complete [Atom package changelog](https://github.com/flowstack-ui/atom/blob/main/CHANGELOG.md) for detailed release notes and migration information.
