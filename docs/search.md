# Documentation Search

## Interaction Contract

The navigation displays a search-shaped Atom Dialog trigger before Overview.
The trigger uses the same outer width and corner shape as the navigation links;
it stays visually compact while retaining a 44-pixel touch target in the
tablet and phone Drawers.
Opening it presents a page overlay and a centered search panel. The input is
focused immediately, page scrolling is locked, focus remains inside, Escape or
an overlay click dismisses it, and focus returns to the trigger.

Search opened from the tablet navigation Drawer remains nested above the
Drawer. The first Escape closes search; a later Escape can close navigation.
Touch and pen release explicitly opens the controlled Dialog, while ordinary
click and keyboard activation continue through Atom Dialog.Trigger.

On phones, the first navigation control is always an inline Atom Combobox input
inside the existing Drawer. Focusing an empty input leaves the navigation links
in place. Once the query contains text, results replace the links directly
below the same input without a second panel or modal treatment. Clearing the
query restores the links, and dismissing the software keyboard leaves the
results available for touch scrolling and selection. Selecting a result
navigates and closes the Drawer.

Atom Dialog is the correct primitive because this is a centered modal task.
Modal is a lower-level primitive foundation, Drawer implies edge placement, and
Popover would leave the background interactive.

The phone presentation is intentionally not a Dialog: the Drawer already owns
modality, scroll locking, and focus containment. The inline Combobox remains in
that focus scope instead of competing with it.

## Search UI

Atom Combobox owns the input, listbox relationships, highlighted result,
arrow-key navigation, Enter selection, loading state, empty state, and clear
behavior. Results display section, page, matched heading, and a plain-text
excerpt. Render result text as React text rather than HTML.

The `/` and Command/Ctrl+K shortcuts open search when focus is not already in an
editable control.

## Static Index

`npm run search:index` reads `content/navigation.json` and the committed
Markdown documents. It writes `public/search-index.json` with route, section,
page title, heading, excerpt, and searchable text. Fenced code is excluded from
body ranking. The normal build regenerates the index.

Search runs locally with MiniSearch. Ranking order is exact page title, title
prefix, heading, then body content. Production does not require a server,
database, sibling package checkout, or hosted search provider.

## Maintenance

Content validation must confirm that every search record targets a manifest
route and that every public document has at least one record. Run
`npm run verify` after content, ranking, or search-interface changes.
