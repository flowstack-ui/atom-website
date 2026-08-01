# Popover

Positioned disclosure content with optional anchor, modal behavior, focus guards, arrow geometry, and close controls.

## When to Use

Use `Popover` for a small interactive panel that belongs to a trigger, such as
quick actions or compact settings. Use `Tooltip` for short, non-interactive
help, `HoverCard` for preview content, and `Dialog` when the user must focus on
a larger task. A popover should add helpful choices without becoming a whole
page inside a floating box.

## Features

- Controlled and uncontrolled open state.
- Click or hover trigger mode with opening-reason tracking; pointer hover never
  moves focus.
- Visible Title and Description parts with generated accessible relationships.
- Configurable interaction-aware initial and final focus, including a
  touch-safe Content default and outside-dismissal focus preservation.
- Optional anchor separate from the trigger.
- Floating UI positioning that tries alternate alignments on the requested
  side, repeats them on the opposite side, and uses perpendicular sides only as
  final fallbacks; collision shift and Arrow coordinates follow the result.
- Modal mode with focus trap, background isolation, and scroll lock.
- Non-modal focus guards and layer-aware completed-activation outside
  dismissal with a preventable consumer event.
- Stack-aware Escape dismissal for nested overlays.
- Close button part and portal support.

## Import

```tsx
import { Popover } from "@flowstack-ui/atom";
```

## Anatomy

```tsx
<Popover.Root>
  <Popover.Anchor />
  <Popover.Trigger />
  <Popover.Portal>
    <Popover.Content>
      <Popover.Title />
      <Popover.Description />
      <Popover.Close />
      <Popover.Arrow />
    </Popover.Content>
  </Popover.Portal>
</Popover.Root>
```

## API Reference

### Root

Owns open state, dismissal rules, trigger mode, and the references used to
position Content. Root renders no DOM element.

| Prop | Type | Default |
| --- | --- | --- |
| `open` | `boolean` | - |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean, reason?: PopoverCloseReason) => void` | - |
| `modal` | `boolean` | `false` |
| `triggerMode` | `"click" \| "hover"` | `"click"` |
| `openDelay` | `number` | `200` |
| `closeDelay` | `number` | `300` |
| `closeOnEscape` | `boolean` | `true` |
| `closeOnInteractOutside` | `boolean` | `true` |
| `disabled` | `boolean` | `false` |

**ARIA:** Root renders no element and adds no ARIA attributes.

**Data attributes:** Root renders no element and exposes no data attributes.

### Anchor

Optional positioning reference. Use it when content should be positioned relative to a different element than the trigger.

| Prop | Type | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

**ARIA:** Anchor adds no roles or ARIA attributes.

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-anchor"` |

### Trigger

Opens or toggles the popover and connects the button to Content. In hover mode,
it also starts the configured open and close delays.

| Prop | Type | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `role` | `"button"` for a custom rendered element |
| `aria-haspopup` | `"dialog"` |
| `aria-expanded` | Current open state |
| `aria-controls` | Content ID while open |
| `aria-disabled` | `true` when Root is disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-trigger"` |
| `[data-state]` | `"open" \| "closed"` |
| `[data-trigger-mode]` | `"click" \| "hover"` |
| `[data-disabled]` | Present when disabled |

### Portal

Moves Content to another DOM container so it can escape clipping and stacking
ancestors. It renders no wrapper.

| Prop | Type | Default |
| --- | --- | --- |
| `container` | `HTMLElement \| null` | `document.body` after mount |
| `disabled` | `boolean` | `false` |

**ARIA:** Portal adds no roles or ARIA attributes.

**Data attributes:** Portal renders no wrapper and exposes none.

### Content

Renders the positioned dialog, manages outside dismissal, and manages focus.
Modal Content traps focus, makes background subtrees inert through Atom's
stacked modal-layer system, and locks document scrolling; non-modal Content
does none of those things and closes when focus leaves its trigger/content
scope. Closing or unmounting modal Content restores author-provided background
state.
Non-Arrow children render inside `[data-slot="popover-viewport"]`; a direct
Arrow remains its sibling so styled layers can scroll the viewport without
clipping the pointer. Content exposes measured
`--atom-floating-available-width` and `--atom-floating-available-height`
properties.
Portalled Content preserves an explicit `dir`; otherwise it resolves direction
from the mounted Anchor/Trigger and then `Direction.Provider`.

