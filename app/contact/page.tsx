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
      <ContactFormFields />
      <SubmitButton loadingLabel="Submitting...">Submit</SubmitButton>
    </form>
  );
}
