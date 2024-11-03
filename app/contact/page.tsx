"use client";
import { postContactUs } from "./contact-actions";
import { useActionState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { Errors } from "@/components/Errors";

export type FormState =
  | {
      status: "idle";
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
  const [formState, postContactUsAction] = useActionState(postContactUs, {
    status: "idle",
  });

  if (formState.status === "success") {
    return <p>Message submitted. Ticket #: {formState.ticketNumber}</p>;
  }

  return (
    <form action={postContactUsAction} className="space-y-4">
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
      <SubmitButton loadingLabel="Submitting...">Submit</SubmitButton>
    </form>
  );
}
