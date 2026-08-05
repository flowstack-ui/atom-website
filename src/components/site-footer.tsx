import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { atomVersion } from "@/lib/site";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <div className="footer-brand__heading"><BrandMark /><span className="version-pill">v{atomVersion}</span></div>
        <p>Accessible behavior, ready for your visual system.</p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <Link href="/docs/overview/getting-started/"><span>Get started</span></Link>
        <Link href="/docs/components/"><span>Primitives</span></Link>
        <Link href="/docs/overview/accessibility/"><span>Accessibility</span></Link>
        <a href="https://brick-ui.com/"><span>Brick <ArrowUpRight size={13} aria-hidden="true" /></span></a>
        <a href="https://www.npmjs.com/package/@flowstack-ui/atom"><span>npm <ArrowUpRight size={13} aria-hidden="true" /></span></a>
        <a href="https://github.com/flowstack-ui/atom"><span>GitHub <ArrowUpRight size={13} aria-hidden="true" /></span></a>
      </nav>
      <div className="footer-meta">
        <p className="footer-endorsement"><span>Part of <a href="https://github.com/flowstack-ui">Flowstack</a></span><span aria-hidden="true">·</span><span>A <a href="https://swifty.us/">Swifty</a> product</span></p>
        <p>MIT licensed · Presented with Brick · © 2026 Swifty LLC</p>
      </div>
    </footer>
  );
}
