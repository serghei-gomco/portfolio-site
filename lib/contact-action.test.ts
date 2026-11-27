import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { sendContact } from "../app/contact/actions";

const values = {
  name: "Example Visitor",
  email: "visitor@example.test",
  message: "I'd like to discuss a project.",
};
const submit = () => {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return sendContact({ status: "idle" }, data);
};

describe("sendContact delivery", () => {
  const fetchStub = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "sender@example.test");
    vi.stubEnv("CONTACT_TO_EMAIL", "receiver@example.test");
    vi.stubGlobal("fetch", fetchStub.mockReset());
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns success when delivery succeeds", async () => {
    fetchStub.mockResolvedValue(new Response(null, { status: 200 }));
    await expect(submit()).resolves.toMatchObject({ status: "success" });
    expect(fetchStub).toHaveBeenCalledOnce();
  });

  it("preserves the draft when the provider returns an HTTP error", async () => {
    fetchStub.mockResolvedValue(new Response("Temporary failure", { status: 503 }));
    await expect(submit()).resolves.toMatchObject({ status: "error", values });
    expect(fetchStub).toHaveBeenCalledOnce();
  });

  it("preserves the draft when the HTTP error response cannot be read", async () => {
    const response = new Response(null, { status: 503 });
    vi.spyOn(response, "text").mockRejectedValue(new TypeError("body read failed"));
    fetchStub.mockResolvedValue(response);
    await expect(submit()).resolves.toMatchObject({ status: "error", values });
    expect(fetchStub).toHaveBeenCalledOnce();
  });

  it("preserves the draft when the network request fails", async () => {
    fetchStub.mockRejectedValue(new TypeError("fetch failed"));
    await expect(submit()).resolves.toMatchObject({
      status: "error",
      message: "Sorry, the message could not be sent. Please try again later.",
      values,
    });
    expect(fetchStub).toHaveBeenCalledOnce();
  });
});
