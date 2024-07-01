"use client";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton";
import { addTodo } from "./actions";

export function AddTodoForm() {
  // TODO: Rename to useActionState when new version of react-dom is released
  // Next.js docs still reference useFormState
  // On RSC apps, makes forms interactive before JavaScript has executed on the client. When used without Server Components, is equivalent to component local state.
  const [state, formAction] = useFormState(addTodo, { titleError: "" });

  return (
    <form action={formAction}>
      <input type="text" name="title" />
      <SubmitButton label="Add" loadingLabel="Adding..." />
      {state?.titleError && (
        <p role="alert" className="text-red-500">
          {state?.titleError}
        </p>
      )}
    </form>
  );
}
