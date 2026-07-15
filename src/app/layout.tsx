import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const themeScript = `
(() => {
  try {
    const saved = localStorage.getItem("atom-ui-theme");
    const theme = saved === "light" || saved === "dark"
      ? saved
      : matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#111111" : "#ffffff");
  } catch {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Atom UI — Headless React primitives",
    template: "%s — Atom UI",
  },
  description:
    "Accessible, headless React primitives for design systems and application interfaces.",
  openGraph: {
    type: "website",
    siteName: "Atom UI",
    title: "Atom UI — Headless React primitives",
    description:
      "Accessible, headless React primitives for design systems and application interfaces.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
