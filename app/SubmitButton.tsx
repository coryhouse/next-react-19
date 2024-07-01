"use client";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
};

export function SubmitButton({
  label,
  loadingLabel,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </button>
  );
}
