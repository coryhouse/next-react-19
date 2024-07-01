"use client";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  className?: string;
};

export function SubmitButton({
  label,
  loadingLabel,
  className = "",
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button className={className} type="submit" disabled={pending}>
      {pending ? loadingLabel : label}
    </button>
  );
}
