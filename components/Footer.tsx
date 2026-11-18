import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 text-sm text-slate-500">
      <div className="mx-auto flex max-w-5xl flex-wrap justify-between gap-3 px-4 py-6 sm:px-6">
        <p>© {new Date().getFullYear()} {site.name} · personal site</p>
        <p className="flex gap-4">
          <a href={site.links.github} className="hover:text-accent">GitHub</a>
          <a href={site.links.linkedin} className="hover:text-accent">LinkedIn</a>
        </p>
      </div>
    </footer>
  );
}
