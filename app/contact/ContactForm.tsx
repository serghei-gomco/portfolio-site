"use client";

import { useActionState } from "react";
import { sendContact } from "./actions";
import type { ContactState } from "@/lib/contact";

const initial: ContactState = { status: "idle" };

const inputClass =
  "mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 aria-[invalid=true]:border-red-600 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.status === "error" ? state.fields ?? {} : {};
  const values = state.status === "error" ? state.values : undefined;

  if (state.status === "success") {
    return <p role="status" className="rounded-lg bg-accent-soft p-4 text-accent">{state.message}</p>;
  }

  return (
    <form action={action} noValidate className="space-y-5">
      <Field id="name" label="Your name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" required defaultValue={values?.name} className={inputClass}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
      </Field>

      <Field id="email" label="Email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required defaultValue={values?.email} className={inputClass}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
      </Field>

      <Field id="message" label="What do you need?" error={errors.message}>
        <textarea id="message" name="message" rows={6} required defaultValue={values?.message} className={inputClass}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
      </Field>

      {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-700">{state.message}</p>
      )}

      <button type="submit" disabled={pending}
        className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90 disabled:opacity-60">
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}
    </div>
  );
}
