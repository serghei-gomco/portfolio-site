import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Send me a short description of your task — a bug, a slow page or a new feature.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="mt-4 text-slate-600">
        Describe the task in a few sentences: what is wrong or what you need, and a link if you have one. I reply in
        writing, usually within a day. You can also find me on{" "}
        <a href={site.links.linkedin} className="text-accent hover:underline">LinkedIn</a>.
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
