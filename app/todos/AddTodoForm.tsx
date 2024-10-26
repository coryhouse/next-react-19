import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useActionState, useRef } from "react";
import { addTodo } from "./todoActions";
import { emptyAddToDoFormState } from "@/types/todo";

type AddTodoFormProps = {
  addOptimisticTodo: (title: string) => void;
};

export function AddTodoForm({ addOptimisticTodo }: AddTodoFormProps) {
  // On RSC apps, useActionState makes forms interactive before JavaScript has executed on the client. When used without Server Components, is equivalent to component local state.
  const [formState, addTodoAction, isPending] = useActionState(
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
      <Input
        id="title"
        label="Task"
        type="text"
        name="title"
        error={formState.titleError}
        afterSlot={<Button className="ml-2">Add</Button>}
      />
      <p role="alert" className="text-red-500 h-4">
        {formState.titleError}
      </p>
    </form>
  );
}
