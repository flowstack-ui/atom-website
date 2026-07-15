# Accessibility

Atom primitives implement the semantics and interaction contracts they explicitly document. Each component page identifies the native element or WAI-ARIA pattern it follows, the keyboard behavior Atom owns, and the information the application must still provide.

## Native semantics first

Atom uses native elements when they already provide the correct contract. Buttons render as buttons, navigation lists use native navigation and list elements, and form controls preserve browser behavior.

When a custom element is composed into a primitive, Atom adds the semantics and keyboard activation that the public API promises. The consumer remains responsible for choosing an element that can fulfill the component's intended role.

## Accessible names and relationships

Compound primitives generate IDs and connect labels, descriptions, triggers, and content where necessary. Applications must still provide meaningful visible text or accessible labels.

For example, a Dialog needs a clear title or an explicit accessible label. A Tooltip should contain supplemental text, not interactive content. A Field should communicate its label, description, required state, and errors clearly.

## Keyboard and focus behavior

Interactive primitives document their owned keys. Depending on the pattern, Atom may provide:

- roving focus or active-descendant navigation;
- arrow, Home, End, Page Up, and Page Down behavior;
- Escape dismissal;
- focus containment and restoration;
- typeahead;
- direction-aware horizontal keys.

Do not add competing keyboard handlers without reviewing the primitive's contract. Consumer handlers are composed where the API allows, and `event.preventDefault()` may provide an intentional cancellation path.

## Consumer responsibilities

- Supply clear labels, titles, descriptions, and error messages.
- Preserve sufficient color contrast and visible focus indicators.
- Keep touch targets and spacing usable.
- Test the completed styled interface with keyboard and assistive technology.
- Avoid hiding required content with CSS.
- Preserve semantics when using `asChild` or `render`.

Accessibility is a property of the completed interface. Atom handles difficult primitive behavior, while the application remains responsible for content, visual design, and integration context.
