import { describe, expect, it } from "vitest";
import { isSpam, readContactForm, validateContact } from "./contact";

const valid = { name: "Ann", email: "ann@example.com", message: "Hello, I need a landing page.", website: "" };

describe("validateContact", () => {
  it("accepts a valid message", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("reports each invalid field", () => {
    const errors = validateContact({ ...valid, name: "A", email: "not-an-email", message: "hi" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("limits message length", () => {
    expect(validateContact({ ...valid, message: "x".repeat(5001) }).message).toMatch(/too long/);
  });
});

describe("honeypot", () => {
  it("flags a filled hidden field as spam", () => {
    expect(isSpam({ ...valid, website: "http://spam.example" })).toBe(true);
    expect(isSpam(valid)).toBe(false);
  });
});

describe("readContactForm", () => {
  it("trims values and defaults missing fields to empty strings", () => {
    const fd = new FormData();
    fd.set("name", "  Ann  ");
    expect(readContactForm(fd)).toEqual({ name: "Ann", email: "", message: "", website: "" });
  });
});
