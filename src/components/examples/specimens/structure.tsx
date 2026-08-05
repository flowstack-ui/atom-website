"use client";

import { useState } from "react";
import { Accessibility, ChevronDown, Code2, Palette, Rocket } from "lucide-react";
import { Accordion } from "@flowstack-ui/atom/accordion";
import { AspectRatio } from "@flowstack-ui/atom/aspect-ratio";
import { Avatar } from "@flowstack-ui/atom/avatar";
import { Badge } from "@flowstack-ui/atom/badge";
import { Collapsible } from "@flowstack-ui/atom/collapsible";
import { Divider } from "@flowstack-ui/atom/divider";
import { Image } from "@flowstack-ui/atom/image";
import { Progress } from "@flowstack-ui/atom/progress";
import { SkipLink } from "@flowstack-ui/atom/skip-link";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoButton, DemoSurface } from "../example-shared";

function AccordionSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const items = [["keyboard", "Keyboard behavior", "Arrow keys move between triggers; Enter and Space control disclosure.", Code2], ["semantics", "Named relationships", "Each trigger identifies its panel and announces the current expanded state.", Accessibility], ["touch", "Input parity", "Pointer activation reaches the same state contract without replacing keyboard access.", Rocket]] as const;
  return <Accordion.Root className="atom-demo-accordion" defaultValue={["keyboard"]} onValueChange={(value) => onSignal(`open panels: ${value.join(", ") || "none"}`)} type="multiple">{items.map(([value, label, copy, Icon]) => <Accordion.Item key={value} value={value}><Accordion.Header><Accordion.Trigger><span className="atom-demo-accordion__title"><Icon size={16} />{label}</span><ChevronDown className="atom-demo-accordion__indicator" size={17} /></Accordion.Trigger></Accordion.Header><Accordion.Content><p>{copy}</p></Accordion.Content></Accordion.Item>)}</Accordion.Root>;
}

function CollapsibleSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Collapsible.Root className="atom-demo-collapsible" defaultOpen onOpenChange={(open) => onSignal(`aria-expanded: ${open}`)}><Collapsible.Trigger><span><Rocket size={16} /> Mission details</span><ChevronDown className="atom-demo-accordion__indicator" size={17} /></Collapsible.Trigger><Collapsible.Content><div className="atom-demo-collapsible__content"><span>Northstar</span><strong>Seven behavioral signals passed</strong><p>Appearance remains application-owned while disclosure state, IDs, and semantics stay coordinated.</p></div></Collapsible.Content></Collapsible.Root>;
}

function AspectSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <AspectRatio.Root className="atom-demo-aspect" ratio={16 / 9} onClick={() => onSignal("ratio: 16 / 9 maintained")}><div><span>16:9</span><strong>Mission transmission</strong></div></AspectRatio.Root>;
}

function AvatarSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-avatar-group" onClick={() => onSignal("fallback names remain available")}><Avatar.Group><Avatar.Root className="atom-demo-avatar atom-demo-avatar--large"><Avatar.Fallback>MD</Avatar.Fallback></Avatar.Root><Avatar.Root className="atom-demo-avatar atom-demo-avatar--large"><Avatar.Fallback>WN</Avatar.Fallback></Avatar.Root><Avatar.Root className="atom-demo-avatar atom-demo-avatar--large"><Avatar.Fallback>+3</Avatar.Fallback></Avatar.Root></Avatar.Group><div><strong>Flight team</strong><small>Image loading and fallback behavior share one contract.</small></div></DemoSurface>;
}

function BadgeSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-badge-set" onClick={() => onSignal("passive status semantics preserved")}><Badge.Root className="atom-demo-status-badge" data-tone="success">Ready</Badge.Root><Badge.Root className="atom-demo-status-badge" data-tone="warning">Review</Badge.Root><Badge.Root className="atom-demo-status-badge" data-tone="danger">Blocked</Badge.Root></DemoSurface>;
}

function DividerSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-divider-card" onClick={() => onSignal("role: separator · orientation: horizontal")}><div className="atom-demo-layer"><span><Accessibility size={17} /></span><div><strong>Atom behavior</strong><small>Semantics, state, focus, and input</small></div></div><div className="atom-demo-divider-label"><Divider.Root className="atom-demo-divider" /><span>composed with</span><Divider.Root className="atom-demo-divider" /></div><div className="atom-demo-layer"><span><Palette size={17} /></span><div><strong>Your appearance</strong><small>Brand, layout, color, and motion</small></div></div></DemoSurface>;
}

function ImageSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <Image.Root className="atom-demo-image" onLoadingStatusChange={(status) => onSignal(`image status: ${status}`)} src="/favicon.svg"><Image.Content alt="Atom UI orbital brand mark" /><Image.Fallback><span>AT</span><strong>Atom brand mark</strong></Image.Fallback></Image.Root>;
}

function ProgressSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [value, setValue] = useState(68);
  const advance = () => { const next = value >= 100 ? 24 : Math.min(100, value + 8); setValue(next); onSignal(`aria-valuenow: ${next}`); };
  return <DemoSurface className="atom-demo-progress-card"><div className="atom-demo-progress-heading"><span className="atom-demo-progress-icon"><Rocket size={18} /></span><div><strong>Launch readiness</strong><small>{value === 100 ? "All checks passed" : `${100 - value}% remaining`}</small></div><output>{value}%</output></div><Progress.Root aria-label="Launch readiness" className="atom-demo-progress" max={100} value={value}><Progress.Indicator style={{ width: `${value}%` }} /></Progress.Root><DemoButton onClick={advance}>{value === 100 ? "Restart validation" : "Advance validation"}</DemoButton></DemoSurface>;
}

function SkipLinkSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-skip-stage"><SkipLink.Root className="atom-demo-skip-link" href="#demo-skip-target" onClick={() => onSignal("focus destination: mission content")}>Skip to mission content</SkipLink.Root><div className="atom-demo-skip-chrome"><span>Header</span><span>Navigation</span></div><SkipLink.Target className="atom-demo-skip-target" id="demo-skip-target"><strong>Mission content</strong><p>The destination can receive programmatic focus without changing document semantics.</p></SkipLink.Target></DemoSurface>;
}

export default function StructureSpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "accordion": return <AccordionSpecimen onSignal={props.onSignal} />;
    case "collapsible": return <CollapsibleSpecimen onSignal={props.onSignal} />;
    case "aspect-ratio": return <AspectSpecimen onSignal={props.onSignal} />;
    case "avatar": return <AvatarSpecimen onSignal={props.onSignal} />;
    case "badge": return <BadgeSpecimen onSignal={props.onSignal} />;
    case "divider": return <DividerSpecimen onSignal={props.onSignal} />;
    case "image": return <ImageSpecimen onSignal={props.onSignal} />;
    case "progress": return <ProgressSpecimen onSignal={props.onSignal} />;
    case "skip-link": return <SkipLinkSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
