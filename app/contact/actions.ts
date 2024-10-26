"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const contactSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContact(formData: FormData) {
  const validatedContact = contactSchema.safeParse({
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!validatedContact.success) {
    throw new Error(validatedContact.error.errors[0].message);
  }

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedContact.data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  revalidatePath("/contact");
}
