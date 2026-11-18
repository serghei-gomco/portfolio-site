import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ProjectGrid } from "@/components/ProjectGrid";
import { site } from "@/lib/site";

// Every number here comes from the CV; nothing is estimated.
const highlights = [
  { value: "6+ years", label: "commercial frontend work" },
  { value: "70+ stores", label: "on the e-commerce platform I worked on (Vue/Nuxt)" },
  { value: "0.51 → <0.06", label: "mobile homepage CLS, 8 of 8 measured stores in \"Good\"" },
  { value: "Approved", label: "my Shopify app in App Store review, Nov 2026" },
];

export default async function HomePage() {
  const featured = (await getAllProjects()).filter((p) => p.featured);

  return (
    <>
      <section className="py-6 sm:py-12">
        <p className="text-sm font-medium text-accent">{site.role}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          I fix, speed up and build web apps — React, Vue and Nuxt.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-600">
          Six years of paid frontend work, the last three on a multi-store e-commerce platform: page speed, cart and
          checkout, payments and integrations. On this site — case studies from that work and my personal projects.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90">
            See projects
          </Link>
          <Link href="/contact" className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium hover:border-accent">
            Contact me
          </Link>
        </div>
      </section>

      <section aria-labelledby="highlights" className="mt-6">
        <h2 id="highlights" className="sr-only">Highlights</h2>
        <dl className="grid gap-4 rounded-xl bg-accent-soft p-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.value}>
              <dt className="text-xl font-bold text-accent">{h.value}</dt>
              <dd className="mt-1 text-sm text-slate-600">{h.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="featured" className="mt-14">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 id="featured" className="text-2xl font-semibold">Featured projects</h2>
          <Link href="/projects" className="text-sm text-accent hover:underline">All projects →</Link>
        </div>
        <ProjectGrid projects={featured} />
      </section>
    </>
  );
}
