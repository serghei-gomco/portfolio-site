import type { MetadataRoute } from "next";
import { projectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/about", "/contact"];
  const projects = projectSlugs.map((slug) => `/projects/${slug}`);
  return [...pages, ...projects].map((path) => ({ url: `${site.url}${path}` }));
}
