"use server";

import { z } from "zod";

const contactSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type PostContactUsFormState =
  | {
      status: "idle";
    }
  | {
      status: "success";
      ticketNumber: number;
    }
  | {
      status: "error";
      errors: string[];
    };

export async function postContactUs(
  currentState: PostContactUsFormState,
  formData: FormData
): Promise<PostContactUsFormState> {
  const validatedContact = contactSchema.safeParse({
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedContact.success) {
    return {
      status: "error",
      errors: validatedContact.error.errors.map((e) => e.message),
    };
  }

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedContact.data),
  });

  return response.ok
    ? {
        status: "success",
        ticketNumber: Math.floor(Math.random() * 100000),
      }
    : {
        status: "error",
        errors: ["Failed to submit contact us message"],
      };
}
