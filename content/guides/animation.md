# Animation

Atom leaves motion design to the application while exposing state and presence behavior that styled layers can use safely.

## Animate documented states

Stateful parts expose attributes such as `data-state="open"` and `data-state="closed"`. Use those attributes to select the appropriate transition or keyframe.

```css
[data-slot="popover-content"][data-state="open"] {
  animation: enter 140ms ease-out;
}

@keyframes enter {
  from {
    opacity: 0;
    transform: translateY(-0.25rem);
  }
}
```

## Presence and mounted content

Some primitives expose `forceMount` or `keepMounted` so the application can retain content for measurement or an exit sequence. These options are component-specific; check the API Reference before relying on them.

Kept-mounted modal content remains hidden from interaction when closed. Do not override Atom's hidden or accessibility state merely to make an animation visible.

## JavaScript animation libraries

When a JavaScript animation library needs to control exit timing, use the component's documented mounted-content API and controlled state. Keep Atom responsible for accessibility and dismissal while the animation library owns visual interpolation.

## Reduced motion

Motion is application-owned, so the application must respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  [data-state] {
    animation-duration: 1ms;
    transition-duration: 1ms;
  }
}
```

Do not delay focus, accessible state, or dismissal until a decorative animation finishes unless the primitive explicitly supports that lifecycle.
