# RadioGroup

Headless single-selection radio group with roving focus.

## When to Use

Use `RadioGroup` when the user must choose exactly one option from a short list
and seeing every choice helps the decision. Use `CheckboxGroup` when several
choices may be selected, or `Select` when the list is long and should stay
compact.

## Features

- Manages one selected value.
- Can be controlled or uncontrolled.
- Supports horizontal and vertical keyboard navigation.
- Mirrors horizontal arrow-key navigation in RTL when wrapped in `Direction.Provider`.
- Supports optional looping.
- Supports a group-level read-only state that preserves focus and submission.
- Renders hidden native radio inputs for form submission when named.
- Keeps only the selected or first enabled item in the tab order.

## Import

```tsx
import { RadioGroup } from "@flowstack-ui/atom";
```

## Anatomy

```tsx
<RadioGroup.Root>
  <RadioGroup.Radio value="one" />
  <RadioGroup.Radio value="two" />
</RadioGroup.Root>
```

## API Reference

### Root

Owns the selected value, group label, form settings, orientation, and roving
focus behavior for every Radio part inside it.

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `string` | - |
| `defaultValue` | `string` | `""` |
| `onValueChange` | `(value: string) => void` | - |
| `name` | `string` | - |
| `form` | `string` | - |
| `disabled` | `boolean` | `false` |
| `readOnly` | `boolean` | `false` |
| `required` | `boolean` | `false` |
| `invalid` | `boolean` | `false` |
| `validationBehavior` | `"inline" \| "native"` | Fieldset/Form value or `"native"` |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |
| `dir` | `"ltr" \| "rtl"` | nearest `Direction.Provider`, then `"ltr"` |
| `loop` | `boolean` | `true` |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `role` | `"radiogroup"` |
| `aria-label` | Native value when provided |
| `aria-labelledby` | Native value or inherited Fieldset Legend ID |
| `aria-describedby` | Native value or inherited Fieldset messages |
| `aria-disabled` | `true` when disabled |
| `aria-readonly` | `true` when read-only |
| `aria-required` | `true` when required |
| `aria-invalid` | `true` when invalid |
| `aria-orientation` | `"horizontal"` or `"vertical"` |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"radio-group"` |
| `[data-orientation]` | `"horizontal" \| "vertical"` |
| `[data-disabled]` | Present when disabled |
| `[data-readonly]` | Present when read-only |
| `[data-invalid]` | Present when invalid |

An explicit Root `dir` controls both DOM direction and horizontal arrow-key
mapping. Without it, keyboard behavior uses the nearest `Direction.Provider`.

### Radio

Renders one option, registers it for keyboard navigation, and mirrors the
selected value into a hidden native radio input when Root has a `name`.
Required validity is owned once at group level by a transparent native proxy
aligned with the first enabled Radio. It works without a submission name and
redirects browser validation focus to that Radio.

| Prop | Type | Default |
| --- | --- | --- |
| `value` | `string` | Required |
| `disabled` | `boolean` | Group state |
| `asChild` | `boolean` | `false` |
| `render` | `RenderProp` | - |

| ARIA attribute | Values |
| --- | --- |
| `role` | `"radio"` |
| `aria-checked` | `true` when selected |
| `aria-label` | Native value when provided |
| `aria-disabled` | `true` when the Radio or group is disabled |
| `aria-invalid` | `true` when the group is invalid |

| Data attribute | Values |
| --- | --- |
| `[data-slot]` | `"radio"` |
| `[data-value]` | Item value |
| `[data-state]` | `"checked" \| "unchecked"` |
| `[data-disabled]` | Present when disabled |
| `[data-readonly]` | Present when the group is read-only |
| `[data-invalid]` | Present when invalid |

Advanced compound parts can read the group contract with
`useRadioGroupContext`; `RadioGroupContextProvider` and its context value type
are also public for low-level composition.

## Examples

### Horizontal Group

```tsx
import { RadioGroup } from "@flowstack-ui/atom";

export default () => (
  <RadioGroup.Root orientation="horizontal" defaultValue="email">
    <RadioGroup.Radio value="email">Email</RadioGroup.Radio>
    <RadioGroup.Radio value="phone">Phone</RadioGroup.Radio>
  </RadioGroup.Root>
);
```

## Accessibility

Missing required selection is one group-level invalid state. A validation
attempt marks Root and Fieldset invalid and focuses the first enabled Radio.
Inline behavior reveals Fieldset Error and suppresses the browser bubble;
native behavior keeps it.

`RadioGroup` follows the
[WAI-ARIA radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).
Root exposes
`role="radiogroup"`, each Radio exposes its checked state, and roving tab focus
keeps the group to one Tab stop. Provide a group name with `aria-labelledby` or
native `aria-label`/`aria-labelledby`, or a surrounding Fieldset Legend.
Uncontrolled selection returns to `defaultValue` on form reset. Horizontal
arrows mirror in RTL through `Direction.Provider`.

Read-only groups keep their selected value focusable and submitted. Pointer,
Space, and navigation keys cannot change that value; navigation keys may still
move focus so every option remains discoverable.

| Key | Description |
| --- | --- |
| `ArrowDown` | Moves to the next item when orientation is vertical. |
| `ArrowUp` | Moves to the previous item when orientation is vertical. |
| `ArrowRight` | Moves to the next item when orientation is horizontal. |
| `ArrowLeft` | Moves to the previous item when orientation is horizontal. |
| `Home` | Moves to the first enabled item. |
| `End` | Moves to the last enabled item. |
| `Space` | Selects the focused Radio through native button activation. |
| `Tab` | Enters or leaves the group through its single roving Tab stop. |

## Changelog

### 0.11.1

- Made Root `dir="rtl"` control horizontal arrow-key navigation directly,
  without requiring a matching Direction provider.

### 0.11.0

- Added group-level read-only semantics, state hooks, and interaction locking
  while preserving focus navigation and native form submission.

### 0.6.16

- Explicitly scrolled inline validation-directed focus into view.

### 0.6.15

- Exposed inline validation-directed focus through `[data-focus-visible]`
  until blur.

### 0.6.13

- Added one group-level inline/native validation state, Fieldset Error
  presentation, and first-enabled-radio focus for missing required selection.

### 0.6.12

- Added one group-level required proxy aligned with the first enabled Radio,
  preserving named radio submission and validation without a name.

### 0.5.0

- Added Fieldset naming/state/description integration, native-only ARIA naming,
  and uncontrolled native form reset behavior.

### 0.2.0

- Added `Direction.Provider` support so horizontal arrow-key navigation mirrors
  in RTL.
- Added root `aria-disabled` when the group is disabled.
- Fixed roving focus so disabled radios are skipped correctly when `Radio`
  renders a non-native element through `asChild` or `render`.
- Added registry invalidation so the first enabled item becomes tabbable after item registration when no value is selected.
- Memoized the group context value.

### 0.1.0

- Initial Atom release with root, item, roving focus, keyboard navigation, and hidden form inputs.
