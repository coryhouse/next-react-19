"use client";
import { Button } from "@/components/Button";
import { Errors } from "@/components/Errors";
import { useState } from "react";
import { contactFormSchema } from "../contact/contact-form-schema";

type FormState =
  | {
      status: "idle";
      ticketNumber?: never;
    }
  | {
      status: "pending";
      ticketNumber?: never;
    }
  | {
      status: "success";
      ticketNumber: number;
    }
  | {
      status: "error";
      errors: string[];
      ticketNumber?: never;
    };

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

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

    setFormState({
      status: "pending",
    });

    const response = await fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: parsedContact.data.subject,
        message: parsedContact.data.message,
      }),
    });

    setFormState(
      response.ok
        ? {
            status: "success",
            ticketNumber: Math.floor(Math.random() * 100000),
          }
        : {
            status: "error",
            errors: ["Failed to submit contact us message"],
          }
    );
  }

  if (formState.status === "success") {
    return <p>Message submitted. Ticket #: {formState.ticketNumber}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formState.status === "error" && <Errors errors={formState.errors} />}
      <div>
        <label htmlFor="subject" className="block mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full p-2 border rounded"
        >
          <option value="">Select a subject</option>
          <option value="support">Support</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full p-2 border rounded"
          rows={4}
        ></textarea>
      </div>
      <Button
        isLoading={formState.status === "pending"}
        loadingLabel={"Submitting..."}
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
}
