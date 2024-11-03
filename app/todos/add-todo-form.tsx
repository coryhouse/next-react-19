import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useActionState, useRef } from "react";
import { addTodo } from "./todo-actions";
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
      action={(formData) => {
        const title = formData.get("title") as string;
        if (title) {
          // Only add optimistic todo if title is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
          addOptimisticTodo(title);
          formRef.current?.reset(); // Clear form immediately upon submit rather than waiting for the optimistic add to complete (at which point React would reset automatically)
        }
        addTodoAction(formData);
      }}
      className="mt-4"
    >
      <Input
        id="title"
        label="Task"
        type="text"
        name="title"
        error={isPending ? undefined : formState.titleError}
        afterSlot={
          <Button type="submit" className="ml-2">
            Add
          </Button>
        }
      />
      <p role="alert" className="text-red-500 h-4">
        {!isPending && formState.titleError}
      </p>
    </form>
  );
}
