# Menu

Headless menu primitives for command menus, selection menus, groups, separators, and nested submenus.

## When to Use

Use Menu for a temporary list of commands or settings, such as Duplicate,
Archive, or Show grid. Use Select or Listbox when the main job is choosing a
form value, NavigationMenu for links that move around a website, and Menubar
when several top-level application menus must sit in one horizontal row.

Nested SubContent is an explicit cascading-menu model. It remains operable by
tap/click and keyboard, but Atom does not switch it to drill-in navigation from
viewport size or pointer media queries. For a mobile-first drill-in flow,
compose a separate panel, Dialog, Drawer, or grouped list with explicit depth
and back controls at the application layer.

## Features

- Full keyboard navigation for menu items and submenus.
- Real DOM focus on the active item, including disabled items that remain non-activatable.
- Supports controlled and uncontrolled open state.
- Supports checkbox and radio menu items.
- Supports grouped items, separators, and nested submenus.
- Supports configurable `closeOnSelect`, looping, escape close, side, align, and offsets.
- Stack-aware Escape dismissal when nested inside parent overlays.
- Layer-aware completed-activation outside dismissal with a preventable
  consumer event.
- Exposes state data attributes for styling without shipping styles.

## Import

```tsx
import { Menu } from "@flowstack-ui/atom";
```

## Anatomy

```tsx
<Menu.Root>
  <Menu.Portal>
  <Menu.Content>
    <Menu.Arrow />
    <Menu.Group>
      <Menu.Label />
      <Menu.Item />
      <Menu.CheckboxItem><Menu.ItemIndicator /></Menu.CheckboxItem>
      <Menu.RadioGroup>
        <Menu.RadioItem />
      </Menu.RadioGroup>
    </Menu.Group>
    <Menu.Separator />
    <Menu.Sub>
      <Menu.SubTrigger />
      <Menu.SubContent>
        <Menu.Item />
      </Menu.SubContent>
    </Menu.Sub>
  </Menu.Content>
  </Menu.Portal>
</Menu.Root>
```

## API Reference

### Root

Provides open state, selection defaults, item registration, and modal behavior.
It does not render a DOM element; trigger primitives such as DropdownMenu and
ContextMenu control it, while standalone examples can open it directly.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `open` | `boolean` | - |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean) => void` | - |
| `modal` | `boolean` | `true` |
| `closeOnSelect` | `boolean` | `true` |
| `loop` | `boolean` | `true` |
| `closeOnEscape` | `boolean` | `true` |

### Content

Portals and positions the focus-managed `menu` surface. Focus moves to real
`menuitem*` elements. Modal mode uses Atom's stacked isolation and scroll lock;
non-modal outside interaction keeps its destination.

Content resolves text direction from its explicit native `dir`, its trigger's
computed direction, or `Direction.Provider`, then applies that direction to
the portalled surface. SubContent repeats the same resolution from its
SubTrigger so logical layout and submenu keys remain aligned across portals.
SubContent prefers the logical inline side, tries the opposite inline side,
then uses block-axis placements when neither side fits. Its final shift keeps
the surface inside the visual viewport.

Content is an allowed scroll region while its modal lock is active. Atom does
not impose dimensions or scrolling styles: consumers constrain Content, apply
`overflow: auto`, and choose any desired `overscroll-behavior`. Portalled
submenus are owned by the same focus and modal systems. For a third-party
portalled child, target a container rendered inside Content so it remains on
the modal's owned DOM path.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `side` | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` |
| `align` | `"start" \| "center" \| "end"` | `"start"` |
| `sideOffset` | `number` | `4` |
| `loop` | `boolean` | root value |
| `ariaLabel` | `string` | - |
| `anchorPoint` | `{ x: number; y: number }` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |
| `onInteractOutside` | `(event: OutsideInteractionEvent) => void` | - |

Outside dismissal is committed on click/activation rather than pointer start.
Only the topmost Menu or SubContent layer receives `onInteractOutside`. With a
submenu open, an activation inside an ancestor menu closes only that submenu;
an activation outside every menu surface closes the complete menu tree. Calling
`event.preventDefault()` keeps the affected layer or tree open without
cancelling the original destination click. Dragged, cancelled,
secondary-button, and multi-pointer sessions do not dismiss.

