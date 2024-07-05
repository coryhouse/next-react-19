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
    <Button isLoading={pending} loadingLabel={loadingLabel} type="submit">
      {label}
    </Button>
  );
}
