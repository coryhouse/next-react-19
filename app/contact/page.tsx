"use client";
import { useActionState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { Errors } from "@/components/Errors";
import { ContactFormFields } from "./contact-form-fields";
import { postContactUs } from "./contact-actions";

export default function ContactPage() {
  const [state, postContactUsAction] = useActionState(postContactUs, {
    contactForm: {
      subject: "",
      message: "",
    },
    status: "idle",
  });

  if (state.status === "success") {
    return <p>Message submitted. Ticket #: {state.ticketNumber}</p>;
  }

  return (
    <form action={postContactUsAction} className="space-y-4">
      {state.status === "error" && <Errors errors={state.errors} />}
      <ContactFormFields
        defaultValues={{
          subject: state.contactForm.subject,
          message: state.contactForm.message,
        }}
        errors={state.status === "error" ? state.errors : undefined}
      />
      <SubmitButton loadingLabel="Sending...">Send</SubmitButton>
    </form>
  );
}
