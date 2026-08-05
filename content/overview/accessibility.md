# Accessibility

Atom provides the documented behavioral foundation for accessible interfaces. It coordinates semantics, relationships, keyboard interaction, and focus where each primitive explicitly promises them. Your application completes the contract with meaningful content, visible styling, usable targets, and testing in context.

## Accessibility is a shared contract

No headless package can make a finished product accessible by itself. Atom handles the reusable interaction contract; the application decides what the interaction means and how people perceive it.

| Layer | Atom owns | Your application owns |
| --- | --- | --- |
| Semantics | Native elements and documented WAI-ARIA patterns | Choosing composition that preserves the intended role |
| Names and relationships | Generated IDs and owned label, description, trigger, and content connections | Meaningful visible labels, instructions, errors, and alternate text |
| Keyboard | Documented keys, movement, typeahead, and cancellation paths | Avoiding competing handlers and validating the completed workflow |
| Focus | Movement, containment, and restoration where promised | Visible, unclipped focus styling and sensible product-level order |
| Touch and pointer | Native activation and documented pointer behavior | Target size, spacing, visual feedback, and testing on real devices |

## Native semantics first

Atom uses native elements when they already provide the correct contract. Buttons render as buttons, navigation lists use native navigation and list elements, and form controls preserve browser behavior.

When a custom element is composed into a primitive, Atom adds the semantics and keyboard activation that the public API promises. The consumer remains responsible for choosing an element that can fulfill the component's intended role.

## Accessible names and relationships

Compound primitives generate IDs and connect labels, descriptions, triggers, and content where necessary. Applications must still provide meaningful visible text or accessible labels.

For example, a Dialog needs a clear title or an explicit accessible label. A Tooltip should contain supplemental text, not interactive content. A Field should communicate its label, description, required state, and errors clearly.

## Keyboard and focus behavior

Interactive primitives document the keys and focus behavior they own. Depending on the pattern, Atom may provide:

- roving focus or active-descendant navigation;
- arrow, Home, End, Page Up, and Page Down behavior;
- Escape dismissal;
- focus containment and restoration;
- typeahead;
- direction-aware horizontal keys.

Do not add competing keyboard handlers without reviewing the primitive's contract. Consumer handlers are composed where the API allows, and `event.preventDefault()` may provide an intentional cancellation path.

## Input is not a device

People move between keyboard, touch, pointer, switch control, and assistive technology. Atom avoids treating one input method as the complete experience, but the finished application must still provide sufficiently large targets, clear state feedback, and layouts that remain usable under zoom and text scaling.

Test important workflows using more than one input path. A control that works with a mouse but loses its name, focus position, or dismissal behavior is not complete.

## Test the completed interface

Use the component pages to understand the behavior Atom owns, then verify the styled product around it:

1. Navigate the workflow with the keyboard alone and confirm that focus remains visible.
2. Read the interface with a screen reader and confirm that names, roles, state, and relationships are meaningful.
3. Exercise touch and pointer interactions on a narrow viewport without relying on hover.
4. Increase text size and zoom without losing content, actions, or reading order.
5. Check reduced-motion and forced-color preferences wherever the visual system adds animation or custom color.

Accessibility is a property of the completed interface. Atom carries difficult primitive behavior forward, while the application remains responsible for product language, visual design, integration context, and real-world validation.
