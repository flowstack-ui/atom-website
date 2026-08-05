"use client";

import { Badge } from "@flowstack-ui/brick/badge";
import { Tabs } from "@flowstack-ui/brick/tabs";
import { Focus, Hand, Keyboard, ScanLine, Volume2, type LucideIcon } from "lucide-react";

const channels: Array<{
  value: string;
  label: string;
  icon: LucideIcon;
  signal: string;
  title: string;
  atom: string;
  product: string;
}> = [
  { value: "keyboard", label: "Keyboard", icon: Keyboard, signal: "ArrowRight · Home · End", title: "Predictable key contracts", atom: "Atom coordinates the documented keys, movement, and cancellation paths.", product: "Your product avoids competing handlers and preserves the intended interaction." },
  { value: "screen-reader", label: "Screen reader", icon: Volume2, signal: "Name · role · state", title: "Relationships that can be announced", atom: "Atom connects the labels, descriptions, triggers, and content its contract owns.", product: "Your product supplies meaningful names, instructions, errors, and visible language." },
  { value: "touch", label: "Touch", icon: Hand, signal: "Pointer · press · dismiss", title: "The same behavior across input", atom: "Atom preserves native activation and the pointer behavior documented by each primitive.", product: "Your visual system supplies usable target size, spacing, feedback, and device testing." },
  { value: "focus", label: "Focus", icon: Focus, signal: "Contain · restore · reveal", title: "Focus follows the interaction", atom: "Atom contains, moves, or restores focus where the primitive explicitly promises it.", product: "Your theme keeps every focused control visible, legible, and unclipped." },
];

export function AccessibilityInstrument() {
  return (
    <div className="accessibility-instrument">
      <div className="accessibility-instrument__header">
        <span><ScanLine size={15} aria-hidden="true" /> Behavior channels</span>
        <Badge size="sm" tone="success" variant="soft">Contract live</Badge>
      </div>
      <Tabs.Root className="accessibility-tabs" defaultValue="keyboard">
        <Tabs.List ariaLabel="Inspect accessibility behavior by input channel">
          {channels.map(({ value, label, icon: Icon }) => <Tabs.Trigger key={value} value={value}><Icon size={15} aria-hidden="true" /><span>{label}</span></Tabs.Trigger>)}
          <Tabs.Indicator />
        </Tabs.List>
        {channels.map(({ value, signal, title, atom, product }) => (
          <Tabs.Content key={value} value={value}>
            <div className="accessibility-readout">
              <code>{signal}</code>
              <strong>{title}</strong>
              <div className="accessibility-readout__owners">
                <p><span>Atom owns</span>{atom}</p>
                <p><span>You own</span>{product}</p>
              </div>
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}

const highlights = [
  { icon: ScanLine, label: "Semantics", detail: "Native elements and explicit documented patterns." },
  { icon: Volume2, label: "Relationships", detail: "Names, descriptions, state, and compound anatomy." },
  { icon: Keyboard, label: "Interaction", detail: "Keys, typeahead, dismissal, and direction-aware movement." },
  { icon: Focus, label: "Continuity", detail: "Focus movement, containment, and restoration where promised." },
];

export function AccessibilityHighlights() {
  return (
    <div className="accessibility-highlights" aria-label="Accessibility contract highlights">
      {highlights.map(({ icon: Icon, label, detail }) => <div key={label}><span><Icon size={16} aria-hidden="true" /></span><p><strong>{label}</strong><small>{detail}</small></p></div>)}
    </div>
  );
}
