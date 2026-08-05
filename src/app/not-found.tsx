import type { Metadata } from "next";
import { Badge } from "@flowstack-ui/brick/badge";
import { ArrowRight, Home, Orbit } from "lucide-react";
import { WebsiteButton as Button } from "@/components/website-button";

const notFoundDescription = "The requested page is not part of the current Atom UI documentation graph.";

export const metadata: Metadata = {
  title: "Page not found",
  description: notFoundDescription,
  alternates: { canonical: null },
  openGraph: {
    title: "Page not found — Atom UI",
    description: notFoundDescription,
    siteName: "Atom UI",
  },
  twitter: {
    card: "summary",
    title: "Page not found — Atom UI",
    description: notFoundDescription,
  },
};

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="not-found__copy">
        <Badge className="icon-label-badge" tone="accent" variant="soft"><Orbit size={14} aria-hidden="true" /> Signal lost</Badge>
        <h1>404</h1>
        <h2>This particle left the system.</h2>
        <p>The route does not belong to the current Atom documentation graph. Return home or continue with the public primitive catalog.</p>
        <div className="hero-actions"><Button href="/" startIcon={<Home size={16} aria-hidden="true" />}>Return home</Button><Button href="/docs/components/" tone="neutral" variant="soft" endIcon={<ArrowRight size={16} aria-hidden="true" />}>Browse primitives</Button></div>
      </div>
      <div className="not-found__visual" aria-hidden="true"><span className="missing-particle">missing</span></div>
    </main>
  );
}
