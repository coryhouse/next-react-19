import { ContactSchemaErrorType } from "@/app/contact/contact-form-schema";

type ErrorsProps = {
  errors: ContactSchemaErrorType;
};

export function Errors({ errors }: ErrorsProps) {
  return (
    <ul>
      {Object.entries(errors.fieldErrors).map(([key, value]) => (
        <li key={key} className="text-red-500">
          {value}
        </li>
      ))}
      {errors.formErrors.map((error, index) => (
        <li key={index} className="text-red-500">
          {error}
        </li>
      ))}
    </ul>
  );
}
