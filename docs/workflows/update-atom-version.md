# Update The Atom Version

1. Review the target Atom package release and changelogs.
2. Install the exact approved package version.
3. Check out the reviewed Atom source commit in `../package/`.
4. Run `npm run content:sync` to refresh component and utility docs and their
   changelogs, public guides, architecture audits, package releases, and source
   provenance.
5. Review every changed page rather than accepting mechanical copies blindly.
6. Review the website-owned Introduction, Accessibility, Guides, and Hooks
   pages against the current package API.
7. Run `npm audit --audit-level=high` and `npm run verify`.
8. Update `CURRENT.md`, the website version, and `CHANGELOG.md`.
9. Merge a green pull request, tag the website release, and verify the Vercel
   deployment on representative routes.

Never make the production build depend on the sibling package checkout.
