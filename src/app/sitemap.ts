import { MetadataRoute } from "next";
import { ALL_PUBLIC_PROJECTS } from "@/data/projects";
import { LOCATION_PAGES } from "@/data/locations";
import { BRAND, LEGAL_LINKS } from "@/data/studio";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BRAND.websiteUrl;

  const staticPages = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectPages = ALL_PUBLIC_PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const locationPages = LOCATION_PAGES.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const legalPages = LEGAL_LINKS.map((link) => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...projectPages, ...locationPages, ...legalPages];
}
