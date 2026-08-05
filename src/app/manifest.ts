import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Atom UI", short_name: "Atom", description: "Accessible, headless React primitives.", start_url: "/", display: "standalone", background_color: "#071114", theme_color: "#071114", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] };
}
