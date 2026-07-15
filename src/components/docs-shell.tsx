"use client";

import type { ReactNode } from "react";
import { ScrollArea } from "@flowstack-ui/atom/scroll-area";
import { Sidebar } from "@flowstack-ui/atom/sidebar";
import { SkipLink } from "@flowstack-ui/atom/skip-link";
import { Tooltip } from "@flowstack-ui/atom/tooltip";
import type { DocumentHeading } from "@/lib/documents";
import { DocsNavigation } from "./docs-navigation";
import { OnThisPage } from "./on-this-page";
import { SiteHeader } from "./site-header";

export function DocsShell({
  children,
  headings,
}: {
  children: ReactNode;
  headings: DocumentHeading[];
}) {
  return (
    <Tooltip.Provider>
      <SkipLink.Root className="skip-link" href="#main-content">
        Skip to content
      </SkipLink.Root>
      <SiteHeader />
      <Sidebar.Root className="docs-shell" state="expanded">
        <Sidebar.Panel className="desktop-sidebar" aria-label="Documentation navigation">
          <ScrollArea.Root className="sidebar-scroll-area">
            <ScrollArea.Viewport className="sidebar-scroll-viewport">
              <DocsNavigation enableSearchShortcut />
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </Sidebar.Panel>
        <Sidebar.Main id="main-content" tabIndex={-1} className="docs-main">
          <div className="docs-layout">
            <article className="docs-article">{children}</article>
          </div>
        </Sidebar.Main>
        <OnThisPage headings={headings} />
      </Sidebar.Root>
    </Tooltip.Provider>
  );
}
