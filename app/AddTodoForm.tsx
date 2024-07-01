"use client";
import { useFormState } from "react-dom";
import { SubmitButton } from "../components/SubmitButton";
import { addTodo } from "./actions";
import { useRef } from "react";

export type AddTodoFormState = {
  titleError: string;
};

export const emptyAddToDoFormState: AddTodoFormState = {
  titleError: "",
};

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  // TODO: Rename to useActionState when new react-dom is released
  // Next.js docs still reference useFormState
  // On RSC apps, makes forms interactive before JavaScript has executed on the client.
  // When used without Server Components, is equivalent to component local state.
  const [state, formAction] = useFormState(addTodo, emptyAddToDoFormState);

  return (
    <form ref={formRef} action={formAction} className="mt-4">
      <input
        type="text"
        name="title"
        className={`${
          state.titleError ? "border-red-500" : "border-gray-500"
        } border p-1`}
      />
      <SubmitButton label="Add" loadingLabel="Adding..." />
      {state?.titleError && (
        <p role="alert" className="text-red-500">
          {state?.titleError}
        </p>
      )}
    </form>
  );
}
