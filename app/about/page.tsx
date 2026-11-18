import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Frontend developer from Moldova: 6+ years of commercial frontend, Vue/Nuxt e-commerce, Django backend since 2026.",
  alternates: { canonical: "/about" },
};

const experience = [
  { period: "Oct 2023 – Nov 2026", role: "Frontend → Full-Stack Engineer", place: "Alsodev · e-commerce platform with 70+ stores (Vue 2, Nuxt 2, Vuex; Django from March 2026)" },
  { period: "Aug 2023 – Apr 2024", role: "Frontend Developer (Vue 3), freelance", place: "Estrin Technologies · aircraft appraisal web app (Vue 3, Pinia, Vuetify 3)" },
  { period: "Mar 2021 – Mar 2023", role: "Frontend Developer", place: "USA Link System · B2B marketplace (JavaScript, jQuery)" },
  { period: "Mar 2020 – Mar 2021", role: "Junior Frontend Developer, freelance", place: "Rusodot · landing pages (HTML, CSS, JavaScript)" },
];

const skills = [
  { group: "Production", items: "Vue 2 & 3, Nuxt 2 (SSR), Vuex, Pinia, JavaScript, HTML, CSS/SCSS, Core Web Vitals, Jest · Python, Django, DRF, Celery, PostgreSQL, Redis · Stripe" },
  { group: "Own projects", items: "React, TypeScript, Node.js, Express, React Router 7, Next.js, Tailwind CSS, Prisma, Vite, Vitest" },
  { group: "Tools", items: "Git, GitLab, Docker (docker-compose), Figma layouts, Claude Code with review checks" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight">About me</h1>
      <div className="mt-6 space-y-4 text-lg text-slate-700">
        <p>
          I&apos;m Serghei, a frontend developer from {site.location}. I have six years of paid frontend work. The last
          three were on an e-commerce platform where 70+ online stores share one Nuxt 2 codebase with several themes and
          five languages: page speed, cart and checkout, payments, delivery and CRM integrations.
        </p>
        <p>
          In March 2026 I also took on the platform&apos;s Django backend. React, TypeScript and Next.js I use in my own
          projects — my Shopify app SizeSheet and the demos on this site — not yet in a company product.
        </p>
        <p>
          I work with AI coding agents, but every change goes through my plan, my review and my checks before I accept
          it. My English is basic, so I prefer written tasks and updates.
        </p>
      </div>

      <h2 className="mt-12 text-xl font-semibold">Experience</h2>
      <ol className="mt-4 space-y-4">
        {experience.map((e) => (
          <li key={e.period} className="border-l-2 border-accent pl-4">
            <p className="text-sm text-slate-500">{e.period}</p>
            <p className="font-medium">{e.role}</p>
            <p className="text-slate-600">{e.place}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-12 text-xl font-semibold">Skills</h2>
      <dl className="mt-4 space-y-3">
        {skills.map((s) => (
          <div key={s.group}>
            <dt className="font-medium">{s.group}</dt>
            <dd className="text-slate-600">{s.items}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-12">
        <Link href="/contact" className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90">
          Write to me
        </Link>
      </p>
    </div>
  );
}
