import { MetadataRoute } from "next";
import { MAIN_PROJECTS } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://datacraft.studio";

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

  const projectPages = MAIN_PROJECTS.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...projectPages];
}
