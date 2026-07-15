# Add A Documentation Page

1. Choose the owning section in `content/navigation.json`.
2. Add the route title and slug once.
3. Create `content/<section>/<slug>.md` with one H1 and an introductory
   paragraph.
4. Use deterministic H2 and H3 headings for the page navigation.
5. Use Atom package imports and original Atom-specific copy.
6. Run `npm run content:check` and `npm run build`.
7. Update CURRENT, TODO, or CHANGELOG only when their state changes.

Component or Utility entries must correspond to a public installed Atom
subpath.
