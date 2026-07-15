# Styling

Atom is unstyled. It supplies behavior, semantic elements, accessibility attributes, and state markers while your application supplies all visual and functional CSS.

## Native props and classes

Rendered Atom parts accept the native properties for their default element unless Atom owns a property for behavior or accessibility. Pass `className`, `style`, `id`, `title`, testing attributes, and additional `aria-*` attributes normally.

```tsx
import { Switch } from "@flowstack-ui/atom";

<Switch.Root className="PreferenceSwitch">
  <Switch.Thumb className="PreferenceSwitchThumb" />
</Switch.Root>;
```

## Data attributes

Atom exposes stable styling hooks for behavior state. Common attributes include:

- `data-slot` for the rendered part;
- `data-state` for open, closed, checked, or unchecked state;
- `data-disabled` when interaction is disabled;
- `data-orientation` for horizontal or vertical patterns;
- component-specific selection, placement, or validation state.

```css
.PreferenceSwitch[data-state="checked"] {
  background: CanvasText;
}

.PreferenceSwitch[data-disabled] {
  opacity: 0.5;
}
```

Each component page lists its public data attributes.

## Functional styles

Headless does not mean every component works without geometry. Applications must provide layout styles for overlays, floating panels, scroll viewports, virtualized content, and visually hidden elements when the component documentation calls for them.

Atom owns positioning calculations for floating components, but your CSS owns dimensions, backgrounds, borders, shadows, and animation.

## Styling compound parts

Give each part a class or select its `data-slot` value:

```css
[data-slot="popover-content"] {
  max-width: 20rem;
  border: 1px solid CanvasText;
  background: Canvas;
}
```

Avoid internal source paths and undocumented DOM assumptions. Public parts, native props, ARIA output, and documented data attributes are the supported styling surface.
