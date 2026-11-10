import { MetadataRoute } from "next";
import { BRAND } from "@/data/studio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${BRAND.websiteUrl}/sitemap.xml`,
  };
}
