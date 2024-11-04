import { ContactFormErrors } from "../contact/contact-form-schema";

export type ContactFormState =
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
      ticketNumber?: never;
      errors: ContactFormErrors;
    };
