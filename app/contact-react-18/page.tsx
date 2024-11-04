"use client";
import { Button } from "@/components/Button";
import { Errors } from "@/components/Errors";
import { useState } from "react";
import { contactFormSchema } from "../contact/contact-form-schema";
import { ContactFormFields } from "../contact/contact-form-fields";
import { ContactFormState } from "./contact.types";

export default function ContactPage() {
  const [formState, setFormState] = useState<ContactFormState>({
    status: "idle",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const parsedContact = contactFormSchema.safeParse(
      Object.fromEntries(formData)
    );

    if (!parsedContact.success) {
      return {
        status: "error",
        errors: parsedContact.error.flatten(),
      };
    }

    setFormState({
      status: "pending",
    });

    const response = await fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedContact.data),
    });

    setFormState(
      response.ok
        ? {
            status: "success",
            ticketNumber: Math.floor(Math.random() * 100000),
          }
        : {
            status: "error",
            errors: {
              fieldErrors: {},
              formErrors: ["Failed to submit contact us message"],
            },
          }
    );
  }

  if (formState.status === "success") {
    return <p>Message submitted. Ticket #: {formState.ticketNumber}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formState.status === "error" && <Errors errors={formState.errors} />}
      <ContactFormFields />
      <Button
        isLoading={formState.status === "pending"}
        loadingLabel="Sending..."
        type="submit"
      >
        Send
      </Button>
    </form>
  );
}
