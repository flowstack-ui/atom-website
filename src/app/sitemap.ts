import type { MetadataRoute } from "next";
import { allDocuments } from "@/lib/docs-manifest";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...allDocuments.map((document) => ({
      url: `${base}${document.href}`,
      changeFrequency: "weekly" as const,
      priority: document.section === "overview" ? 0.9 : 0.7,
    })),
  ];
}
