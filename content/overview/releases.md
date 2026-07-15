# Releases

Atom follows semantic versioning for the published `@flowstack-ui/atom` package. Package releases and website deployments are independent: the website records the Atom version against which its content was reviewed.

## Current release

### 0.2.0

Atom 0.2.0 is the current published release used by this website. The release completed the public primitive extraction, stabilized namespace and documented subpath exports, expanded component API documentation, and qualified the package with React 18 and React 19 consumers.

The release includes 67 export targets covering the main package entry, components, hooks, collection helpers, direction, portals, and virtualizer utilities.

## Release policy

- Namespace exports are the primary API for new usage.
- Documented component and utility subpaths are stable public entry points.
- User-visible API and behavior changes are recorded in package and affected component changelogs.
- Package publication runs build, tests, archive inspection, and consumer verification.
- Website documentation is reviewed against an exact published package version.

## Complete history

Read the complete [Atom package changelog](https://github.com/flowstack-ui/atom/blob/main/CHANGELOG.md) for detailed release notes and migration information.
