import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Personal projects and case studies from my work on an e-commerce platform.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const personal = projects.filter((p) => p.kind === "personal");
  const employer = projects.filter((p) => p.kind === "employer");

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Personal projects have public links or source code. Work projects are described without client names,
        because the code belongs to my former employer.
      </p>

      <section aria-labelledby="personal" className="mt-10">
        <h2 id="personal" className="mb-4 text-xl font-semibold">Personal projects</h2>
        <ProjectGrid projects={personal} />
      </section>

      <section aria-labelledby="work" className="mt-12">
        <h2 id="work" className="mb-4 text-xl font-semibold">Work case studies</h2>
        <ProjectGrid projects={employer} />
      </section>
    </>
  );
}
