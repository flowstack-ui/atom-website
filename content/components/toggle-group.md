# ToggleGroup

Headless group of toggle buttons with roving focus and single or multiple selection.

## When to Use

Use `ToggleGroup` when several related pressed buttons should act as one
keyboard group, such as text alignment or formatting choices. Use `RadioGroup`
when single-selection choices are form answers, and individual `Toggle` parts
when the buttons are unrelated.

## Features

- Supports single and multiple selection.
- Can be controlled or uncontrolled.
- Supports horizontal and vertical arrow-key navigation.
- Mirrors horizontal Arrow keys in RTL through `Direction.Provider`.
- Supports optional looping focus.
- Registers items in DOM order.
- Exposes selected, disabled, orientation, and value data attributes.

## Import

```tsx
import { ToggleGroup } from "@flowstack-ui/atom";
```

## Anatomy

```tsx
<ToggleGroup.Root>
  <ToggleGroup.Item value="bold" />
  <ToggleGroup.Item value="italic" />
</ToggleGroup.Root>
```

## API Reference

### Root

Owns single or multiple selection and roving focus for every Item in the group.

| Prop | Type | Default |
| --- | --- | --- |
| `type` | `"single" \| "multiple"` | `"single"` |
| `value` | `string \| string[]` | - |
| `defaultValue` | `string \| string[]` | `[]` |
| `onValueChange` | `(value: string \| string[]) => void` | - |
| `disabled` | `boolean` | `false` |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |
| `loop` | `boolean` | `true` |
| `ariaLabel` | `string` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `role` | `"group"` |
| `aria-label` | Value from `ariaLabel` when provided |
| `aria-disabled` | `true` when disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"toggle-group"` |
| `[data-orientation]` | `"horizontal" \| "vertical"` |
| `[data-disabled]` | Present when disabled |

### Item

Renders one roving-focus pressed button and reads group selection and disabled
state while allowing a local disabled override.

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `string` | required |
| `disabled` | `boolean` | `false` |
| `ariaLabel` | `string` | - |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `role` | `"button"` for a custom non-native element |
| `aria-pressed` | Current selected state |
| `aria-label` | Value from `ariaLabel` when provided |
| `aria-disabled` | `true` when the Item or Root is disabled |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"toggle-group-item"` |
| `[data-state]` | `"on" \| "off"` |
| `[data-value]` | Item value |
| `[data-disabled]` | Present when disabled |

Advanced compound parts can read `useToggleGroupContext` or use the public
`ToggleGroupContextProvider`.

## Examples

### Single Selection

```tsx
import { ToggleGroup } from "@flowstack-ui/atom";

export default function AlignmentGroup() {
  return (
<ToggleGroup.Root type="single" defaultValue="center" ariaLabel="Text align">
  <ToggleGroup.Item value="left">Left</ToggleGroup.Item>
  <ToggleGroup.Item value="center">Center</ToggleGroup.Item>
  <ToggleGroup.Item value="right">Right</ToggleGroup.Item>
</ToggleGroup.Root>
  );
}
```

### Multiple Selection

```tsx
import { ToggleGroup } from "@flowstack-ui/atom";

export default function FormattingGroup() {
  return (
<ToggleGroup.Root type="multiple" defaultValue={["bold"]}>
  <ToggleGroup.Item value="bold">Bold</ToggleGroup.Item>
  <ToggleGroup.Item value="italic">Italic</ToggleGroup.Item>
  <ToggleGroup.Item value="underline">Underline</ToggleGroup.Item>
</ToggleGroup.Root>
  );
}
```

## Accessibility

ToggleGroup composes the WAI-ARIA toggle-button pattern inside a named group.
Root is one roving Tab stop and Items expose `aria-pressed`.

| Key | Description |
| --- | --- |
| `ArrowRight` | Moves focus to the next item when horizontal LTR, previous in RTL. |
| `ArrowLeft` | Moves focus to the previous item when horizontal LTR, next in RTL. |
| `ArrowDown` | Moves focus to the next item when vertical. |
| `ArrowUp` | Moves focus to the previous item when vertical. |
| `Home` | Moves focus to the first enabled item. |
| `End` | Moves focus to the last enabled item. |
| `Enter` / `Space` | Toggles the focused item. |

## Changelog

### Unreleased

- No unreleased changes.

### 0.2.0

- Fixed disabled native `ToggleGroup.Item` buttons so they rely on the native
  `disabled` attribute without adding redundant `aria-disabled`; non-native
  composed items still receive `aria-disabled`.
- Fixed disabled `ToggleGroup.Root` semantics so the group exposes
  `aria-disabled` alongside `data-disabled`.
- Fixed `ToggleGroup.Root` single mode so changing from multiple selected
  values exposes only one pressed item.
- Fixed `ToggleGroup.Item` roving focus for composed non-native items so
  disabled items are skipped consistently in `asChild` and `render` paths.
- Fixed `ToggleGroup.Item` collection registration so changing `asChild` or
  `render` composition refreshes the DOM node used for arrow navigation.
- Fixed `ToggleGroup.Root` horizontal arrow navigation so it mirrors
  ArrowLeft/ArrowRight when used under `Direction.Provider dir="rtl"`.

### 0.1.0

- Initial Atom release.
