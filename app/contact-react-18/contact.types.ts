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
      errors: string[];
      ticketNumber?: never;
    };
