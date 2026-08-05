"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeftRight, Braces, ChevronDown, EyeOff, Search } from "lucide-react";
import { useCollection } from "@flowstack-ui/atom/collection";
import type { UseCollectionReturn } from "@flowstack-ui/atom/collection";
import { Direction, useDirection } from "@flowstack-ui/atom/direction";
import { useDisclosure } from "@flowstack-ui/atom/hooks";
import { Portal } from "@flowstack-ui/atom/portal";
import { getVirtualItems, getVirtualTotalSize } from "@flowstack-ui/atom/virtualizer";
import { VisuallyHidden } from "@flowstack-ui/atom/visually-hidden";
import type { ExampleProps } from "../example-types";
import { ContractSpecimen, DemoButton, DemoSurface } from "../example-shared";

type CollectionRegistration = Pick<UseCollectionReturn<string, HTMLButtonElement, Record<string, unknown>>, "registerItem" | "unregisterItem">;

function RegisteredAction({ value, registration }: { value: string; registration: CollectionRegistration }) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { const element = ref.current; if (!element) return; registration.registerItem(value, element); return () => registration.unregisterItem(value); }, [registration, value]);
  return <button className="atom-demo-segment" ref={ref} type="button">{value}</button>;
}

function CollectionSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const collection = useCollection<string, HTMLButtonElement, Record<string, unknown>>();
  const { registerItem, unregisterItem } = collection;
  const registration = useMemo(() => ({ registerItem, unregisterItem }), [registerItem, unregisterItem]);
  const move = () => { const current = document.activeElement instanceof HTMLButtonElement ? document.activeElement.textContent ?? "" : ""; const next = collection.getNextItem(current, "next", { loop: true }) ?? collection.getFirstItem(); next?.element.focus(); onSignal(`document order: ${collection.getValues().join(" → ")}`); };
  return <DemoSurface className="atom-demo-field"><strong>Registered actions</strong><div className="atom-demo-segmented">{["Copy", "Paste", "Delete"].map((value) => <RegisteredAction key={value} registration={registration} value={value} />)}</div><DemoButton onClick={move}>Focus next registered item</DemoButton></DemoSurface>;
}

function DirectionReadout({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const direction = useDirection();
  useEffect(() => onSignal(`resolved direction: ${direction}`), [direction, onSignal]);
  return <div className="atom-demo-direction-row" dir={direction}><div><small>logical start</small><span>البداية</span></div><strong>{direction.toUpperCase()}<ArrowLeftRight size={15} /></strong><div><small>logical end</small><span>النهاية</span></div></div>;
}

function DirectionSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [rtl, setRtl] = useState(true);
  return <DemoSurface className="atom-demo-direction"><Direction.Provider dir={rtl ? "rtl" : "ltr"}><div className="atom-demo-utility-heading"><span><ArrowLeftRight size={18} /></span><div><strong>Logical direction</strong><small>Layout intent follows the resolved writing mode.</small></div></div><DirectionReadout onSignal={onSignal} /><DemoButton onClick={() => setRtl((value) => !value)}>Switch to {rtl ? "LTR" : "RTL"}</DemoButton></Direction.Provider></DemoSurface>;
}

function HooksSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const disclosure = useDisclosure(true);
  useEffect(() => onSignal(`useDisclosure: ${disclosure.isOpen ? "open" : "closed"}`), [disclosure.isOpen, onSignal]);
  return <DemoSurface className="atom-demo-hook-card"><div className="atom-demo-utility-heading"><span><Braces size={18} /></span><div><strong>Hook-built disclosure</strong><small><code>useDisclosure()</code> supplies controlled state helpers.</small></div></div><button aria-controls="hook-panel" aria-expanded={disclosure.isOpen} onClick={disclosure.onToggle} type="button"><span>{disclosure.isOpen ? "Hide" : "Show"} implementation note</span><ChevronDown size={17} /></button>{disclosure.isOpen ? <div id="hook-panel"><strong>Composable state, application-owned markup</strong><p>The hook coordinates state. Your application still chooses the element, semantics, and appearance around it.</p></div> : null}</DemoSurface>;
}

function PortalSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [portalled, setPortalled] = useState(true);
  return <DemoSurface className="atom-demo-portal"><div className="atom-demo-portal__source"><small>React source</small><DemoButton onClick={() => { setPortalled((value) => !value); onSignal(`portal: ${portalled ? "disabled" : "custom container"}`); }}>Move content</DemoButton></div><div className="atom-demo-portal__target" ref={setContainer}><small>DOM destination</small><Portal container={container} disabled={!portalled}><span className="atom-demo-portalled-particle">Portalled particle</span></Portal></div></DemoSurface>;
}

function VirtualizerSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  const [offset, setOffset] = useState(0);
  const size = () => 38;
  const items = getVirtualItems({ count: 1000, scrollOffset: offset, viewportSize: 152, overscan: 1, getItemSize: size });
  const total = getVirtualTotalSize(1000, size);
  const advance = () => { const next = offset >= total - 152 ? 0 : Math.min(total - 152, offset + 190); setOffset(next); onSignal(`rendered ${items.length} of 1000 · offset ${next}px`); };
  return <DemoSurface className="atom-demo-virtualizer"><div className="atom-demo-label-row"><strong>1,000 mission signals</strong><span>{items.length} rendered</span></div><div className="atom-demo-virtual-window">{items.map((item) => <div key={item.key} style={{ transform: `translateY(${item.start - offset}px)` }}><span>{item.index + 1}</span> Signal record</div>)}</div><DemoButton onClick={advance}>Advance virtual window</DemoButton></DemoSurface>;
}

function VisuallyHiddenSpecimen({ onSignal }: Pick<ExampleProps, "onSignal">) {
  return <DemoSurface className="atom-demo-hidden-label"><div className="atom-demo-hidden-label__control"><button className="atom-demo-icon-button" onClick={() => onSignal("accessible name: Search missions")} type="button"><Search aria-hidden="true" size={18} /><VisuallyHidden.Root>Search missions</VisuallyHidden.Root></button><span><EyeOff size={14} /> label hidden visually</span></div><div><strong>Search missions</strong><p>The icon stays compact while <code>VisuallyHidden</code> gives the button a complete accessible name.</p></div></DemoSurface>;
}

export default function UtilitySpecimens(props: ExampleProps) {
  switch (props.slug) {
    case "collection": return <CollectionSpecimen onSignal={props.onSignal} />;
    case "direction": return <DirectionSpecimen onSignal={props.onSignal} />;
    case "hooks": return <HooksSpecimen onSignal={props.onSignal} />;
    case "portal": return <PortalSpecimen onSignal={props.onSignal} />;
    case "virtualizer": return <VirtualizerSpecimen onSignal={props.onSignal} />;
    case "visually-hidden": return <VisuallyHiddenSpecimen onSignal={props.onSignal} />;
    default: return <ContractSpecimen {...props} />;
  }
}
