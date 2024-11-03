"use server";

import { contactFormSchema } from "./contact-form-schema";
import { ContactFormState } from "./contact.types";

export async function postContactUs(
  _currentState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsedContact = contactFormSchema.safeParse({
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsedContact.success) {
    return {
      status: "error",
      errors: parsedContact.error.errors.map((e) => e.message),
    };
  }

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsedContact.data),
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