| ARIA attribute | Values |
| --- | --- |
| `aria-orientation` | `"vertical"` |
| `aria-label` | Value from `ariaLabel` |
| `aria-labelledby` | Trigger ID when a trigger exists and `ariaLabel` is absent |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-content"` |
| `[data-state]` | `"open" \| "closed"` |
| `[data-side]` | Resolved Floating UI side |
| `[data-align]` | Resolved Floating UI alignment |
| `[data-positioned]` | Present after positioning completes |

| CSS variable | Description |
| --- | --- |
| `--atom-menu-available-width` | Collision-aware available width |
| `--atom-menu-available-height` | Collision-aware available height |
| `--atom-menu-trigger-width` | Anchor width; `0px` for a point anchor |
| `--atom-menu-trigger-height` | Anchor height; `0px` for a point anchor |
| `--atom-menu-transform-origin` | Resolved animation origin |

### Portal and Arrow

`Portal` accepts `container` and `disabled`. `Arrow` renders geometry attached
to the resolved Content side and accepts `width`, `height`, `asChild`, and
`render`. Both are optional.

| Portal prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `container` | `HTMLElement \| null` | document body |
| `disabled` | `boolean` | `false` |

| Arrow prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | - |
| `width` | `number` | `10` |
| `height` | `number` | `5` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

Arrow exposes `[data-slot="menu-arrow"]`, `[data-side]`, and `[data-align]`.

### Item

Renders an actionable menu item.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `value` | `string` | required |
| `textValue` | `string` | Text child or `value` |
| `onSelect` | `() => void` | - |
| `disabled` | `boolean` | `false` |
| `closeOnSelect` | `boolean` | root value |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-disabled` | Present when disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-item"` |
| `[data-highlighted]` | Present when highlighted |
| `[data-disabled]` | Present when disabled |
| `[data-value]` | Item value |

### CheckboxItem

Renders a `menuitemcheckbox`.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `checked` | `boolean \| "indeterminate"` | `false` |
| `onCheckedChange` | `(checked: boolean) => void` | - |
| `value` | `string` | required |
| `textValue` | `string` | Text child or `value` |
| `disabled` | `boolean` | `false` |
| `closeOnSelect` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-checked` | `true`, `false`, or `"mixed"` |
| `aria-disabled` | Present when disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-checkbox-item"` |
| `[data-highlighted]` | Present when highlighted |
| `[data-disabled]` | Present when disabled |
| `[data-checked]` | Present when checked |
| `[data-indeterminate]` | Present when indeterminate |
| `[data-state]` | `"checked" \| "unchecked" \| "indeterminate"` |
| `[data-value]` | Item value |

### RadioGroup

Provides radio selection state for `RadioItem`.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `value` | `string` | - |
| `onValueChange` | `(value: string) => void` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-radio-group"` |

Radio item values are scoped to their parent radio group for menu highlighting
and keyboard movement, so separate groups can reuse values such as `"default"`
inside the same menu.

### RadioItem

Renders a `menuitemradio`.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `value` | `string` | required |
| `textValue` | `string` | Text child or `value` |
| `disabled` | `boolean` | `false` |
| `closeOnSelect` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-checked` | Whether this value is selected by `RadioGroup` |
| `aria-disabled` | Present when disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-radio-item"` |
| `[data-highlighted]` | Present when highlighted |
| `[data-disabled]` | Present when disabled |
| `[data-checked]` | Present when selected |
| `[data-state]` | `"checked" \| "unchecked"` |
| `[data-value]` | Public radio value |

### Group

Groups related menu items with `role="group"`.

A nested `Label` automatically supplies `aria-labelledby`. Explicit
`aria-label` or `aria-labelledby` remains authoritative. A Group without a
Label does not receive a generated relationship.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-group"` |

### Label

`Label` renders non-focusable group text. Inside Group or RadioGroup, its
generated ID supplies the owning group's `aria-labelledby` unless the consumer
provides an explicit accessible name.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

Label exposes `[data-slot="menu-label"]`.

### ItemIndicator

`ItemIndicator` belongs inside CheckboxItem or RadioItem and renders only for
checked/mixed state unless `forceMount` is true.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | - |
| `forceMount` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

It is hidden from assistive technology and exposes
`[data-slot="menu-item-indicator"]` plus `[data-state]` as `checked`,
`unchecked`, or `indeterminate`.

### Separator

Renders a horizontal separator between groups of related commands.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-orientation` | `"horizontal"` |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-separator"` |

### Sub

