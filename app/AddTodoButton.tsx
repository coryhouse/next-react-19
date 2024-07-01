"use client";
import { useFormStatus } from "react-dom";

export function AddTodoButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding..." : "Add"}
    </button>
  );
}
