"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

type SubmitButtonProps = {
  label: string;
  loadingLabel: string;
  className?: string;
};

export function SubmitButton({
  label,
  loadingLabel,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button
      className="border p-1 bg-slate-200 border-gray-500 mr-2"
      isLoading={pending}
      loadingLabel={loadingLabel}
      type="submit"
    >
      {label}
    </Button>
  );
}
