"use server";

import { contactFormSchema, ContactForm } from "./contact-form-schema";
import { ContactFormState } from "./contact.types";

export async function postContactUs(
  _currentState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const contactForm = Object.fromEntries(formData) as ContactForm;
  const parsedContactForm = contactFormSchema.safeParse(contactForm);

  if (!parsedContactForm.success) {
    return {
      status: "error",
      contactForm,
      errors: parsedContactForm.error.flatten(),
    };
  }

  const response = await fetch("http://localhost:3001/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactForm),
  });

  return response.ok
    ? {
        status: "success",
        contactForm,
        ticketNumber: Math.floor(Math.random() * 100000),
      }
    : {
        status: "error",
        contactForm,
        errors: {
          fieldErrors: {},
          formErrors: ["Failed to submit contact us message"],
        },
      };
}
