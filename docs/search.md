# Documentation Search

## Interaction Contract

The app bar exposes a compact Brick Button trigger and Command/Ctrl+K shortcut.
Opening search lazy-loads the client module and static index, then presents a
Brick Dialog whose search Input receives focus immediately. Dialog owns modal
focus, dismissal, focus restoration, and scroll locking.

Results use semantic buttons because selecting one performs client navigation
and closes the modal. Empty, loading, failure, no-result, and result states keep
the top edge and search field stable. Phone search becomes a full-viewport
Dialog with safe-area padding and a 16-pixel input to prevent Safari focus zoom.

## Static Index

`npm run search:index` reads `content/navigation.json` and committed Markdown,
then writes `public/search-index.json`. The browser fetches it only after search
is invoked. MiniSearch ranks page titles, headings, excerpts, and body content
without a hosted service, server database, or sibling repository.

Content validation confirms every indexed route exists and every public
document has an index record.
