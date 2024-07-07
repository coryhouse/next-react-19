import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { addTodo } from "./todoActions";
import { emptyAddToDoFormState } from "@/types/todo";

type AddTodoFormProps = {
  addOptimisticTodo: (title: string) => void;
};

export function AddTodoForm({ addOptimisticTodo }: AddTodoFormProps) {
  // Next.js docs still reference useFormState. On RSC apps, useFormState makes forms interactive before JavaScript has executed on the client. When used without Server Components, is equivalent to component local state.
  const [formState, addTodoAction] = useFormState(
    addTodo,
    emptyAddToDoFormState
  );

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={(payload) => {
        const title = payload.get("title") as string;
        if (title) {
          // Only add optimistic todo if title is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
          addOptimisticTodo(title);
          formRef.current?.reset(); // Clear form upon submit
        }
        addTodoAction(payload);
      }}
      className="mt-4"
    >
      <div className="flex grow-0 items-center">
        <Input
          id="title"
          label="Task"
          type="text"
          name="title"
          error={formState.titleError}
        />
        <Button className="ml-2">Add</Button>
      </div>
    </form>
  );
}
