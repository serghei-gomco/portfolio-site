// Case studies live in content/projects/<slug>.mdx. Each file exports `meta`.
// The slug list below is the single whitelist: pages, sitemap and
// generateStaticParams read from it, so an unknown slug can never be imported.

export type ProjectKind = "personal" | "employer";

export type ProjectMeta = {
  title: string;
  summary: string;
  kind: ProjectKind;
  year: string;
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export type Project = ProjectMeta & { slug: string };

export const projectSlugs = [
  "sizesheet",
  "agent-pipeline-demo",
  "pdf-upload-component",
  "portfolio-site",
  "homepage-layout-shift",
  "stripe-pre-authorization",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export function isProjectSlug(value: string): value is ProjectSlug {
  return (projectSlugs as readonly string[]).includes(value);
}

async function loadMdx(slug: ProjectSlug) {
  const mod = await import(`@/content/projects/${slug}.mdx`);
  return { meta: mod.meta as ProjectMeta, Content: mod.default as React.ComponentType };
}

export async function getProject(slug: string) {
  if (!isProjectSlug(slug)) return null;
  const { meta, Content } = await loadMdx(slug);
  return { project: { ...meta, slug } as Project, Content };
}

/** All projects in the order of `projectSlugs`. */
export async function getAllProjects(): Promise<Project[]> {
  const loaded = await Promise.all(projectSlugs.map(loadMdx));
  return loaded.map(({ meta }, i) => ({ ...meta, slug: projectSlugs[i] }));
}

export const kindLabel: Record<ProjectKind, string> = {
  personal: "Personal project",
  employer: "Work at Alsodev · code is private",
};
