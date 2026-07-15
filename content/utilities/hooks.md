# Hooks

Atom exports small hooks for controlled state, disclosure, presence, dismissal, focus, scrolling, and shared interaction behavior.

## When to use

Use Atom hooks when building a styled or higher-level component that needs the same low-level behavior as Atom primitives. Prefer a complete primitive when it already matches the intended interaction pattern.

## Import

```tsx
import {
  useControllableState,
  useDisclosure,
  useEscapeKey,
  usePresence,
  useScrollSpy,
} from "@flowstack-ui/atom/hooks";
```

## State hooks

### `useControllableState`

Coordinates controlled and uncontrolled values while keeping change callbacks consistent.

### `useDisclosure`

Provides open, close, and toggle behavior for a disclosure-like state. The component using it still owns semantics, focus, and keyboard behavior.

### `usePresence`

Tracks mounted presence for components that need to coordinate visible state and consumer-owned exit behavior.

## Interaction hooks

### `useEscapeKey`

Registers Escape handling through Atom's stack-aware interaction layer. Use it when a custom layer must dismiss in the correct nested order.

### `useClickAway`

Observes pointer interaction outside supplied elements. The consuming component must decide what outside interaction means for its accessibility pattern.

### `useDismissableLayer`

Coordinates nested dismissable layers and escape behavior. Prefer an existing overlay primitive when possible.

## Focus and scrolling

Atom exposes focus helpers, scroll locking, and `useScrollSpy` for interfaces that need consistent low-level behavior. These utilities do not supply complete widget semantics by themselves.

## Accessibility

Hooks render no DOM and add no roles, labels, or keyboard contract unless their documented callbacks are used by a component. The component built with them must implement the correct native or WAI-ARIA pattern and verify it through tests.
