import type { MetadataRoute } from "next";
import { allDocuments } from "@/lib/docs-manifest";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    ...allDocuments.map((document) => ({
      url: `${siteUrl}${document.href}`,
      changeFrequency: "weekly" as const,
      priority: document.section === "overview" ? 0.9 : 0.7,
    })),
  ];
}
