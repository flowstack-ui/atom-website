"use client";

import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Progress } from "@flowstack-ui/brick/progress";
import { Tabs } from "@flowstack-ui/brick/tabs";
import { Text } from "@flowstack-ui/brick/text";
import { Eye, Focus, Hand, Keyboard, MousePointer2, Volume2 } from "lucide-react";

const signals = [
  { value: "keyboard", label: "Keyboard", icon: Keyboard, title: "Roving focus", body: "Arrow keys move intentionally. Enter and Space activate without pointer assumptions.", signal: "ArrowRight", progress: 92 },
  { value: "touch", label: "Touch", icon: Hand, title: "Touch-safe intent", body: "Targets, gestures, dismissal, and focus transitions remain coherent on coarse pointers.", signal: "pointer: coarse", progress: 86 },
  { value: "screen-reader", label: "Screen reader", icon: Volume2, title: "Semantic state", body: "Names, roles, relationships, announcements, and state stay synchronized with behavior.", signal: "aria-expanded=true", progress: 96 },
  { value: "focus", label: "Focus", icon: Focus, title: "Managed return", body: "Modal layers contain focus, dismiss predictably, and restore it to the owning trigger.", signal: "restoreFocus()", progress: 90 },
];

export function InteractionField() {
  return (
    <div className="interaction-field">
      <div className="interaction-field__glow" aria-hidden="true" />
      <div className="particle-system" aria-hidden="true">
        <span className="particle-system__orbit orbit-a" />
        <span className="particle-system__orbit orbit-b" />
        <span className="particle-system__core"><span /></span>
        <span className="particle-node node-a"><Keyboard /></span>
        <span className="particle-node node-b"><Hand /></span>
        <span className="particle-node node-c"><Eye /></span>
        <span className="particle-node node-d"><MousePointer2 /></span>
      </div>
      <Card.Root className="behavior-console" variant="elevated">
        <Card.Header>
          <div className="behavior-console__identity">
            <span className="console-status" aria-hidden="true" />
            <div><Card.Title as="h2">Interaction field</Card.Title><Card.Description>One contract, every input.</Card.Description></div>
          </div>
          <Badge size="sm" tone="success" variant="soft">Live system</Badge>
        </Card.Header>
        <Card.Content>
          <Tabs.Root defaultValue="keyboard" className="behavior-tabs">
            <Tabs.List ariaLabel="Choose an input signal">
              {signals.map(({ value, label, icon: Icon }) => <Tabs.Trigger key={value} value={value}><Icon size={15} aria-hidden="true" /><span>{label}</span></Tabs.Trigger>)}
              <Tabs.Indicator />
            </Tabs.List>
            {signals.map(({ value, title, body, signal, progress }) => (
              <Tabs.Content key={value} value={value}>
                <div className="signal-readout">
                  <div><Text as="h3" variant="title-md">{title}</Text><Text tone="secondary" variant="body-sm">{body}</Text></div>
                  <code>{signal}</code>
                  <Progress.Root value={progress}><Progress.Label>Contract confidence</Progress.Label><Progress.Value /><Progress.Track><Progress.Indicator /></Progress.Track></Progress.Root>
                </div>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
