"use client";

import { useEffect, useState } from "react";
import { Button } from "@flowstack-ui/brick/button";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { BookOpen, List, X } from "lucide-react";
import type { DocumentHeading } from "@/lib/documents";
import type { DocumentationScope } from "@/lib/docs-manifest";
import { DocsNavigation } from "./docs-navigation";
import { OnThisPage } from "./on-this-page";

export function DocsMobileNavigation({ headings, scope, title }: { headings: DocumentHeading[]; scope: DocumentationScope; title: string }) {
  const [navOpen, setNavOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const close = () => { if (media.matches) { setNavOpen(false); setTocOpen(false); } };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);

  return (
    <div className="docs-mobile-toolbar" aria-label="Documentation controls">
      <Drawer.Root open={navOpen} onOpenChange={setNavOpen}>
        <Drawer.Trigger asChild><Button size="sm" tone="neutral" variant="soft" startIcon={<BookOpen size={16} aria-hidden="true" />}>Browse</Button></Drawer.Trigger>
        <Drawer.Portal><Drawer.Overlay /><Drawer.Content placement="start" size="md" className="docs-mobile-drawer"><Drawer.Header className="docs-mobile-drawer__header"><div><Drawer.Title>{scope === "primitives" ? "Atom primitives" : "Atom guides"}</Drawer.Title><Drawer.Description>{scope === "primitives" ? "Browse the public behavioral primitive catalog." : "Browse introductions, guides, architecture, and utilities."}</Drawer.Description></div><Drawer.Close asChild><Button aria-label="Close documentation navigation" className="square-action" tone="neutral" variant="ghost"><X size={18} aria-hidden="true" /></Button></Drawer.Close></Drawer.Header><Drawer.Body><DocsNavigation scope={scope} onNavigate={() => setNavOpen(false)} /></Drawer.Body></Drawer.Content></Drawer.Portal>
      </Drawer.Root>
      <span>{title}</span>
      {headings.length ? (
        <Drawer.Root open={tocOpen} onOpenChange={setTocOpen}>
          <Drawer.Trigger asChild><Button aria-label="Open page outline" className="square-action" size="sm" tone="neutral" variant="soft"><List size={17} aria-hidden="true" /></Button></Drawer.Trigger>
          <Drawer.Portal><Drawer.Overlay /><Drawer.Content placement="end" size="sm" className="docs-mobile-drawer"><Drawer.Header className="docs-mobile-drawer__header"><div><Drawer.Title>On this page</Drawer.Title><Drawer.Description>Jump to a section in {title}.</Drawer.Description></div><Drawer.Close asChild><Button aria-label="Close page outline" className="square-action" tone="neutral" variant="ghost"><X size={18} aria-hidden="true" /></Button></Drawer.Close></Drawer.Header><Drawer.Body><OnThisPage headings={headings} /></Drawer.Body></Drawer.Content></Drawer.Portal>
        </Drawer.Root>
      ) : <span />}
    </div>
  );
}
