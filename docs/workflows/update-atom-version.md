# Update The Atom Version

1. Review the target Atom package release and changelogs.
2. Install the exact approved package version.
3. Update `content/atom-source.json` with the version, source commit, and review
   date.
4. Synchronize relevant component docs from a trusted package checkout or
   update committed content manually.
5. Review every changed page rather than accepting mechanical copies blindly.
6. Run `npm run verify`.
7. Record the package alignment change in the website changelog.

Never make the production build depend on the sibling package checkout.
