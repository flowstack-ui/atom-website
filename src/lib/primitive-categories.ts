export const primitiveCategories = [
  { id: "actions", label: "Actions + input", members: ["button", "pressable", "toggle", "toggle-group", "clipboard", "input", "textarea", "number-input", "otp-field", "password-toggle-field", "file-upload", "form", "field", "fieldset", "label"] },
  { id: "selection", label: "Selection", members: ["checkbox", "checkbox-group", "radio-group", "switch", "slider", "rating", "select", "multi-select", "combobox", "listbox"] },
  { id: "navigation", label: "Navigation", members: ["app-bar", "bottom-navigation", "breadcrumb", "nav-list", "navigation-menu", "menu", "menubar", "dropdown-menu", "context-menu", "pagination", "sidebar", "tabs", "toolbar", "link"] },
  { id: "overlays", label: "Overlays", members: ["dialog", "alert-dialog", "modal", "drawer", "popover", "hover-card", "tooltip", "toast"] },
  { id: "collections", label: "Collections + data", members: ["data-grid", "feed", "list", "table", "tree", "tree-grid", "scroll-area", "swipeable-item"] },
  { id: "structure", label: "Structure + feedback", members: ["accordion", "aspect-ratio", "avatar", "badge", "collapsible", "divider", "image", "progress", "skip-link"] },
  { id: "utilities", label: "Utilities", members: ["collection", "direction", "hooks", "portal", "virtualizer", "visually-hidden"] },
] as const;

export type PrimitiveCategory = (typeof primitiveCategories)[number];

export function primitiveCategoryFor(slug: string): PrimitiveCategory {
  return primitiveCategories.find((category) => category.members.includes(slug as never)) ?? primitiveCategories.at(-1)!;
}
