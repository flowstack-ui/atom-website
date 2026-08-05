import type { ReactNode } from "react";
import Link from "next/link";
import { DocsMobileNavigation } from "./docs-mobile-navigation";
import { DocsNavigation } from "./docs-navigation";
import { OnThisPage } from "./on-this-page";
import type { DocumentHeading } from "@/lib/documents";
import type { DocumentationScope } from "@/lib/docs-manifest";

export function DocsShell({ children, headings, scope = "guides", title }: { children: ReactNode; headings: DocumentHeading[]; scope?: DocumentationScope; title: string }) {
  const overview = scope === "primitives"
    ? { href: "/docs/components/", label: "Primitives overview" }
    : { href: "/docs/", label: "Guides overview" };
  return (
    <main id="main-content" className="docs-shell section-shell">
      <aside className="docs-sidebar" aria-label="Documentation navigation">
        <div className="docs-sidebar__scroll">
          <div className="docs-sidebar__inner"><Link className="docs-overview-link" href={overview.href}>{overview.label}</Link><DocsNavigation scope={scope} /></div>
        </div>
      </aside>
      <div className="docs-content">
        <DocsMobileNavigation headings={headings} scope={scope} title={title} />
        {children}
      </div>
      <aside className="docs-rail" aria-label="On this page"><span>On this page</span><OnThisPage headings={headings} /></aside>
    </main>
  );
}
