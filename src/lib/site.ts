import type { Metadata } from "next";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://atom-ui.com";

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");

export const atomVersion = "0.22.6";
export const brickVersion = "0.1.6";
export const siteName = "Atom UI";
export const siteDescription =
  "Accessible, headless React primitives for keyboard, touch, focus, state, and screen-reader semantics.";

const socialImage = {
  url: `${siteUrl}/opengraph-image/`,
  width: 1200,
  height: 630,
  alt: "Atom UI — headless React behavior primitives",
};

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const socialTitle = `${title} — ${siteName}`;
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName,
      title: socialTitle,
      description,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
