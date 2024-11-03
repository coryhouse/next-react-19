"use client";
import { Button } from "@/components/Button";
import { Errors } from "@/components/Errors";
import { useState } from "react";

type InputState = {
  subject: string;
  message: string;
};

type FormState =
  | ({
      status: "idle";
      ticketNumber?: never;
    } & InputState)
  | ({
      status: "pending";
      ticketNumber?: never;
    } & InputState)
  | ({
      status: "success";
      ticketNumber: number;
    } & InputState)
  | ({
      status: "error";
      errors: string[];
      ticketNumber?: never;
    } & InputState);

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    status: "idle",
    subject: "",
    message: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;
    setFormState({ message, subject, status: "pending" });

    const errors: string[] = [];
    if (!subject) errors.push("Subject is required");
    if (!message) errors.push("Message is required");

    if (errors.length > 0) {
      return setFormState({
        status: "error",
        subject,
        message,
        errors,
      });
    }

    const response = await fetch("http://localhost:3001/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject, message }),
    });

    setFormState(
      response.ok
        ? {
            message,
            subject,
            status: "success",
            ticketNumber: Math.floor(Math.random() * 100000),
          }
        : {
            message,
            subject,
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
