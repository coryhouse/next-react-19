"use client";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { addTodo } from "./actions";

export function AddTodoForm() {
  const [state, formAction] = useFormState(addTodo, { titleError: "" });

  return (
    <form action={formAction}>
      <input type="text" name="title" />
      <span>{state?.titleError}</span>
      <SubmitButton label="Add" loadingLabel="Adding..." />
    </form>
  );
}
