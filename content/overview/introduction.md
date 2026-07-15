# Introduction

Atom UI is a headless React primitive library for building accessible design systems and application interfaces. It provides behavior, semantic DOM, ARIA relationships, keyboard interaction, focus management, controlled and uncontrolled state, compound context, and portals without deciding how your product should look.

## Why Atom exists

Common interface patterns such as dialogs, selects, menus, trees, tabs, and data grids require more than rendered elements. They need predictable keyboard behavior, correct relationships, careful focus movement, dismissal rules, and state that works in both controlled and uncontrolled applications.

Atom centralizes those contracts so product teams and styled component libraries can focus on visual design instead of reimplementing interaction behavior.

## Headless by design

Atom does not ship colors, spacing, typography, shadows, icons, Tailwind classes, themes, or application templates. Every visual choice remains in the consuming project.

Primitives expose native props and stable data attributes so your CSS can respond to behavior state:

```css
[data-slot="dialog-content"][data-state="open"] {
  opacity: 1;
}
```

## Composable APIs

Compound primitives are exposed through namespaces:

```tsx
import { Dialog } from "@flowstack-ui/atom";

<Dialog.Root>
  <Dialog.Trigger>Open settings</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Settings</Dialog.Title>
      <Dialog.Description>Update your preferences.</Dialog.Description>
      <Dialog.Close>Done</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>;
```

Atom supports React 18 and newer. Namespace exports are the recommended API, while documented subpath and direct-part exports remain available for focused imports and advanced composition.

## What Atom owns

- Native semantics and WAI-ARIA relationships where a pattern requires them.
- Keyboard interaction and focus management.
- Controlled and uncontrolled state.
- Dismissal, presence, portals, and positioning behavior.
- Data attributes representing behavior state.
- Small shared hooks and collection utilities.

## What applications own

- Visual styling and design tokens.
- Icons and illustrations.
- Routing and application data.
- Product-specific variants and layouts.
- Validation schemas and data-fetching systems.

Start with [Getting started](/docs/overview/getting-started/) or choose a component from the navigation.
