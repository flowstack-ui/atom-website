# Website Testing

## Required Checks

```bash
npm run content:check
npm run typecheck
npm run lint
npm run build
```

`npm run verify` runs the full sequence.

## Representative Routes

Review at least:

- Introduction;
- Getting started;
- Styling;
- Button;
- Dialog or Data Grid;
- Hooks;
- Releases;
- the 404 page.

## Interaction Coverage

- Keyboard navigation reaches the skip link, header actions, sidebar links,
  article links, and mobile controls.
- Tablet and phone Drawers contain and restore focus and close on Escape.
- Search autofocuses its input, traps focus, locks page scrolling, closes on
  Escape or overlay click, and restores focus to its trigger.
- Search inside a Drawer closes before the Drawer and restores focus within it.
- Search supports `/`, Command/Ctrl+K, arrow keys, Enter, clear, loading,
  no-results, and route selection behavior.
- Theme selection persists and respects system preference initially.
- On the affected iPhone configuration, changing themes repaints mobile Safari
  browser chrome immediately without requiring a scroll.
- The header remains fixed, opaque, and synchronized with `--page-bg` in both
  themes; no backdrop-filter or transparent header layer is introduced.
- Heading anchors land below the sticky header.
- Light and dark themes remain readable at desktop and mobile widths.
- Tables and code blocks do not cause page-level horizontal overflow.

## Responsive Coverage

Review 1280, 1440, 1920, and 2560-pixel desktop widths; 768, 834, and
1023-pixel tablet widths; and 375 and 430-pixel phone widths. Confirm balanced
wide-screen rails, the wider tablet Drawer and 48-pixel tablet links, the
full-screen phone Drawer, GitHub visibility, and theme-before-menu ordering.

## Search Index Coverage

Validate exact and partial page titles, headings, body phrases, empty queries,
no results, and every indexed route. Title matches must rank ahead of heading
and body matches.
