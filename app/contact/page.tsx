"use client";
import { useActionState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { Errors } from "@/components/Errors";
import { ContactFormFields } from "./contact-form-fields";
import { postContactUs } from "./contact-actions";

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
      <SubmitButton loadingLabel="Sending...">Send</SubmitButton>
    </form>
  );
}
