import { z } from "zod";

export const contactFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

export type ContactFormErrors = z.inferFlattenedErrors<
  typeof contactFormSchema
>;
