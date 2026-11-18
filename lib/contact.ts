// Pure validation for the contact form, kept separate from the server action
// so it is easy to unit-test and to explain.

export type ContactInput = { name: string; email: string; message: string; website: string };

export type ContactState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fields?: Partial<Record<"name" | "email" | "message", string>>;
      // React 19 resets the form after an action; we send the values back so the user keeps what they typed.
      values?: Pick<ContactInput, "name" | "email" | "message">;
    }
  | { status: "success"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function readContactForm(formData: FormData): ContactInput {
  const get = (key: string) => String(formData.get(key) ?? "").trim();
  return { name: get("name"), email: get("email"), message: get("message"), website: get("website") };
}

/** Bots fill every field, people never see the hidden "website" field. */
export function isSpam(input: ContactInput): boolean {
  return input.website.length > 0;
}

export function validateContact(input: ContactInput) {
  const fields: Partial<Record<"name" | "email" | "message", string>> = {};
  if (input.name.length < 2) fields.name = "Please enter your name.";
  if (input.name.length > 100) fields.name = "Name is too long (max 100 characters).";
  if (!EMAIL_RE.test(input.email)) fields.email = "Please enter a valid email address.";
  if (input.message.length < 10) fields.message = "Please write at least 10 characters.";
  if (input.message.length > 5000) fields.message = "Message is too long (max 5000 characters).";
  return fields;
}
