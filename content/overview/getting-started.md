# Getting started

Install Atom UI and its React peer dependencies, then compose the primitives you need.

## Install

```bash
npm install @flowstack-ui/atom react react-dom
```

Atom supports React and React DOM version 18 or newer. Positioned primitives use Floating UI through Atom's own runtime dependency.

## Import a primitive

Prefer namespace imports from the main package:

```tsx
import { Dialog, Field, Input } from "@flowstack-ui/atom";

export function ProfileDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Edit profile</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description>Update your public details.</Dialog.Description>
          <Field.Root id="email" required>
            <Field.Label>Email</Field.Label>
            <Input.Root name="email" type="email" />
          </Field.Root>
          <Dialog.Close>Done</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
```

## Add styles

Atom ships no CSS. Add the functional geometry and visual presentation your interface needs:

```css
[data-slot="dialog-overlay"] {
  position: fixed;
  inset: 0;
  background: rgb(0 0 0 / 45%);
}

[data-slot="dialog-content"] {
  position: fixed;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
}
```

## Use focused entry points

Documented subpaths are also stable:

```tsx
import { Dialog } from "@flowstack-ui/atom/dialog";
import { Input } from "@flowstack-ui/atom/input";
import { useControllableState } from "@flowstack-ui/atom/hooks";
```

For new code, prefer namespace APIs such as `Dialog.Root`. Direct part exports remain available on component subpaths for advanced composition.

## Next steps

- Read [Styling](/docs/guides/styling/) to understand data attributes and functional CSS.
- Read [Composition](/docs/guides/composition/) before changing a primitive's rendered element.
- Review each component's Accessibility section before shipping it in a product.
