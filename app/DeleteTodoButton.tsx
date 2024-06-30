"use client";
import { useFormStatus } from "react-dom";

export function DeleteTodoButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}
