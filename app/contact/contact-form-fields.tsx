import { ContactFormErrors } from "./contact-form-schema";

type ContactFormFieldsProps = {
  defaultValues?: Record<string, string>;
  errors?: ContactFormErrors;
};

export function ContactFormFields({
  defaultValues,
  errors,
}: ContactFormFieldsProps) {
  return (
    <>
      <div>
        <label htmlFor="subject" className="block mb-2">
          Subject
        </label>
        <select
          // Bug: defaultValue won't work on select until this is fixed: https://github.com/facebook/react/issues/30580
          defaultValue={defaultValues?.subject}
          id="subject"
          name="subject"
          className={`w-full p-2 border rounded ${
            errors?.fieldErrors.subject ? "border-red-500" : ""
          }`}
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
          defaultValue={defaultValues?.message}
          id="message"
          name="message"
          className={`w-full p-2 border rounded ${
            errors?.fieldErrors.message ? "border-red-500" : ""
          }`}
          rows={4}
        ></textarea>
      </div>
    </>
  );
}