Provides controlled or uncontrolled open state for one nested submenu. It does
not render a DOM element.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `open` | `boolean` | - |
| `defaultOpen` | `boolean` | `false` |
| `onOpenChange` | `(open: boolean) => void` | - |

### SubTrigger

Renders the parent `menuitem` that opens, closes, and labels its `SubContent`.
Mouse hover opening starts only after the pointer actually moves over the item,
so newly positioned content beneath a stationary pointer does not open it.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `value` | `string` | required |
| `textValue` | `string` | Text child or `value` |
| `disabled` | `boolean` | `false` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-haspopup` | `"menu"` |
| `aria-expanded` | Submenu open state |
| `aria-disabled` | Present when disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-sub-trigger"` |
| `[data-state]` | `"open" \| "closed"` |
| `[data-highlighted]` | Present when highlighted |
| `[data-disabled]` | Present when disabled |
| `[data-value]` | Trigger value |

### SubContent

Portals and positions the nested `menu` beside `SubTrigger`, with its own item
registry, highlight state, typeahead, and nested submenu support.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | required |
| `sideOffset` | `number` | `4` |
| `loop` | `boolean` | `true` |
| `ariaLabel` | `string` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |
| `onInteractOutside` | `(event: OutsideInteractionEvent) => void` | - |

| ARIA attribute | Values |
| --- | --- |
| `aria-orientation` | `"vertical"` |
| `aria-label` | Value from `ariaLabel` |
| `aria-labelledby` | `SubTrigger` ID when `ariaLabel` is absent |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"menu-sub-content"` |
| `[data-menu-sub-content]` | Present on nested menu surfaces |
| `[data-state]` | `"open" \| "closed"` |
| `[data-side]` | Resolved side, mirrored in RTL |
| `[data-align]` | Resolved alignment |
| `[data-positioned]` | Present after positioning completes |

Advanced compound components can use `useMenuContext`,
`useMenuRadioGroupContext`, and `useMenuSubContext`. Their matching providers
and context value types are also public exports.

## Examples

### Selection Menu

```tsx
import { useState } from "react";
import { Menu } from "@flowstack-ui/atom";

