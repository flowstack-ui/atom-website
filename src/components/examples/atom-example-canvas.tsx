"use client";

import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "@flowstack-ui/brick/badge";
import { Keyboard, Orbit, Radio } from "lucide-react";
import { primitiveCategoryFor } from "@/lib/primitive-categories";
import { exampleConfigFor } from "./example-config";
import type { ExampleProps } from "./example-types";

const examples = {
  actions: lazy(() => import("./specimens/actions")),
  selection: lazy(() => import("./specimens/selection")),
  navigation: lazy(() => import("./specimens/navigation")),
  overlays: lazy(() => import("./specimens/overlays")),
  collections: lazy(() => import("./specimens/collections")),
  structure: lazy(() => import("./specimens/structure")),
  utilities: lazy(() => import("./specimens/utilities")),
} as const;

function HydratedSpecimen({ Specimen, slug, title, onSignal, onReady }: ExampleProps & {
  Specimen: (typeof examples)[keyof typeof examples];
  onReady: () => void;
}) {
  useEffect(onReady, [onReady]);
  return <Specimen slug={slug} title={title} onSignal={onSignal} />;
}

export function AtomExampleCanvas({ slug, title }: Omit<ExampleProps, "onSignal">) {
  const config = useMemo(() => exampleConfigFor(slug), [slug]);
  const [signal, setSignal] = useState(config.initialSignal);
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const category = primitiveCategoryFor(slug).id;
  const Specimen = examples[category];
  const headingId = `live-${slug}-title`;

  return (
    <section className="atom-example" aria-labelledby={headingId} data-ready={ready ? "" : undefined}>
      <header className="atom-example__header">
        <div><span>Live behavior</span><h2 id={headingId}>{title} in motion</h2></div>
        <Badge size="sm" tone="accent" variant="outline"><Radio size={12} aria-hidden="true" /> Interactive</Badge>
      </header>
      <div className="atom-example__canvas" data-layout={config.layout}>
        <div className="atom-example__identity"><Orbit size={13} aria-hidden="true" /> Atom behavior <span>·</span> App-owned appearance</div>
        <div className="atom-example__specimen">
          <Suspense fallback={<div className="atom-example__loading"><span />Preparing behavior…</div>}>
            <HydratedSpecimen Specimen={Specimen} slug={slug} title={title} onSignal={setSignal} onReady={markReady} />
          </Suspense>
        </div>
      </div>
      <footer className="atom-example__footer">
        <p><Keyboard size={14} aria-hidden="true" />{config.prompt}</p>
        <code aria-live="polite">{signal}</code>
      </footer>
    </section>
  );
}
