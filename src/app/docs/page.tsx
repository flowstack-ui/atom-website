import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, BookOpen, Code2, Orbit, ShieldCheck, Waypoints } from "lucide-react";
import { DocsShell } from "@/components/docs-shell";
import { WebsiteButton as Button } from "@/components/website-button";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata, siteUrl } from "@/lib/site";
import { primitiveCount } from "@/lib/docs-manifest";

export const metadata: Metadata = createPageMetadata({ title: "Documentation", description: "Learn Atom’s headless React primitives, accessibility contracts, composition model, and public API.", path: "/docs/" });

const paths = [
  { icon: BookOpen, eyebrow: "Start here", title: "Understand the foundation", body: "Learn what Atom owns, what your application owns, and how the package stays headless.", href: "/docs/overview/introduction/", action: "Read the introduction" },
  { icon: Code2, eyebrow: "Install + compose", title: "Build the first interaction", body: "Install one package, choose stable public imports, and compose behavior without a provider.", href: "/docs/overview/getting-started/", action: "Get started" },
  { icon: Waypoints, eyebrow: "Compose behavior", title: "Connect stable public contracts", body: "Learn how compound anatomy, event composition, and application ownership fit together.", href: "/docs/guides/composition/", action: "Read composition" },
];

const headings = [{ depth: 2 as const, id: "choose-a-path", text: "Choose a path" }, { depth: 2 as const, id: "foundation-contract", text: "Foundation contract" }];

export default function DocsOverviewPage() {
  const data = [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Atom UI", item: `${siteUrl}/` }, { "@type": "ListItem", position: 2, name: "Documentation", item: `${siteUrl}/docs/` }] },
    { "@context": "https://schema.org", "@type": "CollectionPage", name: "Atom UI documentation", description: "Learn Atom’s headless React primitives, accessibility contracts, composition model, and public API.", url: `${siteUrl}/docs/` },
  ];
  return (
    <><StructuredData data={data} /><DocsShell headings={headings} title="Documentation overview">
      <article className="docs-article docs-overview">
        <header className="docs-overview__hero"><Badge tone="accent" variant="soft"><Orbit size={14} aria-hidden="true" /> Atom documentation</Badge><Text as="h1" variant="display" wrap="balance">Learn the behavior beneath the interface.</Text><Text as="p" variant="body-lg" tone="secondary">Start with the package boundary, follow a focused guide, or go directly to the primitive that matches the interaction you need.</Text><div className="docs-overview__proof"><Badge size="sm" tone="neutral" variant="soft">{primitiveCount} public subpaths</Badge><Badge size="sm" tone="neutral" variant="soft">No provider required</Badge><Badge size="sm" tone="neutral" variant="soft">React 18 + 19</Badge></div></header>
        <section id="choose-a-path" className="docs-section"><div className="docs-section__heading"><Badge tone="neutral" variant="outline">Choose a path</Badge><Text as="h2" variant="title-lg">Follow the sequence or jump to the guide you need.</Text></div><Grid.Root columns={3} gap="4" className="docs-path-grid">{paths.map(({ icon: Icon, ...path }) => <Card.Root key={path.title} variant="outline" className="docs-path-card"><Card.Header className="icon-card-header"><span className="feature-icon"><Icon size={19} aria-hidden="true" /></span><div><span className="card-eyebrow">{path.eyebrow}</span><Card.Title as="h3">{path.title}</Card.Title></div></Card.Header><Card.Content><Text tone="secondary">{path.body}</Text></Card.Content><Card.Footer><Link href={path.href}>{path.action} <ArrowRight size={14} aria-hidden="true" /></Link></Card.Footer></Card.Root>)}</Grid.Root></section>
        <section id="foundation-contract" className="foundation-contract docs-section"><div><Badge tone="accent" variant="soft">Clear ownership</Badge><Text as="h2" variant="title-lg">Atom carries behavior. You carry the product.</Text><Text as="p" tone="secondary">Semantics, state, focus, keyboard, touch, overlays, and positioning remain reusable. Brand, content, routes, data, and workflows remain yours.</Text></div><div className="foundation-contract__actions"><Button href="/docs/overview/accessibility/" endIcon={<ShieldCheck size={16} aria-hidden="true" />}>Read accessibility</Button><Button href="/docs/guides/composition/" tone="neutral" variant="soft" endIcon={<ArrowRight size={16} aria-hidden="true" />}>Compose primitives</Button></div></section>
      </article>
    </DocsShell></>
  );
}
