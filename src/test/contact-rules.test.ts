import { describe, expect, it } from "vitest";
import { CONTACT_RATE_LIMIT, contactSchema } from "@/lib/contact-schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "We want to improve our checkout conversion.",
  consent: true as const,
};

describe("contact form rules carried over from the original site", () => {
  it("allows 5 submissions per caller every 15 minutes", () => {
    expect(CONTACT_RATE_LIMIT).toEqual({ max: 5, windowMinutes: 15 });
  });

  it("requires at least 10 characters of context", () => {
    expect(contactSchema.safeParse({ ...valid, message: "Too short" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "Long enough!" }).success).toBe(true);
  });

  it("requires consent to reply", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
  });

  it("requires a name of at least 2 characters", () => {
    expect(contactSchema.safeParse({ ...valid, name: "A" }).success).toBe(false);
  });
});
