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
      errorMessage: string;
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
      errorMessage: validatedContact.error.errors[0].message,
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
        ticketNumber: 1,
      }
    : {
        status: "error",
        errorMessage: "Failed to submit contact us message",
      };
}
