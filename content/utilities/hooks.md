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
  useVirtualizer,
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

## Focus and scrolling

### Focus scope helpers

`FocusScopeProvider`, `useCreateFocusScope`, `useFocusScopeContainer`,
`useFocusOnMount`, `useFocusRestore`, and `useFocusTrap` expose the same focus
coordination used by Atom overlays. Prefer a complete overlay primitive unless
you are building another low-level primitive.

### `useScrollLock`

Locks document scrolling for a mounted surface and restores the previous scroll
state during cleanup.

### `useScrollSpy`

Tracks the active item within a set of observed page regions.

### Virtualization

`useVirtualizer` and the `getVirtualItems`, `getVirtualOffsetForIndex`,
`getVirtualScrollOffsetForIndex`, and `getVirtualTotalSize` helpers are also
available from this subpath. See the Virtualizer utility for the complete API.

## Accessibility

Hooks render no DOM and add no roles, labels, or keyboard contract unless their documented callbacks are used by a component. The component built with them must implement the correct native or WAI-ARIA pattern and verify it through tests.
