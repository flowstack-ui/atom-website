import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@flowstack-ui/brick/reset.css";
import "@flowstack-ui/brick/tokens.css";
import "@flowstack-ui/brick/styles/accordion.css";
import "@flowstack-ui/brick/styles/badge.css";
import "@flowstack-ui/brick/styles/button.css";
import "@flowstack-ui/brick/styles/card.css";
import "@flowstack-ui/brick/styles/code.css";
import "@flowstack-ui/brick/styles/code-block.css";
import "@flowstack-ui/brick/styles/dialog.css";
import "@flowstack-ui/brick/styles/drawer.css";
import "@flowstack-ui/brick/styles/grid.css";
import "@flowstack-ui/brick/styles/input.css";
import "@flowstack-ui/brick/styles/nav-list.css";
import "@flowstack-ui/brick/styles/progress.css";
import "@flowstack-ui/brick/styles/stack.css";
import "@flowstack-ui/brick/styles/table.css";
import "@flowstack-ui/brick/styles/tabs.css";
import "@flowstack-ui/brick/styles/text.css";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("atom-website-appearance");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.brickAppearance = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Atom UI — Behavior at the smallest useful unit",
    template: "%s — Atom UI",
  },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "Atom UI — Behavior at the smallest useful unit",
    description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Atom UI — headless React behavior primitives" }],
  },
  twitter: { card: "summary_large_image", title: "Atom UI — Behavior at the smallest useful unit", description: siteDescription, images: ["/opengraph-image"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-brick-theme="atom" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="site-canvas">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        {process.env.VERCEL === "1" ? <Analytics /> : null}
      </body>
    </html>
  );
}
