import type { Metadata } from "next";
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
  } catch {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
