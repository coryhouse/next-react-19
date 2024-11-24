import { Button } from "@/components/Button";
import Input from "@/components/Input";
import { useActionState, useRef } from "react";
import { addTodo } from "./todo-actions";
import { emptyAddToDoFormState, taskSchema } from "@/types/todo";
import { TodoAction } from "./todosReducer";

type AddTodoFormProps = {
  dispatch: (action: TodoAction) => void;
};

export function AddTodoForm({ dispatch }: AddTodoFormProps) {
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
        const task = taskSchema.parse(formData.get("task"));
        if (task.length > 0) {
          // Only add optimistic todo if task is not empty. This avoids a flash of the optimistic todo when the user clicks "add" with an empty todo is added.
          dispatch({ type: "ADD_TODO", task });
          //formRef.current?.reset(); // Clear form immediately upon submit rather than waiting for the optimistic add to complete (at which point React would reset automatically)
          addTodoAction(formData);
        }
      }}
    >
      <Input
        id="task"
        label="Task"
        type="text"
        name="task"
        error={isPending ? undefined : formState.error}
        afterSlot={
          <Button type="submit" className="ml-2">
            Add
          </Button>
        }
      />
      <p role="alert" className="text-red-500 h-4">
        {!isPending && formState.error}
      </p>
    </form>
  );
}
