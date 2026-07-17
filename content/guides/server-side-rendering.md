# Server-side rendering

Atom separates pure render primitives from components that require client behavior. This allows server-rendered applications to keep server-safe entry points free of unnecessary client boundaries while using interactive primitives where needed.

## Pure render components

Structural primitives that only render semantic elements and data attributes can be rendered by a React server environment. Examples include simple layout or semantic utilities whose public entry point does not require browser state.

Do not add a client boundary around an entire application merely because some descendants are interactive. Isolate interactive primitives in focused client components.

## Interactive components

Components that manage focus, keyboard events, portals, measurements, controlled state hooks, or browser observers require a client environment. In a framework with explicit client components, import and render them below an intentional client boundary.

```tsx
"use client";

import { Dialog } from "@flowstack-ui/atom/dialog";

export function AccountDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Account</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content aria-label="Account settings" />
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

## Portals and hydration

Portal content is created after a browser container is available. Keep required titles, descriptions, and fallback page structure valid in the initial render. Avoid reading `window`, `document`, or local storage during server rendering.

Modal-family Content parts, including Dialog, AlertDialog, and Drawer, prefer
native ARIA relationships during hydration. Use `aria-label`,
`aria-labelledby`, or `aria-describedby` when a relationship must exist in the
server markup. Registered Title and Description parts still supply generated
relationships after client registration settles, and `ariaLabel` remains a
compatibility fallback.

## Stable initial state

Controlled and uncontrolled values used during hydration should agree with the server output. Defer browser-only preferences, such as a stored visual theme, until the browser is available or apply them through a small pre-paint script that does not change the semantic document structure.

Review the public entry point and component documentation rather than assuming every Atom primitive has the same server boundary.
