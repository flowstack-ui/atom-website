# Composition

Atom primitives support `asChild` and `render` where changing or supplying the rendered element is part of the public API.

## Compose with `asChild`

`asChild` merges a primitive's behavior and accessibility props onto its single child instead of rendering the default element.

```tsx
import { Tooltip } from "@flowstack-ui/atom";

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <a href="/settings">Settings</a>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content>Open account settings</Tooltip.Content>
  </Tooltip.Portal>
</Tooltip.Root>;
```

## Compose with `render`

The `render` API can supply an element or render function when a styled layer needs direct control over the rendered output. Consult the component API because not every part needs composition.

## Preserve the contract

Composition changes rendering, not the meaning of the primitive. A composed trigger must remain focusable and activatable. A link must still navigate. A heading must preserve an appropriate level.

Custom leaf components should:

- forward received props to the underlying element;
- accept and forward refs;
- preserve consumer and Atom event handlers;
- render an element appropriate for the primitive's role;
- keep an accessible name.

## Compose behaviors deliberately

Multiple primitives can share one leaf control when their contracts are compatible. Review focus, keyboard, and ARIA output when nesting triggers. Avoid combining competing interaction patterns on the same element.

Prefer Atom's native defaults unless changing the element solves a real integration need. Native elements usually provide the most reliable behavior with the least code.
