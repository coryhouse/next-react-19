"use client";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

type SubmitButtonProps = {
  children: string;
  loadingLabel: string;
  className?: string;
};

export function SubmitButton({
  children,
  loadingLabel,
}: Readonly<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <Button isLoading={pending} loadingLabel={loadingLabel} type="submit">
      {children}
    </Button>
  );
}
