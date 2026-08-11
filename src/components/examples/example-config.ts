import type { ExampleConfig } from "./example-types";

const formSlugs = new Set(["input", "textarea", "number-input", "otp-field", "password-toggle-field", "file-upload", "form", "field", "fieldset", "label", "checkbox", "checkbox-group", "radio-group", "switch", "slider", "rating", "select", "multi-select", "combobox", "listbox"]);
const overlaySlugs = new Set(["menu", "menubar", "dropdown-menu", "context-menu", "dialog", "alert-dialog", "modal", "drawer", "popover", "hover-card", "tooltip", "toast", "navigation-menu"]);
const expandingSlugs = new Set(["accordion", "collapsible", "tree", "tree-grid", "sidebar"]);
const collectionSlugs = new Set(["data-grid", "feed", "list", "table", "scroll-area", "swipeable-item", "collection", "virtualizer"]);
const structuralSlugs = new Set(["app-bar", "bottom-navigation", "breadcrumb", "nav-list", "pagination", "tabs", "toolbar", "aspect-ratio", "avatar", "badge", "carousel", "divider", "image", "progress", "skip-link"]);
const utilitySlugs = new Set(["direction", "hooks", "portal", "visually-hidden"]);

const prompts: Record<string, string> = {
  accordion: "Use Enter to disclose a panel, then continue through its content.",
  "alert-dialog": "Open the decision, then cancel or confirm it with the keyboard.",
  button: "Press Enter, Space, or tap the action.",
  carousel: "Use Previous, Next, the picker, or native horizontal scrolling to select one slide.",
  checkbox: "Toggle the control with Space and inspect its checked state.",
  clipboard: "Copy the value and watch the status announcement.",
  collapsible: "Open and close the region without moving its trigger.",
  "context-menu": "Right-click the target or use the keyboard context-menu command.",
  dialog: "Open the dialog, move through its focus scope, then close it.",
  drawer: "Open the sheet and verify focus returns to the trigger.",
  "hover-card": "Hover or focus the identity to reveal supporting information.",
  menu: "Open the menu and move through its commands with arrow keys.",
  "navigation-menu": "Open a destination group and move through its links.",
  popover: "Open the non-modal layer and dismiss it with Escape.",
  "radio-group": "Use arrow keys to change the single selected option.",
  select: "Open the listbox and choose an option with the keyboard.",
  slider: "Use arrow keys or drag the thumb to change the value.",
  "swipeable-item": "Swipe the row or use its keyboard-safe visible action.",
  switch: "Toggle the setting with Space or a pointer.",
  tabs: "Use arrow keys to move selection between panels.",
  toast: "Create a status message, then dismiss it without losing context.",
  toggle: "Press the control and inspect aria-pressed.",
  tooltip: "Focus or hover the trigger to reveal supplemental text.",
  tree: "Expand a branch and move through visible tree items.",
};

export function exampleConfigFor(slug: string): ExampleConfig {
  const layout = formSlugs.has(slug) ? "form"
    : overlaySlugs.has(slug) ? "overlay"
    : expandingSlugs.has(slug) ? "expanding"
    : collectionSlugs.has(slug) ? "collection"
    : structuralSlugs.has(slug) ? "structural"
    : utilitySlugs.has(slug) ? "utility"
    : "compact";
  return {
    layout,
    prompt: prompts[slug] ?? "Interact with the specimen and inspect the behavior Atom contributes.",
    initialSignal: layout === "utility" ? "contract ready" : "waiting for input",
  };
}
