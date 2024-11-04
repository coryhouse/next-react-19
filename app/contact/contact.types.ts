import { ContactFormErrors, ContactForm } from "./contact-form-schema";

export type ContactFormState =
  | {
      status: "idle";
      contactForm: ContactForm;
      ticketNumber?: never;
    }
  | {
      status: "success";
      contactForm: ContactForm;
      ticketNumber: number;
    }
  | {
      status: "error";
      contactForm: ContactForm;
      ticketNumber?: never;
      errors: ContactFormErrors;
    };
