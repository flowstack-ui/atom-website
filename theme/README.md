# Atom Website Theme Fixture

`atom-website.theme.json` is the application-owned source for the Atom
documentation website's system-default dual appearance. Generated browser and
machine artifacts live under `src/app/theme/generated/` and are never edited
directly.

Compilation reads Brick's public contract directly from
`node_modules/@flowstack-ui/brick/dist/theme-contract.json`. The contract and
compiler are exact registry dependencies, so a clean clone regenerates the
same application-owned artifacts without a copied contract or Git dependency.

Regenerate and verify with:

```bash
npm run theme:compile
npm run theme:check
```

The Theme compiler is a development dependency. Production imports only
generated CSS. Appearance persistence, pre-paint selection, layout, gradients,
specimen styling, and responsive component geometry remain application-owned.
