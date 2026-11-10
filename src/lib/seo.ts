import type { Metadata } from "next";
import { BRAND } from "@/data/studio";

const DEFAULT_OG_IMAGE = "/audit/preview.PNG";
const DEFAULT_OG_IMAGE_ALT = "DataCrafts digital studio website preview";

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: BRAND.name,
      locale: "en_IN",
      type,
      images: [
        {
          url: image,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