| Prop | Type | Default |
| --- | --- | --- |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` |
| `align` | `"start" \| "center" \| "end"` | `"center"` |
| `sideOffset` | `number` | `8` |
| `initialFocus` | `PopoverFocusTarget<PopoverInitialFocusDetails>` | safe interaction-aware target |
| `finalFocus` | `PopoverFocusTarget<PopoverFinalFocusDetails>` | prior valid target, then Trigger |
| `onInteractOutside` | `(event: OutsideInteractionEvent) => void` | - |

`onInteractOutside` runs before dismissal. Calling its `preventDefault()`
method keeps Content open without cancelling the original destination click.
Only the topmost registered layer receives an outside activation; dragged,
cancelled, secondary-button, and multi-pointer sessions do not dismiss.

| ARIA attribute | Values |
| --- | --- |
| `role` | `"dialog"` |
| `aria-label` | Native explicit value |
| `aria-labelledby` | Native value or generated Title relationship |
| `aria-describedby` | Native value or generated Description relationship |
| `aria-modal` | `true` in modal mode |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-content"` |
| `[data-state]` | `"open" \| "closed"` |
| `[data-side]` | `"top" \| "right" \| "bottom" \| "left"` |
| `[data-positioned]` | Present after the first positioning frame |

Native `aria-label`, `aria-labelledby`, and `aria-describedby` pass through.
Explicitly passing
`aria-describedby={undefined}` suppresses the generated description
relationship. `initialFocus` and `finalFocus` accept an element ref, a callback
receiving interaction/reason details, or `false` to suppress that automatic
operation.

Atom identifies Content as the allowed modal scroll region, but remains
headless: consumers set its maximum size and scrolling styles. For long
content, constrain `[data-slot="popover-viewport"]`, apply `overflow: auto`,
and choose any desired `overscroll-behavior`. If another library portals an
interactive child, target a container rendered inside Content so it remains on
the modal's owned DOM path.

### Title

Renders the visible heading that names Content. It defaults to `h2`, accepts
`as="h1"` through `as="h6"`, forwards heading props/ref, and registers its
stable ID with Content.

| Prop | Type | Default |
| --- | --- | --- |
| `as` | `"h1" \| "h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h2"` |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-title"` |

### Description

Renders a visible paragraph that describes Content and registers its stable ID
for the generated `aria-describedby` relationship.

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-description"` |

### Close

Renders a button that requests Root to close after any consumer click handler
runs without preventing the event. Close records keyboard, mouse, pen, or touch
activation so final-focus callbacks receive accurate details.

| Prop | Type | Default |
| --- | --- | --- |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

**ARIA:** Close uses native button semantics. Give icon-only controls an
`aria-label`.

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-close"` |

### Arrow

Renders a decorative SVG pointer using the actual side chosen after collision
handling. `getPopoverArrowGeometry` exposes the same geometry for custom arrows.

| Prop | Type | Default |
| --- | --- | --- |
| `width` | `number` | `10` |
| `height` | `number` | `5` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

**ARIA:** Arrow is decorative and hidden from assistive technology.

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"popover-arrow"` |
| `[data-side]` | `"top" \| "right" \| "bottom" \| "left"` |

Advanced compound parts can read `usePopoverContext` or
`usePopoverContentContext`. Their matching context providers are also public
for low-level composition. `getPopoverArrowGeometry` returns the SVG geometry
used by Arrow for a given side, width, and height.

## Examples

### Basic Popover

```tsx
import { Popover } from "@flowstack-ui/atom";

export default function ActionsPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>Actions</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content>
          <Popover.Title>Project actions</Popover.Title>
          <Popover.Description>
            Choose one compact action for this project.
          </Popover.Description>
          <button type="button">Duplicate</button>
          <Popover.Close>Done</Popover.Close>
          <Popover.Arrow />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

### Custom Anchor

```tsx
import { Popover } from "@flowstack-ui/atom";

export default function AnchoredPopover() {
  return (
    <Popover.Root>
      <Popover.Anchor asChild>
        <span>Account</span>
      </Popover.Anchor>
      <Popover.Trigger>Open account actions</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content side="right" align="start">
          <Popover.Title>Account actions</Popover.Title>
          <button type="button">View profile</button>
          <Popover.Close>Close</Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
```

