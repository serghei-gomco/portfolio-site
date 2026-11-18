import Link from "next/link";
import { kindLabel, type Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-slate-200 p-5 transition hover:border-accent hover:shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-accent">
        {kindLabel[project.kind]} · {project.year}
      </p>
      <h3 className="mt-2 text-lg font-semibold">
        {/* The ::after makes the whole card clickable while keeping one real link */}
        <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.slice(0, 5).map((tech) => (
          <li key={tech} className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
