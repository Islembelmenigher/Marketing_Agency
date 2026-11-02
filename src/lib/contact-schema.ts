import { z } from "zod";

// Limits carried over from the original contact API contract.
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  brand: z.string().trim().max(200).nullish(),
  siteUrl: z.string().trim().max(500).nullish(),
  service: z.string().trim().max(160).nullish(),
  budget: z.string().trim().max(100).nullish(),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  honeypot: z.string().max(200).nullish(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const CONTACT_RATE_LIMIT = { max: 5, windowMinutes: 15 } as const;

export const CONTACT_THANKS = "Thanks for reaching out. Your request has been received.";