## Accessibility

Popover uses the [WAI-ARIA dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
for Content and an
`aria-haspopup="dialog"` trigger. Render one visible `Popover.Title` or provide
native `aria-label`/`aria-labelledby`. Description connects automatically when
rendered. Popover intentionally exposes no camel-case `ariaLabel` alias.

Intentional keyboard, mouse, and pen openings focus an explicit
`initialFocus`, native `autoFocus`, the first available descendant, or Content.
Touch defaults to Content so opening does not unexpectedly raise a virtual
keyboard. Pointer-hover opening never moves focus. Escape and Close restore a
valid explicit `finalFocus`, the prior element, or Trigger; outside pointer and
focus dismissal preserve the destination. Touch and pen outside interactions
dismiss only after resolving as taps; movement, scrolling, and pointer
cancellation keep the Popover open. In modal mode, focus remains
contained inside the popover scope, including registered portalled layers
opened by descendants.

| Key | Description |
| --- | --- |
| `Enter` | Toggles a non-native trigger. |
| `Space` | Toggles a non-native trigger. |
| `Escape` | Closes the topmost popover when `closeOnEscape` is enabled. |
| `Tab` | In modal mode, focus remains trapped inside content. In non-modal mode, focus guards close the popover when tabbing away. |

## Changelog

### 0.20.3

- Modal Content now inherits document-only overflow locking so sticky
  application chrome remains anchored at nonzero page scroll positions.

### 0.20.1

- Made modal Content participate in Atom's stacked background-isolation system
  and restore background inert state on close or unmount.
- Clarified consumer ownership of scroll dimensions, overscroll styling, and
  third-party portal containers.

### 0.20.0

- Added preventable `Content.onInteractOutside` and moved outside dismissal to
  the shared layer-aware completed-activation contract.

### 0.6.10

- Distinguished outside touch and pen taps from scroll gestures so scrolling
  no longer dismisses an open Popover; mouse outside dismissal remains
  immediate.

### 0.6.9

- Preserved resolved trigger/anchor or provider direction on portalled Content,
  while retaining explicit Content `dir` precedence.

### 0.6.8

- Added an internal `[data-slot="popover-viewport"]` around non-Arrow Content
  children so constrained content can scroll without clipping the Arrow.
- Exposed measured available dimensions through headless floating properties.

### 0.6.7

- Modal Popover now inherits root/body overflow locking without fixed-body
  repositioning or unlock-time scroll restoration, avoiding iOS Safari
  browser-toolbar flicker while retaining focus and scroll containment.

### 0.6.3

- Prioritized every usable alignment on the requested side, followed by the
  opposite side, before allowing perpendicular-axis collision fallbacks.

### 0.6.2

- Added perpendicular-side collision fallbacks after the preferred and opposite
  sides so constrained popovers can resolve onto the axis with available room.

### 0.4.0

- Added visible `Title` and `Description` parts with generated,
  hydration-stable `aria-labelledby` and `aria-describedby` relationships.
- Standardized naming on native `aria-label`, `aria-labelledby`, and
  `aria-describedby`; removed the custom `ariaLabel` alias.
- Added interaction-aware `initialFocus` and `finalFocus` targets, touch-safe
  Content focus, hover-without-focus-steal, dismissal reasons, and
  outside-destination preservation.

### 0.3.4

- Fixed modal Popover scroll locking to avoid duplicate body-padding
  compensation when the document already preserves its scrollbar gutter.

### 0.3.1

- Fixed exit-presence cleanup so closed Popover Content unmounts after its CSS
  motion window even when no end event is emitted.

### 0.2.0

- Fixed Popover positioning when `Anchor` uses its default `display: contents`
  wrapper by resolving the usable child element as the Floating UI reference
  and refreshing the reference after refs commit.
- Fixed non-modal and modal Popover dismissal so clicks and focus movement
  inside nested portalled Popover layers do not close the parent Popover.
- Added shared dismissable layer Escape handling so nested overlays close
  before parent Popover layers.
- Added scoped modal focus containment for modal Popover and registered
  Popover content with parent modal focus scopes when nested inside another
  modal primitive.
- Removed redundant `role="button"` and `tabIndex={0}` from the default native button trigger path.

### 0.1.0

- Initial Atom release.
