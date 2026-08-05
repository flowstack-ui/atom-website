import { Badge } from "@flowstack-ui/brick/badge";
import { Focus, Hand, Keyboard, Orbit, ScanLine, Volume2 } from "lucide-react";
import type { DocumentEntry } from "@/lib/docs-manifest";
import { AccessibilityInstrument } from "./accessibility-instrument";

export function DocumentVisual({ entry }: { entry: DocumentEntry }) {
  if (entry.section === "overview" && entry.slug === "accessibility") return <AccessibilityInstrument />;
  if (entry.section === "components" || entry.section === "utilities") {
    return (
      <div className="primitive-contract" aria-label={`${entry.title} behavior contract`}>
        <div className="primitive-contract__core"><Orbit aria-hidden="true" /><strong>{entry.title}</strong><small>{entry.section === "utilities" ? "Headless utility" : "Headless primitive"}</small></div>
        <span className="contract-signal signal-keyboard"><Keyboard aria-hidden="true" /><small>Keyboard</small></span>
        <span className="contract-signal signal-touch"><Hand aria-hidden="true" /><small>Touch</small></span>
        <span className="contract-signal signal-semantics"><Volume2 aria-hidden="true" /><small>Semantics</small></span>
        <span className="contract-signal signal-focus"><Focus aria-hidden="true" /><small>Focus</small></span>
      </div>
    );
  }

  const label = entry.section === "overview" ? "Start with the contract" : entry.section === "guides" ? "Follow the signal" : "System boundary";
  return (
    <div className="guide-orbit" aria-hidden="true">
      <span className="guide-orbit__ring ring-one" /><span className="guide-orbit__ring ring-two" />
      <span className="guide-orbit__core"><ScanLine /><strong>{entry.title}</strong><small>{label}</small></span>
      <Badge className="guide-orbit__badge" tone="accent" variant="soft">Atom guide</Badge>
    </div>
  );
}
