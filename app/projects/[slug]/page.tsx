import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, kindLabel, projectSlugs } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

// Build one static page per MDX file; any other slug is a 404.
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await getProject(slug);
  if (!loaded) return {};
  const { project } = loaded;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const loaded = await getProject(slug);
  if (!loaded) notFound();
  const { project, Content } = loaded;

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/projects" className="text-sm text-accent hover:underline">← All projects</Link>
      <p className="mt-6 text-xs font-medium uppercase tracking-wide text-accent">
        {kindLabel[project.kind]} · {project.year}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
      <p className="mt-4 text-lg text-slate-600">{project.summary}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.map((tech) => (
          <li key={tech} className="rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-700">{tech}</li>
        ))}
      </ul>

      {project.links?.length ? (
        <p className="mt-5 flex flex-wrap gap-4">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="font-medium text-accent hover:underline">
              {l.label} ↗
            </a>
          ))}
        </p>
      ) : null}

      <div className="prose prose-slate mt-10 max-w-none prose-a:text-accent prose-blockquote:font-normal prose-blockquote:not-italic">
        <Content />
      </div>
    </article>
  );
}
