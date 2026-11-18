"use server";

import { isSpam, readContactForm, validateContact, type ContactState } from "@/lib/contact";

const SUCCESS: ContactState = { status: "success", message: "Thank you! Your message was sent. I usually reply within a day." };

// Server action: runs only on the server, so the API key never reaches the browser.
export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const input = readContactForm(formData);

  // Honeypot filled → pretend success, so the bot learns nothing.
  if (isSpam(input)) return SUCCESS;

  const fields = validateContact(input);
  if (Object.keys(fields).length > 0) {
    const { name, email, message } = input;
    return { status: "error", message: "Please fix the highlighted fields.", fields, values: { name, email, message } };
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] Resend is not configured, message not sent:", { name: input.name, length: input.message.length });
      return { status: "success", message: "Dev mode: the form works, but email is not configured, so nothing was sent." };
    }
    console.error("[contact] Missing RESEND_API_KEY / CONTACT_FROM_EMAIL / CONTACT_TO_EMAIL");
    return { status: "error", message: "The form is temporarily unavailable. Please write to me on LinkedIn." };
  }

  // Plain fetch to the Resend REST API: one request, no SDK needed.
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject: `Portfolio: message from ${input.name}`,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return { status: "error", message: "Sorry, the message could not be sent. Please try again later." };
  }
  return SUCCESS;
}