export function ViewMenu() {
  const [grid, setGrid] = useState(true);
  const [density, setDensity] = useState("comfortable");

  return (
    <Menu.Root defaultOpen>
      <Menu.Content ariaLabel="View settings">
        <Menu.CheckboxItem
          value="grid"
          checked={grid}
          onCheckedChange={setGrid}
        >
          Show grid
        </Menu.CheckboxItem>
        <Menu.RadioGroup value={density} onValueChange={setDensity}>
          <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>
          <Menu.RadioItem value="compact">Compact</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}
```

### Nested Action Menu

```tsx
import { Menu } from "@flowstack-ui/atom";

export function ActionsMenu() {
  return (
    <Menu.Root defaultOpen>
      <Menu.Content ariaLabel="Actions">
        <Menu.Item value="duplicate" onSelect={() => console.log("Duplicate")}>
          Duplicate
        </Menu.Item>
        <Menu.Sub>
          <Menu.SubTrigger value="move">Move to</Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Item value="archive">Archive</Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>
  );
}
```

## Accessibility

Follows the [WAI-ARIA menu pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/).
`Content` renders `role="menu"`, items render the correct menu item roles,
disabled items expose disabled semantics, and keyboard focus moves on the real
item elements. Disabled items remain in navigation and typeahead but cannot
activate.
Portalled Menu content and submenu content register with a parent modal focus
scope when opened inside Dialog, Drawer, or another modal primitive.
Printable-character typeahead matches item text; a single-character
search cycles forward from the current matching item, while multi-character
buffers match exact prefixes.

| Key | Description |
| --- | --- |
| `ArrowDown` / `ArrowUp` | Moves focus between items, including disabled items |
| `Home` / `End` | Moves focus to first or last item |
| `Enter` / `Space` | Selects the focused item unless disabled |
| `Escape` | Closes the topmost submenu first, then the root menu when enabled |
| `ArrowRight` / `ArrowLeft` | Opens or closes submenus based on direction |
| Printable character | Typeahead search |
| `Tab` / `Shift+Tab` | Closes all levels and moves after/before the owning composite |

## Changelog

### 0.20.7

- Made one completed activation outside every open menu surface dismiss the
  complete root/submenu tree, while an activation inside an ancestor menu still
  closes only its submenu and only the topmost layer receives
  `onInteractOutside`.
- Corrected virtual point references so ContextMenu-backed Content positions
  and repositions from its invocation coordinate.

### 0.20.6

- SubTrigger now requires actual mouse movement before its hover delay starts,
  preventing newly positioned menu content from opening a submenu beneath a
  stationary pointer.

### 0.20.5

- Content and SubContent now carry their resolved explicit, trigger, or
  provider direction across portals and provide that value to nested menu
  behavior.
- SubContent now tries block-axis placements after both inline sides and uses
  a final cross-axis shift to remain inside narrow visual viewports.

### 0.20.3

- Modal Content now inherits document-only overflow locking so sticky
  application chrome remains anchored at nonzero page scroll positions.

### 0.20.1

- Kept the public available-size and trigger-size CSS variables on Content and
  SubContent stable across positioning rerenders, including viewport resize.

### 0.20.0

- Added preventable `Content` and `SubContent.onInteractOutside`, committed
  dismissal on completed activation, and routed outside interaction only to the
  topmost Menu layer.

### 0.12.0

- Moved keyboard navigation to real item focus, kept disabled items navigable
  but non-activatable, and made Tab/Shift+Tab exit the owning composite.
- Added reason-aware focus restoration, modal isolation, deferred touch/pen
  outside dismissal, and deterministic submenu focus return.
- Added Portal, Arrow, Label, and ItemIndicator anatomy; mixed checkbox state;
  complete retained-part composition; and menu geometry CSS variables.
- Restricted submenu hover intent to mouse input.

### 0.6.7

- Modal Menu now inherits root/body overflow locking without fixed-body
  repositioning or unlock-time scroll restoration on iOS Safari.

### 0.3.4

- Fixed modal Menu scroll locking to avoid duplicate body-padding compensation
  when the document already preserves its scrollbar gutter.

### 0.3.1

- Fixed exit-presence cleanup so closed Menu and submenu Content cannot remain
  over the page when CSS emits no transition or animation end event.

### 0.2.0

- Fixed Menu part `data-slot` pass-through so Content, Group, Separator,
  CheckboxItem, RadioGroup, RadioItem, SubTrigger, and SubContent can be
  overridden consistently.
- Fixed submenu keyboard behavior under `Direction.Provider dir="rtl"` so
  ArrowLeft opens submenus, ArrowRight closes submenus, and submenu placement
  mirrors to the left side.
- Standardized Menu typeahead so a single-character search cycles from the
  current matching item while multi-character buffers still match exact
  prefixes.
- Added support for no initial Menu highlight so composed patterns such as
  Menubar can open from pointer input without pre-highlighting the first item.
- Fixed pointer reopen behavior so closing presence frames cannot reapply the
  default first-item highlight for the next pointer open.
- Fixed autofocus for portalled Menu content that mounts after the Menu opens,
  including controlled menus rendered inside Dialog.
- Fixed Menu autofocus inside modal focus scopes so portalled content registers
  with the parent Dialog/Modal scope before focus moves into the menu.
- Fixed standalone content labelling so `aria-labelledby` is only emitted when a
  trigger is mounted; standalone/context menus should use `ariaLabel`.
- Fixed nested submenu item selection so child submenu clicks are not treated
  as outside clicks and selection closes the root menu.
- Fixed submenu Escape handling inside parent overlays so Escape closes the
  topmost submenu before the root menu or parent Dialog/Modal layer.
- Fixed submenu positioning so `SubContent` uses the mounted `SubTrigger` as
  its Floating UI reference when opened.
- Fixed Menu initial keyboard highlight so it waits for mounted items before
  marking the first highlight as applied.
- Fixed `Menu.Item` so its documented `asChild` and `render` composition props
  are implemented while preserving menuitem behavior, refs, and data attributes.
- Added shared dismissable layer Escape handling so Menu closes before parent
  overlays when nested inside Dialog, Drawer, Modal, or Popover.
- Fixed outside pointer dismissal so Menu and Menubar-backed menus close
  reliably when clicking outside portalled content during inspection-heavy
  renders.
- Registered portalled Menu content and submenu content with parent modal focus
  scopes so menus can remain valid focus targets inside Dialog, Drawer, and
  other modal primitives.
- Scoped `RadioItem` highlight identities to their parent `RadioGroup` so
  separate radio groups can reuse the same public item values in one menu.
- Fixed initial highlight behavior so pointer movement over non-item content or
  item gaps does not reset highlight back to the first item while a menu is
  already open.

### 0.1.0

- Initial Atom release.
